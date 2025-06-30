import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, headerType }) => {
  return (
    <>
      <Header type={headerType} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;