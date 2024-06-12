import React, { useState } from 'react';
import { useFirebase } from '../firebase'; // Import the Firebase context

const LoginForm = () => {
  const { loginUser } = useFirebase(); // Access loginUser function from Firebase context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await loginUser(email, password);
    if (result.success) {
      // Login successful
      setError(null); // Clear any previous errors
      // Redirect or perform any other action after successful login
      console.log("Logged in successfully");
    } else {
      // Login failed, set error message
      setError(result.error.message);
    }
  };

  return (
    <div>
      <h2>Login User Form</h2>
      <form onSubmit={handleLogin}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>} {/* Display error message if login fails */}
    </div>
  );
};

export default LoginForm;
