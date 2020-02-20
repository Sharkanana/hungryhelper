import React, {useState} from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Router from "next/router";
import Login from "./login";

const headerStyle = {
  display: 'flex',
  padding: 20,
  borderBottom: '1px solid #DDD'
}, leftItems = {
  flex: 1,
  marginRight: 10
}, rightItems = {

};

const TABS = {
  home: {
    label: 'Home',
    value: '/',
  },
  plans: {
    label: 'My Plans',
    value: '/plans'
  },
  createPlan: {
    label: 'Create a Plan',
    value: '/createPlan',
  }
};

function Header({ currentTab }) {

  const [showLogin, updateShowLogin] = useState(false);
  const [showRegister, updateShowRegister] = useState(false);

  function openLogin() {
    updateShowLogin(true);
  }

  function closeLogin() {
    updateShowLogin(false);
  }
  function openRegister() {
    updateShowRegister(true);
  }

  function closeRegister() {
    updateShowRegister(false);
  }

  return (
    <div style={headerStyle}>

      <div style={leftItems}>
        <AppBar position="static">
          <Tabs value={TABS[currentTab].value} onChange={(evt, newTab) => Router.push(newTab)}>
            {Object.values(TABS).map(tab => (<Tab key={tab.value} {...tab} />))}
          </Tabs>
        </AppBar>
      </div>

      <div style={rightItems}>

        <AppBar position="static">
          <Tabs value={false}>
            <Tab label="Login" onClick={openLogin}/>
            <Tab label="Register" onClick={openRegister}/>
          </Tabs>
        </AppBar>

        <Login open={showLogin} closeLogin={closeLogin}/>

      </div>
    </div>
  );
}

export default Header;