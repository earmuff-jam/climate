import { Divider, Grid } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import React from "react";
import { TitleComponent } from "../components/Home/TitleComponent";
import SubscribeForm from "../components/SubscribePage/SubscribeForm";

const Subscribe = () => {

  return (
    <>
      <TitleComponent title={"Subscribe"} />
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
        padding={'6rem'}
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={12} md={6}>

          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <Image
              alt='Mountains'
              src='/splashpage.jpeg'
              width={450}
              height={450}
             
            />
          </div>

        </Grid>
        <Grid item xs={12} md={6}>
          <p>Get the latest news and updates.</p>
          <Divider color="red" />
          <p>Climate is designed to provide overall monitoring capabilities for your item. With flexiblity to monitor, track and view all of your items, never again will you be worried about losing an item. </p>

          <SubscribeForm
            title="Join the mailing list"
            desc="Sign up now and recieve exclusive content on climate application"
            descVariant="body2"
            titleVariant="h4"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Subscribe;