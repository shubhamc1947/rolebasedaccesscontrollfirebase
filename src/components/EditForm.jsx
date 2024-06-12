import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, updateDoc, collection, getDocs } from 'firebase/firestore';

const EditForm = ({ userId, setEditingUser, closeModal }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [role, setRole] = useState('');
  const [roles, setRoles] = useState([]);
  const firestore = getFirestore();

  useEffect(() => {
    const fetchUser = async () => {
      const userDoc = await getDoc(doc(firestore, 'users', userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUser(userData);
        setName(userData.name);
        setEmail(userData.email);
        setMobileNo(userData.mobileNo);
        setRole(userData.roleId);
        setLoading(false);
      } else {
        console.error('User not found');
        setLoading(false);
      }
    };
    fetchUser();
  }, [firestore, userId]);

  useEffect(() => {
    const fetchRoles = async () => {
      const querySnapshot = await getDocs(collection(firestore, 'roles'));
      const rolesList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRoles(rolesList);
    };
    fetchRoles();
  }, [firestore]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateDoc(doc(firestore, 'users', userId), {
        name,
        email,
        mobileNo,
        roleId: role
      });
      setEditingUser(null);
      closeModal(); 
      alert("User updated successfully");
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Error updating user');
    }
    setLoading(false);
  };

  if (loading) {
    return <p>Processing...</p>;
  }

  return (
    <div className="editformwrap">
      <div className="edit">
        <div className="heading">
          <h2>Edit User</h2>
        </div>
        <div className="container">
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
                <option value="">Select Role</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.roleName}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit">Update User</button>
            <button type="button" onClick={closeModal}>Cancel</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
