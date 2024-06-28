
--- 0009 - load maintenance item relationship trigger ---
--- Description: load maintenance, item relationship trigger functions ---

BEGIN;

DROP EXTENSION IF EXISTS "pg_cron" CASCADE;
CREATE EXTENSION IF NOT EXISTS "pg_cron";

-- TRIGGER TO UPDATE ITEM COLOR FROM MAINTENANCE PLAN --
-- once an item is added to maintenance plan, trigger will update the color associated with the plan for the selected item --
CREATE OR REPLACE FUNCTION public.handle_maintenance_plan_color_to_item_fn()
    RETURNS TRIGGER AS
$$
BEGIN
    UPDATE public.maintenance_item
    SET associated_color = (SELECT color FROM public.maintenance_plan WHERE maintenance_plan.id = NEW.maintenance_id)
    WHERE id = NEW.id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS handle_maintenance_plan_color_to_item_trigger ON public.maintenance_item;

CREATE TRIGGER handle_maintenance_plan_color_to_item_trigger
    AFTER INSERT ON public.maintenance_item
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_maintenance_plan_color_to_item_fn();


-- TRIGGER TO UPDATE OVERFLOW STATUS TO TRUE IF THE DATE IS CROSSED THE TERM LIMIT --
CREATE OR REPLACE FUNCTION public.handle_overdue_inventory_items_fn()
RETURNS TRIGGER AS
$$
BEGIN
    IF (SELECT term_limit FROM public.maintenance_plan WHERE id = NEW.maintenance_id) < CURRENT_TIMESTAMP THEN
        UPDATE public.maintenance_item
        SET overflow = true 
        WHERE id = NEW.id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS handle_overdue_inventory_items_trigger ON public.maintenance_item;

CREATE TRIGGER handle_overdue_inventory_items_trigger
    AFTER INSERT ON public.maintenance_item
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_overdue_inventory_items_fn();

CREATE OR REPLACE FUNCTION public.update_overdue_items()
RETURNS void AS
$$
BEGIN
    UPDATE public.maintenance_item
        SET overflow = true
        FROM public.maintenance_plan
            WHERE maintenance_plan.term_limit < CURRENT_TIMESTAMP
        AND maintenance_item.overflow = false;
END;
$$ LANGUAGE plpgsql;

SELECT cron.schedule('0 0 * * *', $$ SELECT public.update_overdue_items(); $$);


END;