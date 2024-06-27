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
        setUsers(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUsers();
  }, []);

  const handleBanUser = async (userID) => {
    try {
      await axios.patch(`https://itec-mangaapp-ef4733c4d23d.herokuapp.com/api/Users/${userID}`, { isBanned: true });
      setUsers(users.map(user => user.userID === userID ? { ...user, isBanned: true } : user));
    } catch (err) {
      setError(err.message);
    }
  };
  
  const handleUnbanUser = async (userID) => {
    try {
      await axios.patch(`https://itec-mangaapp-ef4733c4d23d.herokuapp.com/api/Users/${userID}`, { isBanned: false });
      setUsers(users.map(user => user.userID === userID ? { ...user, isBanned: false } : user));
    } catch (err) {
      setError(err.message);
    }
  };
  

  const filteredUsers = users.filter(user =>
    user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Users Management</h1>
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
              <button
                onClick={() => user.isBanned ? handleUnbanUser(user.userID) : handleBanUser(user.userID)}
              >
                {user.isBanned ? 'Unban' : 'Ban'}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default UsersList;
