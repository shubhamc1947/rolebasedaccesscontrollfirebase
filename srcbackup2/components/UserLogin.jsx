import React, { useEffect, useState } from "react";
import { useFirebase } from "../firebase"; // Import the Firebase context
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
  const navigate=useNavigate();
  const { loginUser, user, fetchUserAllInfo } = useFirebase(); // Access loginUser function from Firebase context
  console.log(useFirebase())
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await loginUser(email, password);
    if (result.success) {
      
      console.log(result.combinedData);
      navigate("/")
      // Login successful
      setError(null); // Clear any previous errors
      // Redirect or perform any other action after successful login
      console.log("Logged in successfully");
    } else {
      // Login failed, set error message
      setError(result.error.message);
    }
  };

  useEffect(()=>{
    if(user){
      navigate("/")
      console.log("in")
      }
      console.log("out")
      },[error,user])

  return (
    <div>
      <form className="login" onSubmit={handleLogin}>
        <div className="heading">
          <h2>Login</h2>
        </div>
        <div className="container">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
        </div>
      </form>
      {error && <p>{error}</p>} {/* Display error message if login fails */}
    </div>
  );
};

export default LoginForm;
