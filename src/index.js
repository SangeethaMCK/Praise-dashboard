import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import { UserProvider } from './UserContext.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
    <UserProvider>
        <App />
    </UserProvider>
    </StrictMode>
   
);
