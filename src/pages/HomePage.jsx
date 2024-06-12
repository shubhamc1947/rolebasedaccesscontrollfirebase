import React from "react";
import { Link } from "react-router-dom";
import { useFirebase } from "../firebase";
import { useNavigate } from "react-router-dom";
import UserNumber from "../components/UserNumber";
import RoleNumber from "../components/RoleNumber";

const HomePage = () => {
  const navigate = useNavigate();
  const { user, userInfo, logoutUser } = useFirebase();
  console.log("home page");
  const handleLogout = async () => {
    const result = await logoutUser();
    if (result.success) {
      navigate("/login");
    } else {
      // Handle error during logout
      console.error(result);
    }
  };

  if (!user || !userInfo) {
    // navigate("/login")
    setTimeout(() => {
      navigate("/login")
    }, 1000);
    return (
      <div className="loarderwrap">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="homepage">
      <h1>Home Page</h1>
      <div className="homepagecont">
        <div className="userdatainfo">
          <h2>
            Welcome,{" "}
            <span className="royalblue usernamehome">{userInfo?.name}</span>
          </h2>
          <p>Email: {userInfo?.email}</p>
          <p>Mobile No: {userInfo?.mobileNo}</p>
          <button onClick={handleLogout} className="btndesign">
            Logout
          </button>
        </div>
        <div className="numberwrap">
          <UserNumber/>
          <RoleNumber/>
      </div>
      </div>
     
    </div>
  );
};

export default HomePage;
