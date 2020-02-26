import Header from './Header';
import React from "react";

function Layout({children, currentTab}) {
  return (
  <div>
    <Header currentTab={currentTab}/>
    {children}
  </div>
  );
}

export default Layout;