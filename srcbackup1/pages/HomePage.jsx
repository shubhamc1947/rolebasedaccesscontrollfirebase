// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  console.log("home page")
  return (
    <div>
      <h1>Home Page</h1>
      <nav>
        <ul>
          <li><Link to="/users">Users</Link></li>
          <li><Link to="/roles">Roles</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default HomePage;
