import { createBrowserRouter } from 'react-router-dom';
import SplashPage from '../Containers/SplashPage/SplashPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SplashPage />,
    children: [],
  },
  {
    path: 'profile',
    element: <p>profile</p>,
  },
]);