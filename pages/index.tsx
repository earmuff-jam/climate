import { Grid, Paper, useTheme } from '@mui/material'
import { Box } from '@mui/system';
import Head from 'next/head'
import RoiCalculator from '../components/Feedback/RoiCalculator';

import GoldenInfo from '../components/HomePage/GoldenInfo';
import Improvements from '../components/HomePage/Improvements';
import ImprovementSelector from '../components/HomePage/ImprovementSelector';
import NavBar from '../components/NavBar/Navbar';

export default function Home() {

  const theme = useTheme();

  return (
    <>
      <Head>
        <title>Item Climate Statistics</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box sx={{display: 'flex', flexDirection: 'row'}}>
        <Grid
          container
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            padding: theme.spacing(1),
          }}
        >
          <Grid item xs={12} md={0}>
            <Paper>
              <GoldenInfo />
            </Paper>
          </Grid>
          <Grid item xs={12} md={12} xl={6}>
            <ImprovementSelector />
            <Improvements />
          </Grid>
          <Grid item xs={12} md={12} xl={6}>
            <ImprovementSelector />
            <Improvements />
          </Grid>
          <Grid item xs={12} md={12} xl={6}>
            <RoiCalculator />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}
