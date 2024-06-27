import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import UserManagement from './components/UserManagement';
import NewAccountsToday from './components/NewAccountsToday';
import CommentManagement from './components/CommentManagement';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CommentManagement />
    <NewAccountsToday />
    <UserManagement />
  </React.StrictMode>
);

reportWebVitals();
