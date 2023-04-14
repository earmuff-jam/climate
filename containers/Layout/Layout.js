import React, { useCallback, useState } from "react";
import Footer from "../../components/Footer/Footer";
import { styled } from "@mui/material";
import SideNav from "../../components/NavBar/SideNav";
import EntryForm from "../HomeContainer/EntryForm";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

const LayoutContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
});

const NavigationContainer = styled("div")({
  flex: "0 0 auto",
  display: "flex",
  flexDirection: "column",
});

const ContentContainer = styled("div")({
  flex: 1,
  display: "flex",
  flexDirection: "column",
});

const MainContainer = styled("div")({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  height: "calc(100% -1rem)",
});

const FooterContainer = styled("div")({
  flex: "0 0 auto",
  marginTop: "0.5rem",
});

const Layout = ({ children }) => {
  const user = useUser();
  const supabaseClient = useSupabaseClient();
  const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;
  if (!user?.id)
    return <EntryForm redirectUri={redirectUri} supabase={supabaseClient} />;

  const [open, setOpen] = useState(false);

  const toggleDrawer = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  return (
    <LayoutContainer>
      <NavigationContainer>
        <SideNav open={open} toggleDrawer={toggleDrawer} />
      </NavigationContainer>
      <ContentContainer>
        <MainContainer>{children}</MainContainer>
        <FooterContainer>
          <Footer />
        </FooterContainer>
      </ContentContainer>
    </LayoutContainer>
  );
};

export default Layout;
