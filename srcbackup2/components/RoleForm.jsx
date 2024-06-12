import React, { useState } from 'react';
import { useFirebase } from '../firebase'; // Import the Firebase context
import MultiSelect from 'multiselect-react-dropdown'; // Import MultiSelect component

const AddRole = () => {
  const { addRole } = useFirebase(); // Access addRole function from Firebase context
  const [roleName, setRoleName] = useState('');
  const [selectedRoutes, setSelectedRoutes] = useState([]);

  const { user, userInfo } = useFirebase();

  // Static list of available routes
  const availableRoutes = [
    { path: '/', name: 'HOME' },
    { path: '/users', name: 'Users' },
    { path: '/roles', name: 'Roles' },
    { path: '/login', name: 'Login' },
    { path: '/demostory1', name: 'DemoStory1' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const routePaths = selectedRoutes.map(route => route.path); // Extract only path values
    console.log(routePaths)
    const result = await addRole(roleName, routePaths);
    if (result.success) {
      // Reset form fields after successful submission
      setRoleName('');
      setSelectedRoutes([]);
      alert('Role Inserted');
    } else {
      // Handle error
      console.error('Error adding role:', result.error);
    }
  };

  if (!user || !userInfo) {
    return (
      <div className="loaderwrap">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="add-role">
      <h2>Add Role</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="roleName">Role Name</label>
          <input
            type="text"
            id="roleName"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            required
          />
        </div>
        <div className="multi-select">
          <label htmlFor="routes">Routes</label>
          <MultiSelect
            options={availableRoutes} // Options for the dropdown
            selectedValues={selectedRoutes} // Selected values
            onSelect={setSelectedRoutes} // Function to handle selection
            onRemove={setSelectedRoutes} // Function to handle removal
            displayValue="name" // Property of each option to display
            showCheckbox={true} // Show checkboxes for multiple selection
            placeholder="Select Routes" // Placeholder text
            closeIcon="cancel" // Close icon
            avoidHighlightFirstOption={true} // Avoid highlighting the first option
          />
        </div>
        <button type="submit" className='addrolebtn'>Add Role</button>
      </form>
    </div>
  );
};

export default AddRole;
