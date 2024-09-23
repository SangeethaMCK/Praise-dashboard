import React, { useState, useContext } from 'react';
import './App.css';
import { UserContext } from './UserContext.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

function PostPraise({ onClose, getPraises }) {
  const { users, setUsers } = useContext(UserContext);
  const [praisedBy, setPraisedBy] = useState('');
  const [sendTo, setSendTo] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  async function postPraise(praisedBy, sendTo, content) {
    const response = await fetch('http://localhost:8080/praise', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ praisedBy, sendTo, content, date: new Date().toLocaleDateString() })
    });
    if (response.ok) {
      alert('Praise posted successfully!');
      getPraises();
      onClose(); 
    } else {
      alert('Error posting praise!');
    }

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(praisedBy===sendTo){
      setError(`from & to can't be same`)
    }
    else{
    console.log(`Praised By: ${praisedBy}, Send To: ${sendTo}, Content: ${content}`);
    setError('')
    postPraise(praisedBy.trim(), sendTo.trim(), content.trim());
    }
  };

  return (
    <div className='postPraise'>
      <h1>Post a Praise</h1>
     {error && <p className='error'><FontAwesomeIcon icon={faCircleExclamation} className='icon'/> {error}</p> } 
      <span className="close-btn" onClick={onClose}>X</span>
      <form className="postPraise-form" onSubmit={handleSubmit}>
        <div className="postPraise-form__input">
          <label htmlFor='praisedBy'>Praised by:</label>
          <select 
            id='praisedBy'
            value={praisedBy}
            onChange={(e) => setPraisedBy(e.target.value)}
            required
          >
            <option value="" disabled>Select Member</option>
            {users.map((user) => (
              <option key={user.userid} value={user.username}>{user.username}</option>
            ))}
          </select>
        </div>
        <div className="postPraise-form__input">
          <label htmlFor='sendTo'>Send Praise to:</label>
          <select 
            id='sendTo'
            value={sendTo}
            onChange={(e) => setSendTo(e.target.value)}
            required
          >
            <option value="" disabled>Select Member</option>
            {users.map((user) => (
              <option key={user.userid} value={user.username}>{user.username}</option>
            ))}
          </select>
        </div>
        <div className="postPraise-form__input">
          <label htmlFor='content'>Praise</label>
          <textarea 
            id='content'
            placeholder='Enter Content'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button className="submit-btn" type="submit">Post a Praise</button>
      </form>
    </div>
  );
}

export default PostPraise;
