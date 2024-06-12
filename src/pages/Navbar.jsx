import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useFirebase } from "../firebase";

const Navigation = () => {
  const { userInfo } = useFirebase();
  useEffect(()=>{
    localStorage.setItem("localuserinfo",JSON.stringify(userInfo))
  },[userInfo])
  const routeNames = {
    "/": "HOME",
    "/users": "Users",
    "/roles": "Roles",
    "/login": "Login",
    "/demostory1":"DemoStory1"
  };


console.log(userInfo)
  if (!userInfo || !userInfo.role) {
    return (
      <div className="navigation">
        <ul>
          <li></li>
        </ul>
      </div>
    ); 
  }
  

  return (
    <nav className="navigationwrap">
      <ul>
        {userInfo.role.routes.map((nav, idx) => (
          nav !== '/login' && (//i dont' want to show login here
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
