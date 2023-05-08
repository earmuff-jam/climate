import { Auth } from "@supabase/auth-ui-react";
import React from "react";

const loginStyleSx = () => {
  return {
    button: {
      backgroundColor: "#4F45E4",
      color: "#fff",
      padding: "0.4rem",
    },
    anchor: {
      color: "black",
      textDecoration: "none",
      fontSize: "1.2rem",
      lineHeight: "1.6",
    },
    label: {
      color: "black",
    },
    input: {
      border: 0,
      borderBottom: `0.01rem solid black`,
      color: "black",
      padding: "1.2rem",
    },
    message: {
      color: "red",
    },
  };
};

const EntryForm = ({ redirectUri, supabase }) => {
  return (
    <div className="grid space-y-40 mt-10 place-items-center text-black">
      <div>
        <span className="text-3xl"> Welcome to Property Co </span>
        <div className="text-md mt-6">
          {" "}
          Join the journey to learn property management as you go.{" "}
        </div>
      </div>
      <Auth
        supabaseClient={supabase}
        redirectTo={redirectUri}
        providers={[]}
        appearance={{
          style: loginStyleSx(),
        }}
      />
    </div>
  );
};

export default EntryForm;
