import React, { useCallback, useState } from "react";
import Footer from "../../components/Footer/Footer";
import { styled } from "@mui/material";
import SideNav from "../SideNavContainer/SideNavContainer";
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
  height: "calc(100vh + 4rem)",
});

const MainContainer = styled("div")({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  height: "calc(100% -0.5rem)",
});

const FooterContainer = styled("div")({
  flex: "0 0 auto",
});

const Layout = ({ children }) => {

  const user = useUser();
  const supabaseClient = useSupabaseClient();

  const [open, setOpen] = useState(false);

  const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;

  const toggleDrawer = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  if (!user?.id)
    return <EntryForm redirectUri={redirectUri} supabase={supabaseClient} />;
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
