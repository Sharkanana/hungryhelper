import React, { useState } from 'react';

import axios from 'axios';

export default function Register ({ closeModal }) {

  const [username, updateUsername] = useState('');
  const [email, updateEmail] = useState('');
  const [password, updatePassword] = useState('');
  const [confirm, updateConfirm] = useState('');

  const [errorMsg, updateErrorMsg] = useState('');

  function handleRegister() {

    axios.post('/api/register', { username, email, password, confirm})
      .then(res => {
        if(res.data.success) {
          closeModal();
        }
        else {
          updateErrorMsg(res.data.msg);
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div>

      <h1>Sign up</h1>

      Username<input type="text" value={username} onChange={e => updateUsername(e.target.value)}/><br/>
      Email<input type="text" value={email} onChange={e => updateEmail(e.target.value)}/><br/>
      Password<input type="password" value={password} onChange={e => updatePassword(e.target.value)}/><br/>
      Confirm<input type="password" value={confirm} onChange={e => updateConfirm(e.target.value)}/>

      <div className="ErrorDiv">
        {errorMsg}
      </div>

      <div className="Buttons">
        <button onClick={closeModal}>Cancel</button>
        <button onClick={handleRegister}>Sign up</button>
      </div>
    </div>
  )
}