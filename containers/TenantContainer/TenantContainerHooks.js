import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

export const useTenantConfiguration = () => {
  const supabaseClient = useSupabaseClient();
  const [editTenant, setEditTenant] = useState(false);
  const [tenants, setTenants] = useState([]);

  const retrieveTenantProperties = async () => {
    const { data, error } = await supabaseClient.from("tenants").select(`
        tenant_id,
        tenant_type,
        firstname,
        lastname,
        email,
        phone,
        dob,
        occupation,
        employer,
        monthlyincome,
        emergencycontactname,
        emergencycontactphone,
        moveindate,
        leaseduration,
        rentamount,
        securitydepositamount,
        petallowed,
        petdescription,
        backgroundcheckconsent,
        created_by,
        created_at,
        updated_by,
        updated_at,
        sharable_groups
    )`);
    if (error) return;
    setTenants(data);
  };

  useEffect(() => {
    retrieveTenantProperties();
    setEditTenant(false);
  }, []);

  const handleAddTenant = () => {
    setEditTenant(!editTenant);
  };

  return {
    tenants,
    editTenant,
    setEditTenant,
    handleAddTenant,
  };
};
