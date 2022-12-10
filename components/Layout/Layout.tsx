import * as React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/Navbar";
import { Box } from "@mui/material";
import styles from "./Layout.module.css";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = React.useCallback((): void => {
    setOpen((prev) => !prev);
  }, [setOpen]);
  return (
    <Box className={styles.layout}>
      <Box className={styles.navbar}>
        <NavBar open={open} toggleDrawer={toggleDrawer} />
      </Box>
      <Box className={styles.content}>
        <Box className={styles.header}>
          <Header open={open} toggleDrawer={toggleDrawer} />
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
