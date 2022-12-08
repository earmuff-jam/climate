import * as React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MiniDrawer from "../NavBar/Navbar";
import { Box } from "@mui/material";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <MiniDrawer open={open} toggleDrawer={toggleDrawer} />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Header toggleDrawer={toggleDrawer} />
        <Box sx={{ display: "flex", flexGrow: 1 }}> {children}</Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;
