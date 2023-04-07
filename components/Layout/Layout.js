
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

  const user = useUser()
  const [data, setData] = useState()
  const supabaseClient = useSupabaseClient()

  useEffect(() => {
    async function loadData() {
      const { data } = await supabaseClient.from('profiles').select('*')
      setData(data)
    }
    // Only run query once user is logged in.
    if (user) loadData()
  }, [user])

  if (!user)
    return (
      <EntryForm
        redirectUri="http://localhost:3000"
        supabase={supabaseClient}
      />
    )

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