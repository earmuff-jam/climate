import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { DEFAULT_NAVIGATION } from "./Constants";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useProfileConfig } from "../Auth/Hooks";

/**
 * this hook is used to manipulate the app bar
 * consumes the profileData field which contains profile
 * level information for user
 */
export const useAppBarConfig = () => {
  const user = useUser();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const { profileData } = useProfileConfig();

  const userID = user.id;
  const intials = derieveInitials(
    profileData?.first_name,
    profileData?.last_name
  );
  const [nav, setNav] = useState([...DEFAULT_NAVIGATION]);

  const handleSignOut = async () => {
    await supabaseClient.auth.signOut().then(router.replace("/"));
    return;
  };

  const navigate = (route) => {
    router.push(route);
  };

  const applyFormattedNavigation = (navigation, userID, profileData) => {
    if (!userID || !profileData) return null;
    if (profileData.user_role === "1204") {
      const formattedNav = [...navigation].filter(
        (el) => el.name != "Properties"
      );
      setNav(formattedNav);
    } else {
      // nothing.
    }
  };

  useEffect(() => {
    applyFormattedNavigation(nav, userID, profileData);
  }, [profileData, userID]);

  return {
    intials,
    nav,
    navigate,
    handleSignOut,
  };
};

/**
 * private method to retrieve the first character of given names.
 * @param {string} firstName
 * @param {string} lastName
 */
const derieveInitials = (firstName, lastName) => {
  if (!firstName || !lastName) {
    return "User";
  } else {
    return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
  }
};
