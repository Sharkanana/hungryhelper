import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Router from "next/router";

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
          <Tabs>
            <Tab label="Login"/>
            <Tab label="Register"/>
          </Tabs>
        </AppBar>

      </div>
    </div>
  );
}

export default Header;