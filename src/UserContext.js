import React, { createContext, useState, useEffect } from 'react';

// Create Context
export const UserContext = createContext();

// Create Context Provider Component
export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  
  // Function to fetch users
  async function getUsers() {
    try {
      const response = await fetch('http://localhost:8080');
      const usersData = await response.json();
      setUsers(usersData); // Set fetched data to user state
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  const addUserToContext = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]); 
  }

  // Fetch users on component mount
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <UserContext.Provider value={{ users, setUsers, addUserToContext }}>
      {children}
    </UserContext.Provider>
  );
};
