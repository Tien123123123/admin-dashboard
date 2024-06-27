import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://itec-mangaapp-ef4733c4d23d.herokuapp.com/api/Users');
        const today = new Date();
        const todayDateString = today.toISOString().split('T')[0];
        const todayUsers = response.data.filter(user => {
          const userDate = new Date(user.createdAt);
          return userDate.toISOString().split('T')[0] === todayDateString;
        });
        setUsers(todayUsers);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Users Created Today</h1>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredUsers.length > 0 ? (
        <ul>
          {filteredUsers.map(user => (
            <li key={user.userID}>
              <p>Email: {user.userEmail}</p>
              <p>Name: {user.userName}</p>
              <p>Date Created: {user.createdAt}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No users created today.</p>
      )}
    </div>
  );
};

export default UsersList;
