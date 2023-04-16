import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useState } from "react";

export const useSideNavigationHooks = () => {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const [selectedItem, setSelectedItem] = useState("dashboard");
  const handleItemSelection = (item) => {
    setSelectedItem(item);
    router.push(`/${item}`);
  };
  const handleSignOut = async () => await supabaseClient.auth.signOut();

  return {
    selectedItem,
    handleItemSelection,
    handleSignOut,
  };
};
