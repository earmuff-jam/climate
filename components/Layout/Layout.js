
import {
  useSession,
  useSupabaseClient
} from "@supabase/auth-helpers-react";
import React from "react";
import { Box } from "@mui/material";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/Navbar";
import styles from "./Layout.module.css";
import EntryForm from "../HomePage/EntryForm";

const layout = {
  display: "flex",
  flexDirection: "row",
  height: "100vh",
};

const navbar = {
  flex: "0 0 auto",
  display: "flex",
  flexDirection: "column",
};

const Layout = ({ children }) => {

  const session = useSession();
  const supabase = useSupabaseClient();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = React.useCallback(() => {
    setOpen((prev) => !prev);
  }, [setOpen]);

  return (
    <Box sx={layout}>
      <Box className={styles.content}>
        <Box className={styles.main}>
          {!session ? (
            <EntryForm supabase={supabase} />
          ) : (
            <>
              <Box sx={navbar}>
                <NavBar open={open} toggleDrawer={toggleDrawer} />
              </Box>
              <Box className={styles.header}>
                <Header open={open} toggleDrawer={toggleDrawer} />
              </Box>
              <Box>{children}</Box>
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
