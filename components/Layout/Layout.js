import * as React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/Navbar";
import { Box } from "@mui/material";
import styles from "./Layout.module.css";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Account from "../HomePage/Account";

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
      <Box sx={navbar}>
        <NavBar open={open} toggleDrawer={toggleDrawer} />
      </Box>
      <Box className={styles.content}>
        <Box className={styles.header}>
          <Header open={open} toggleDrawer={toggleDrawer} />
        </Box>
        <Box className={styles.main}>
          {!session ? (
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              theme="dark"
            />
          ) : (
            <Account session={session} />
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
