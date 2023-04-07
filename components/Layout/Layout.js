
import {
  useUser,
  useSupabaseClient
} from "@supabase/auth-helpers-react";

import React from "react";

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

  const user = useUser();
  const supabaseClient = useSupabaseClient()

  if (!user?.id)
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