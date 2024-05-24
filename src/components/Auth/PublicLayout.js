import React from 'react';
import HomeAppBar from '../AppBar/HomeAppBar';

const PublicLayout = ({ children }) => {
  return (
    <div>
      <HomeAppBar isUserLoggedIn={false} />
      {children}
    </div>
  );
};

export default PublicLayout;
