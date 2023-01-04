
import {
  useSession,
  useSupabaseClient
} from "@supabase/auth-helpers-react";

import React from "react";
import { Box } from "@mui/material";
import Footer from "../Footer/Footer";
import styles from "./Layout.module.css";
import NavMenuBar from "../NavBar/AppBar";
import EntryForm from "../HomePage/EntryForm";

const layout = {
  display: "flex",
  flexDirection: "row",
  height: "100vh",
};

const Layout = ({ children }) => {

  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <Box sx={layout}>
      <Box className={styles.content}>
        <Box className={styles.main}>
          {!session ? (
            <EntryForm supabase={supabase} />
          ) : (
            <>
              <NavMenuBar />
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
              }}>{children}</Box>
            </>
          )}
        </Box>
        <Box className={styles.footer}>
          <Footer />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
