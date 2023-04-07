
import {
  useUser,
  useSupabaseClient
} from "@supabase/auth-helpers-react";

import React, { useEffect, useState } from "react";

import { Box } from "@mui/material";
import Footer from "../Footer/Footer";
import styles from "./Layout.module.css";
import EntryForm from "../../containers/HomeContainer/EntryForm";
import SideNav from "../NavBar/SideNav";
import AccountPage from '../../containers/HomeContainer/AccountPage';

const layout = {
  display: "flex",
  flexDirection: "row",
};
const navbar = {
  flex: "0 0 auto",
  display: "flex",
  flexDirection: "column",
};

const Layout = ({ children }) => {

  const user = useUser();
  const supabaseClient = useSupabaseClient()

  const [userDetails, setUserDetails] = useState({});
  const fetchProfile = async () => {
    const { data, error } = await supabaseClient
      .from('profiles')
      .select('id, username, full_name, avatar_url, website')
      .eq('id', user?.id);
    if (data?.length >= 2) { return null; }
    const userDetailsDb = data?.[0];
    setUserDetails(userDetailsDb);
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  if (!user?.id)
    return (
      <EntryForm
        redirectUri="http://localhost:3000"
        supabase={supabaseClient}
      />
    )

  if (userDetails) {
    if (Object.values(userDetails).filter(Boolean).length <= 2) {
      return (
        <AccountPage userDetails={userDetails} />
      )
    }
  };

  return (
    <Box sx={layout}>
      <Box sx={navbar}>
        <SideNav />
      </Box>
      <Box className={styles.content}>
        <Box className={styles.header}>
        </Box>
        <Box className={styles.main}>{children}</Box>
        <Box className={styles.footer}>
          <Footer />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;