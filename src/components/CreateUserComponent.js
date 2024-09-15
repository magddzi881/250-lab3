// src/components/CreateUserComponent.js
import React, { useState } from 'react';
import { createUser } from '../api';

const CreateUserComponent = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
        try {
            const user = { username, email };
            await createUser(user);
            setMessage('User created successfully!');
          } catch (error) {
            setMessage('Error creating user.');
          }
    

  };

  return (
    <div className="container">
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button disabled={username.length === 0 || email.length === 0}
        type="submit">Create User</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateUserComponent;
