
import Image from "next/image";
import React from "react";

import {
  Divider,
  Grid,
  Typography
} from "@mui/material";

import { Box } from "@mui/system";
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
          <Box style={{ width: '100%', height: '100%', position: 'relative' }}>
            <Image
              alt='Mountains'
              src='/splashpage.jpeg'
              width={450}
              height={450}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography
            variant="h4"
          >
            Get the latest news and updates
          </Typography>
          <Divider color="red" />
          <Typography
            variant="body1"
            gutterBottom
          >
            Climate is designed to provide overall monitoring capabilities for your item. With flexiblity to monitor, track and view all of your items, never again will you be worried about losing an item.
          </Typography>
          <SubscribeForm />
        </Grid>
      </Grid>
    </>
  );
};

export default Subscribe;