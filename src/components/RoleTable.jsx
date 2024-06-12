import React, { useState, useEffect } from 'react';
import { useFirebase } from '../firebase';
import EditRoleModal from './EditRoleModal'; // Import the EditRoleModal component
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  deleteDoc,
  getDoc,
  query, // Import the query function
  where,
} from "firebase/firestore";

const RoleTable = () => {

  const { getRoles } = useFirebase();
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);
  const firestore = getFirestore();
  const fetchRoles = async () => {
    try {
      const rolesData = await getRoles();
      setRoles(rolesData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching roles:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, [getRoles]);

  const handleDelete = async (roleId) => {
    try {
      setLoading(true);
      await deleteRole(roleId); // Pass the firestore instance
      setRoles(roles.filter(role => role.id !== roleId));
      setLoading(false);
      fetchRoles();
      alert('Role and associated users deleted successfully');
    } catch (error) {
      console.error('Error deleting role:', error);
      setLoading(false);
    }
  };
  

  const deleteRole = async (roleId) => {
    try {
      const usersRef = collection(firestore, "users");
      const q = query(usersRef, where("roleId", "==", roleId));
      const querySnapshot = await getDocs(q);
      const deletePromises = querySnapshot.docs.map((userDoc) =>
        deleteDoc(doc(firestore, "users", userDoc.id))
      );
      await Promise.all(deletePromises);
      
      // Delete the role itself
      const roleRef = doc(firestore, "roles", roleId);
      await deleteDoc(roleRef);
      
      return { success: true };
    } catch (error) {
      console.error("Error deleting role:", error);
      return { success: false, error };
    }
  };
  
  

  const handleEdit = (role) => {
    setCurrentRole(role);
    setShowEditModal(true);
  };

  const handleUpdate = () => {
    fetchRoles();
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const routeNames = [
    ["/", "HOME"],
    ["/users", "Users"],
    ["/roles", "Roles"],
    ["/login", "Login"],
    ["/demostory1","DemoStory1"]
  ];

  return (
    <div>
      <h2>Roles</h2>
      <table>
        <thead>
          <tr>
            <th>Role Name</th>
            <th>Routes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map(role => (
            <tr key={role.id}>
              <td>{role.roleName}</td>
              <td>
                <ul>
                  {role.routes.map((route, index) => {
                    const map=routeNames.filter((curr)=>{
                      if(curr[0]===route){
                        return curr[1]
                      }
                    })
                    // console.log(map[0][1])
                    return (
                      <li key={index}>{map[0][1]}</li>
                    );
                  })}
                </ul>
              </td>
              <td>
                <button onClick={() => handleEdit(role)}>Edit</button>
                <button onClick={() => handleDelete(role.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <EditRoleModal
        isOpen={showEditModal}
        onRequestClose={() => setShowEditModal(false)}
        role={currentRole}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default RoleTable;
