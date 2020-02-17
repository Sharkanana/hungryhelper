import React, { useState } from 'react';
import axios from "axios";

export default function Login ({ closeModal }) {

  const [username, updateUsername] = useState('');
  const [password, updatePassword] = useState('');

  const [errorMsg, updateErrorMsg] = useState('');

  function handleLogin() {
    axios.post('/api/login', { username, password })
      .then(res => {
        if(res.data.success) {

          localStorage.setItem('jwtToken', res.data.token);
          axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');

          closeModal();
        }
        else {
          updateErrorMsg(res.data.msg);
        }
      })
      .catch(err => updateErrorMsg(err.response.data.msg));
  }

  return (
    <div>

      <h1>Login</h1>

      Username<input type="text" value={username} onChange={e => updateUsername(e.target.value)}/><br/>
      Password<input type="password" value={password} onChange={e => updatePassword(e.target.value)}/>

      <div className="ErrorDiv">
        {errorMsg}
      </div>

      <div className="Buttons">
        <button onClick={closeModal}>Cancel</button>
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  )
}