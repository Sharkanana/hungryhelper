import React, { useState } from 'react';
import axios from 'axios';


export default function Input (props) {

  const [action, updateAction] = useState('');

  function addTodo () {
    const task = {action: action};

    if(task.action && task.action.length > 0) {
      axios.post('/api/todos', task)
        .then(res => {
          if(res.data){
            props.getTodos();
            updateAction('');
          }
        })
        .catch(err => console.log(err))
    } else {
      console.log('input field required')
    }
  }

  function handleChange (e) {
    updateAction(e.target.value);
  }

  return (
    <div>
      <input type="text" onChange={handleChange} value={action}/>
      <button onClick={addTodo}>add todo</button>
    </div>
  );
}