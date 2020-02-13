import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Input from './Input';
import ListTodo from './ListTodo';

export default function Todo () {

  const [todos, updateTodos] = useState([]);

  useEffect(() => {
    getTodos();
  }, []);

  function getTodos () {
    axios.get('/api/todos')
      .then(res => {
        if(res.data){
          updateTodos(res.data);
        }
      })
      .catch(err => console.log(err))
  }

  function deleteTodo(id) {

    axios.delete(`/api/todos/${id}`)
      .then(res => {
        if(res.data){
          getTodos();
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <div>
      <h1>My Todo(s)</h1>
      <Input getTodos={getTodos}/>
      <ListTodo todos={todos} deleteTodo={deleteTodo}/>
    </div>
  )
}