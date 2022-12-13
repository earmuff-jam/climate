import { Grid } from "@mui/material";
import { TitleComponent } from "../components/Home/TitleComponent";
import SplashMainPage from "../containers/SplashPage/SplashMainPage";


const Home = () => {

  return (
    <>
      <TitleComponent title="Item Climate Statistics" key={0} />
      <Grid container>
        <Grid item xs={12}>

          <SplashMainPage />
        </Grid>
      </Grid>
    </>
  )
};

export default Home;

