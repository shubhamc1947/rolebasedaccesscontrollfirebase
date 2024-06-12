import React, { useState } from 'react';
import { useFirebase } from '../firebase'; // Import the Firebase context

const RoleForm = () => {
  const { addRole } = useFirebase(); // Access addRole function from Firebase context
  const [roleName, setRoleName] = useState('');
  const [selectedRoutes, setSelectedRoutes] = useState([]);

  // Static list of available routes
  const availableRoutes = [
    { path: '/', name: 'HOME' },
    { path: '/users', name: 'Users' },//this is register
    { path: '/roles', name: 'Roles' },
    { path: '/login', name: 'Login' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await addRole(roleName, selectedRoutes);
    if (result.success) {
      // Reset form fields after successful submission
      setRoleName('');
      setSelectedRoutes([]);
      alert('Role Inserted')
    } else {
      // Handle error
      console.error('Error adding role:', result.error);
    }
  };

  const handleRouteChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedRoutes(selectedOptions);
  };

  return (
    <div>
      <h2>Add Role</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Role Name</label>
          <input
            type="text"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Routes</label>
          <select
            multiple
            value={selectedRoutes}
            onChange={handleRouteChange}
            required
          >
            {availableRoutes.map((route) => (
              <option key={route.path} value={route.path}>
                {route.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Add Role</button>
      </form>
    </div>
  );
};

export default RoleForm;
