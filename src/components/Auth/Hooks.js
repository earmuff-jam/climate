import { useState } from "react";
import { useQuery } from "react-query";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

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
        updated_at,
        username,
        full_name,
        avatar_url,
        about_us
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
        username: profileData?.username,
        about_us: profileData?.about_us,
        updated_at: new Date().toISOString(),
      })
      .select();
    router.push("/");
  };

  const { isLoading, isError, error } = useQuery("profileData", fetchUserList);

  return {
    isLoading,
    isError,
    error,
    profileData,
    submit,
    handleChange,
  };
};
