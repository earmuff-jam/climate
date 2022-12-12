import * as React from "react";
import { Box } from "@mui/material";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/Navbar";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = React.useCallback((): void => {
    setOpen((prev) => !prev);
  }, [setOpen]);
  
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <NavBar open={open} toggleDrawer={toggleDrawer} />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Header open={open} toggleDrawer={toggleDrawer} />
        <Box sx={{ display: "flex", flexGrow: 1 }}> {children}</Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;
