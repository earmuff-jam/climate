import { ThemeProvider } from '@emotion/react';
import PromoSection from '../../Components/SplashPage/PromoSection';
import { lightTheme } from '../../util/theme';

const SplashPage = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <PromoSection />
    </ThemeProvider>
  );
};

export default SplashPage;
