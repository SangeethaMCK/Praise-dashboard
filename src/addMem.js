import React, { useState, useContext } from 'react';
import './App.css';
import { UserContext } from './UserContext.js';

function AddMem({ onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { addUserToContext } = useContext(UserContext);

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
    console.log(`Name: ${name}, Email: ${email}`);
    addUser(name, email);
    onClose(); 
  };

  return (
    <div className='addMem'>
      <h1>Add Team Member</h1>
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
          />
        </div>
        <button className="submit-btn" type="submit">Add a Member</button>
      </form>
    </div>
  );
}

export default AddMem;
