import React, { useState } from 'react';
import { useFirebase } from '../firebase'; // Import the Firebase context

const UserForm = () => {
  const firebase = useFirebase(); 
  console.log("User Form Component")
  console.log("firebase data ",firebase)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await firebase.createUser(email, password, name, mobileNo, role);
    if (result.success) {
      // Reset form fields after successful submission
      setName('');
      setEmail('');
      setPassword('');
      setMobileNo('');
      setRole('');
      alert("Data inserted")
    }else{
      alert("Due to some error data could not insert")
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <div>
        <label>Mobile No</label>
        <input type="text" value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} required />
      </div>
      <div>
        <label>Role</label>
        <input type="text" value={role} onChange={(e) => setRole(e.target.value)} required />
      </div>
      <button type="submit">Add User</button>
    </form>
  );
};

export default UserForm;
