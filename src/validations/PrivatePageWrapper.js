import React from 'react';
import Sidebar from './Sidebar';

const PrivatePageWrapper = ({ children }) => {
  // Add any authentication logic here if needed

  return (
    <>
      <Sidebar/>
      {children}
    </>
  );
};

export default PrivatePageWrapper;
