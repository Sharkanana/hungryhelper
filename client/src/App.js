import React, {useEffect} from 'react';
import Modal from 'react-modal';
import axios from 'axios';

import TopNav from './components/TopNav.js';
import Todo from "./components/Todo";

import './App.css';

function App() {

  Modal.setAppElement('#root');

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
  }, []);

  return (
    <div className="App">
      <TopNav/>
      <Todo/>
    </div>
  );
}

export default App;
