import * as ReactDOM from 'react-dom/client';
import ApplicationValidator from './ApplicationValidator';
import theme from './util/theme';
import { ThemeProvider } from '@emotion/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <ApplicationValidator />
  </ThemeProvider>
);
