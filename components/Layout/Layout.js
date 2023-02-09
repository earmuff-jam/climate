
import {
  useUser,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";

import React from "react";
import { Box } from "@mui/material";
import Footer from "../Footer/Footer";
import NavMenuBar from "../NavBar/AppBar";
import EntryForm from "../HomePage/EntryForm";

import styles from "./Layout.module.css";

const Layout = ({ children }) => {

  const user = useUser();
  const supabaseClient = useSupabaseClient();

  if (!user)
    return (
      <EntryForm
        redirectUri="http://localhost:3000"
        supabase={supabaseClient}
      />
    )

  return (
    <Box sx={styles.rootLayout}>
      <Box className={styles.content}>
        <Box className={styles.main}>
          <NavMenuBar />
          <Box className={styles.container}>
            {children}
          </Box>
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;
