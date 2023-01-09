
import {
  useUser,
  useSupabaseClient
} from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';

import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Footer from "../Footer/Footer";
import styles from "./Layout.module.css";
import NavMenuBar from "../NavBar/AppBar";

const layout = {
  display: "flex",
  flexDirection: "row",
  height: "100vh",
};

const Layout = ({ children }) => {

  const supabaseClient = useSupabaseClient()
  const user = useUser()
  const [data, setData] = useState()

  useEffect(() => {
    async function loadData() {
      const { data } = await supabaseClient.from('profiles').select('*')
      setData(data)
    }
    // Only run query once user is logged in.
    if (user) loadData()
  }, [user])

  if (!user)
    return (
      <Auth
        redirectTo="http://localhost:3000"
        appearance={{ theme: ThemeSupa }}
        supabaseClient={supabaseClient}
        providers={['google', 'github']}
        socialLayout="horizontal"
      />
    )

  return (
    <Box sx={layout}>
      <Box className={styles.content}>
        <Box className={styles.main}>
            <>
              <NavMenuBar />
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
              }}>{children}</Box>
            </>
        </Box>
        <Box className={styles.footer}>
          <Footer />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
