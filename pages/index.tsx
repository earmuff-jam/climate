import { Divider, Grid, Paper } from "@mui/material";
import Activity from "../components/Activity/Activity";
import CategoryBoxList from "../components/Home/CategoryBoxList";
import { TitleComponent } from "../components/Home/TitleComponent";
import RMap from "../components/Map/RMap";
import SplashMainPage from "../containers/SplashPage/SplashMainPage";


const Home = () => {

  return (
    <>
      <TitleComponent title="Item Climate Statistics" key={0} />
      <Grid container spacing={2} sx={{ p: 2 }}>
        <Grid item xs={12}>
          <SplashMainPage />
        </Grid>
        <Grid item xs={3}>
          <Paper elevation={3}>
            <Activity />
          </Paper>
        </Grid>
        <Grid item xs={9} sx={{ minWidth: '42rem' }}>
          <RMap />
        </Grid>
      </Grid>
    </>
  )
};

export default Home;

