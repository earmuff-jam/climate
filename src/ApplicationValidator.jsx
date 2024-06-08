import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import SplashPage from './Containers/SplashPage/SplashPage';
import { router } from './util/router';

const ApplicationValidator = () => {
  // const { loading } = useSelector((state) => state.auth);
  const loading = false;
  const [loggedInUser, setLoggedInUser] = useState(false);

  useEffect(() => {
    const userID = localStorage.getItem('userID');
    if (!userID) {
      setLoggedInUser(false);
      return;
    } else {
      setLoggedInUser(true);
    }
  }, [loading]);

  console.log(loggedInUser);

  return loggedInUser ? <RouterProvider router={router} exact/> : <SplashPage />;
};

export default ApplicationValidator;
