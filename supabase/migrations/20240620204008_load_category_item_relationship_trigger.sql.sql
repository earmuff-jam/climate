

--- 0010 - load category item relationship trigger ---
--- Description: load category, item relationship trigger functions ---

BEGIN;

-- TRIGGER TO UPDATE ITEM COLOR FROM CATEGORY PLAN --
-- once an item is added to category, trigger will update the color associated with the plan for the selected item --
CREATE OR REPLACE FUNCTION public.handle_category_color_to_item_fn()
    RETURNS TRIGGER AS
$$
BEGIN
    UPDATE public.category_item
    SET associated_color = (SELECT color FROM public.category WHERE category.id = NEW.category_id)
    WHERE id = NEW.id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS handle_category_color_to_item_trigger ON public.category_item;

CREATE TRIGGER handle_category_color_to_item_trigger
    AFTER INSERT ON public.category_item
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_category_color_to_item_fn();

END;