import React, { useState, useContext } from 'react';
import './App.css';
import { UserContext } from './UserContext.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';


function AddMem({ onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { addUserToContext, users } = useContext(UserContext);

  async function addUser(name, email) {
    const response = await fetch('http://localhost:8080', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email })
    });

    if (response.ok) {
      const newUser = {username: name, email: email};
      addUserToContext(newUser);
      alert('User added successfully!');
    } else {
      alert('Error adding user!');
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (users.some(user => user.username === name.trim())) {
      setError('User Already Exists')
    }
    else{
    console.log(`Name: ${name}, Email: ${email}`);
    setError('');
    addUser(name.trim(), email.trim());
    onClose(); 
    }
  };

  return (
    <div className='addMem'>
      <h1>Add Team Member</h1>
      {error && <p className='error'><FontAwesomeIcon icon={faCircleExclamation} className='icon'/> {error}</p> } 
      <span className="close-btn" onClick={onClose}>X</span>
      <form className="addMem-form" onSubmit={handleSubmit}>
        <div className="addMem-form__input">
          <label htmlFor='name'>Name</label>
          <input 
            type='text' 
            id='name' 
            placeholder='Enter Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="addMem-form__input">
          <label htmlFor='email'>Email</label>
          <input 
            type='email' 
            id='email' 
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button className="submit-btn" type="submit">Add a Member</button>
      </form>
    </div>
  );
}

export default AddMem;
