import React from "react";
import { Link } from "react-router-dom";
import { useFirebase } from "../firebase";

const Navigation = () => {
  const { userInfo } = useFirebase();

  // Mapping of route paths to display names
  const routeNames = {
    "/": "HOME",
    "/users": "Users",
    "/roles": "Roles",
    "/login": "Login",
    "/demostory1":"DemoStory1"
  };

  const availableRoutes = [
    { path: '/', name: 'HOME' },
    { path: '/users', name: 'Users' },
    { path: '/roles', name: 'Roles' },
    { path: '/login', name: 'Login' },
    { path: '/demostory1', name: 'DemoStory1' },
  ];

console.log(userInfo)
  // Ensure userInfo and userInfo.role are not null before rendering navigation links
  if (!userInfo || !userInfo.role) {
    return (
      <div className="navigation">
        <ul>
          <li></li>
        </ul>
      </div>
    ); // or return a loading indicator, or alternative content
  }
  

  return (
    <nav className="navigationwrap">
      <ul>
        {userInfo.role.routes.map((nav, idx) => (
          nav !== '/login' && (
            <li key={idx}>
              <Link to={nav}>{routeNames[nav] || nav}</Link>
            </li>
          )
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
