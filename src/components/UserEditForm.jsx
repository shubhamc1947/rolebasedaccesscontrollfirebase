import React, { useState } from 'react';

const UserEditForm = ({ user, onClose }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [mobileNo, setMobileNo] = useState(user.mobileNo);
  const [role, setRole] = useState(user.roleId); // Assuming roleId is used for role selection
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission to update user information
    try {
      // Your update logic here, e.g., calling a function to update the user in the database
      console.log('Form submitted');
      onClose(); // Close the edit form
    } catch (error) {
      console.error('Error updating user:', error.message);
      setError(error.message);
    }
  };

  return (
    <div className="edit-form">
      <h2>Edit User</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mobile No</label>
          <input
            type="text"
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            {/* Assuming roles are fetched from a prop */}
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.roleName}
              </option>
            ))}
          </select>
        </div>
        {error && <div className="errmsg">{error}</div>}
        <button type="button" onClick={onClose}>Close</button>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default UserEditForm;
