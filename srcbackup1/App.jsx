// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UsersPage from './pages/UsersPage';
import LoginForm from './components/UserLogin';
import RoleForm from './components/RoleForm';

const App = () => {
  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/users" element={<UsersPage/>} />
        {/* <Route path="/users" element={<h1>Users page</h1>} /> */}
        <Route path="/roles" element={<RoleForm/>} />
        <Route path="/login" element={<LoginForm/>} />
      </Routes>
    </Router>
    </>
  );
};

export default App;
