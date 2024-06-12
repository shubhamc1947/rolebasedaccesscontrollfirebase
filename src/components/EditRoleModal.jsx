import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import MultiSelect from 'multiselect-react-dropdown';
import {
  getFirestore,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useFirebase } from '../firebase';

const EditRoleModal = ({ isOpen, onRequestClose, role, onUpdate }) => {
//   const { firestore } = useFirebase();
    const firestore = getFirestore();

  const [roleName, setRoleName] = useState('');
  const [selectedRoutes, setSelectedRoutes] = useState([]);

  const availableRoutes = [
    { path: "/", name: "HOME" },
    { path: "/users", name: "Users" },
    { path: "/roles", name: "Roles" },
    { path: "/login", name: "Login" },
    { path: "/demostory1", name: "DemoStory1" },
  ];

  useEffect(() => {
    if (role) {
      setRoleName(role.roleName);
      setSelectedRoutes(role.routes.map(route => ({ path: route, name: route })));
    }
  }, [role]);

  const updateRole = async (roleId, roleName, routes) => {
    try {
        
      const roleRef = doc(firestore, "roles", roleId);
      await updateDoc(roleRef, { roleName, routes });
      return { success: true };
    } catch (error) {
      console.error("Error updating role:", error);
      return { success: false, error };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const routePaths = selectedRoutes.map(route => route.path);
    const result = await updateRole(role.id, roleName, routePaths);
    if (result.success) {
      onUpdate(); // This should trigger a re-render of the RoleTable
      onRequestClose();
      alert('Role updated successfully');
    } else {
      console.error('Error updating role:', result.error);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Edit Role">
      <h2>Edit Role</h2>
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
            options={availableRoutes}
            selectedValues={selectedRoutes}
            onSelect={setSelectedRoutes}
            onRemove={setSelectedRoutes}
            displayValue="name"
            showCheckbox={true}
            placeholder="Select Routes"
            closeIcon="cancel"
            avoidHighlightFirstOption={true}
          />
        </div>
        <button type="submit" className="updateRoleBtn">
          Update Role
        </button>
      </form>
    </Modal>
  );
};

export default EditRoleModal;
