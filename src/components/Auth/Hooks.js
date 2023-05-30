import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

/**
 * this hook is used to retrieve and update profile data with configuration details
 *
 */
export const useProfileConfig = () => {
  const user = useUser();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const [profileData, setProfileData] = useState({});

  const fetchUserList = async () => {
    const { data, error } = await supabaseClient
      .from("profiles")
      .select(
        `
        id,
        updated_on,
        username,
        first_name,
        last_name,
        user_role,
        created_on,
        updated_by
        `
      )
      .eq("id", user.id);
    setProfileData(...data);
  };

  const handleChange = (ev) => {
    const label = ev.target.id;
    const value = ev.target.value;
    const newProfileData = { ...profileData };
    newProfileData[label] = value;
    setProfileData({ ...newProfileData });
  };

  const submit = async (event) => {
    event.preventDefault();
    await supabaseClient
      .from("profiles")
      .upsert({
        id: user?.id,
        full_name: profileData?.full_name,
        first_name: profileData?.first_name,
        last_name: profileData?.last_name,
        username: profileData?.username,
        created_on: profileData?.created_on,
        updated_on: new Date().toISOString(),
        updated_by: user.id,
      })
      .select();
    router.reload();
  };

  useEffect(() => {
    fetchUserList();
  }, [user?.id]);

  return {
    profileData,
    submit,
    handleChange,
  };
};
