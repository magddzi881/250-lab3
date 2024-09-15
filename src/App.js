// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreateUserComponent from './components/CreateUserComponent';
import CreatePollComponent from './components/CreatePollComponent';
import VoteComponent from './components/VoteComponent';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Poll Voting App</h1>
        <div className="button-container">
          <Link to="/create-user">
            <button className="nav-button">Create User</button>
          </Link>
          <Link to="/create-poll">
            <button className="nav-button">Create Poll</button>
          </Link>
          <Link to="/vote">
            <button className="nav-button">Vote on Poll</button>
          </Link>
        </div>

        <Routes>
          <Route path="/create-user" element={<CreateUserComponent />} />
          <Route path="/create-poll" element={<CreatePollComponent />} />
          <Route path="/vote" element={<VoteComponent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
