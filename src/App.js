import './App.css';
import { useEffect, useState } from 'react';
import AddMem from './addMem.js';
import PostPraise from './postPraise.js'; 

function App() {
  const [showAddMem, setShowAddMem] = useState(false);
  const [showPostPraise, setShowPostPraise] = useState(false);
  const [praises, setPraises] = useState([]);

  const handleAddMem = () => {
    setShowAddMem(true);
    setShowPostPraise(false);
  };

  const handleCloseAddMem = () => {
    setShowAddMem(false);
    setShowPostPraise(false);
  };

  const handlePostPraise = () => {
    setShowPostPraise(true);
    setShowAddMem(false);
  };

  const handleClosePostPraise = () => {
    getPraises();
    setShowPostPraise(false);  
    setShowAddMem(false);
    
  };

  async function getPraises() {
    try {
      const response = await fetch('http://localhost:8080/praise');
      const praisesData = await response.json();
      console.log(praisesData);
      setPraises(praisesData.reverse());
    } catch (error) {
      console.error('Error fetching praises:', error);
    }
  }
  useEffect(() => {
    getPraises();
  }, []);

  return (
    <>
      <header className="header">
        <span className="header__logo">
          <img src="/images.png" alt="PeerPulse Logo" />
        </span>
        <h1>PeerPulse</h1>
        <button className='addMem-btn' onClick={handleAddMem}>Add Team Member</button>
      </header>

      <div className='dashboard'>
        <div className='dashboardHeader'>
          <h1>Praise Dashboard</h1>
          <button onClick={handlePostPraise}>+ Post a Praise</button>
        </div>

        <div className='praises'>
          {praises.map((praise, index) => (
            <div className='praise' key={index}>
              <div className='praiseHeader'>
                <h2>{`${praise.praisedby} posted a praise to ${praise.sendto}`}</h2>
                <span className='date'>{praise.formatted_date}</span>
              </div>
              <p className='praiseContent'>{praise.content}</p>
            </div>
          ))}
        </div>
      </div>

      {showAddMem && <AddMem onClose={handleCloseAddMem}  />}
      {showPostPraise && <PostPraise onClose={handleClosePostPraise}  />}
    </>
  );
}

export default App;

