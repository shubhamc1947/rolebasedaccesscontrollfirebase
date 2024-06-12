import React from "react";
import { Link } from "react-router-dom";
import { useFirebase } from "../firebase";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate=useNavigate();
  const { user, userInfo, logoutUser } = useFirebase();
  console.log("home page")
  const handleLogout = async () => {
    const result = await logoutUser();
    if (result.success) {
      navigate("/login")
      
    } else {
      // Handle error during logout
      console.error(result);
    }
  };

  if (!user || !userInfo) {
    return <div className="loarderwrap">
      <div className="loader"></div>
    </div>;
  }

  return (
    <div className="homepage">
      <h1>Home Page</h1>
      <div className="homepagecont">
        <div>
          <h2>Welcome, <span className="royalblue">{userInfo.name}</span></h2>
          <p>Email: {userInfo.email}</p>
          <p>Mobile No: {userInfo.mobileNo}</p>
          <button onClick={handleLogout} className="btndesign">Logout</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
