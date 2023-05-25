import React from "react";
import EntryForm from "./EntryForm";
import AppBar from "../Home/AppBar";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

const LayoutWrapper = ({ children }) => {
  const user = useUser();
  const supabaseClient = useSupabaseClient();
  const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;

  if (!user?.id)
    return <EntryForm redirectUri={redirectUri} supabase={supabaseClient} />;

  return (
    <>
      <AppBar />
      <div>{children}</div>
    </>
  );
};

export default LayoutWrapper;
