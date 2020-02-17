import React, { useState } from 'react';
import Modal from 'react-modal';

import "./TopNav.css";
import Login from "./Login";
import Register from "./Register";

export default function TopNav () {

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

  function handleLogout() {
    localStorage.removeItem('jwtToken');
    window.location.reload();
  }

  return (
    <div className="TopNav">
      <div className="MainSection">
        Hungry Helper
      </div>
      <div className="RightSide">
        <div hidden={localStorage.getItem('jwtToken')}>
          <button onClick={openLogin}>Login</button>
          <button onClick={openRegister}>Sign up</button>
        </div>
        <div hidden={!localStorage.getItem('jwtToken')}>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      </div>

      <Modal isOpen={showLogin}>
        <Login closeModal={closeLogin}/>
      </Modal>
      <Modal isOpen={showRegister}>
        <Register closeModal={closeRegister}/>
      </Modal>
    </div>
  )
}