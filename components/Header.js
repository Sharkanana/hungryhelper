import React, {useContext, useState} from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Router from "next/router";
import Login from "./Login";
import Register from "./Register";
import userContext from "../contexts/user";

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

  let {user, updateUser} = useContext(userContext);

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

  function logout() {
    localStorage.removeItem('jwtToken');

    user.loggedIn = false;
    updateUser(user);

    //todo: why does the above update not update this view? but changing it on login does.
    window.location.reload();
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
            {!user.loggedIn && <Tab label="Login" onClick={openLogin}/>}
            {!user.loggedIn && <Tab label="Register" onClick={openRegister}/>}
            {user.loggedIn && <Tab label="Logout" onClick={logout}/>}
          </Tabs>
        </AppBar>

        <Login open={showLogin} closeLogin={closeLogin}/>
        <Register open={showRegister} closeRegister={closeRegister}/>

      </div>
    </div>
  );
}

export default Header;