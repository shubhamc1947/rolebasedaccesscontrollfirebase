import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, doc, deleteDoc, getDoc } from "firebase/firestore";
import DataTable from 'react-data-table-component';
import { TailSpin } from 'react-loader-spinner';
import EditForm from './EditForm';  // Import the EditForm component
import Modal from 'react-modal';  // Import the react-modal

// Set the app element for accessibility
Modal.setAppElement('#root');

const UserTable = () => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);  // State for the user being edited
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const firestore = getFirestore();
  const fetchUsers = async () => {
    const querySnapshot = await getDocs(collection(firestore, 'users'));
    const usersList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setUsers(usersList);
    setLoading(false);
  };
  useEffect(() => {
    
    fetchUsers();
  }, [firestore]);

  const handleDelete = async (userId) => {
    setLoading(true);
    const result = await deleteUser(userId);
    if (result.success) {
      setUsers(users.filter((user) => user.id !== userId));
      fetchUsers()
      alert("delete Successfully")
    } else {
      console.error('Error deleting user:', result.error);
    }
    setLoading(false);
  };

  const deleteUser = async (userId) => {
    try {
      const userDocRef = doc(firestore, 'users', userId);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        throw new Error('User not found in Firestore');
      }
      await deleteDoc(userDocRef);
      return { success: true };
    } catch (error) {
      console.error('Error deleting user:', error);
      return { success: false, error };
    }
  };

  const handleEdit = (userId) => {
    setEditingUser(userId);
    setIsModalOpen(true); // Open the modal when edit button is clicked
  };

  const columns = [
    {
      name: 'Sno',
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div>
          <button onClick={() => handleDelete(row.id)}>Delete</button>
          <button onClick={() => handleEdit(row.id)}>Edit</button>
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="loading">
        <TailSpin
          height="100"
          width="100"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          visible={true}
        />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Users Table</h1>
      <DataTable
        columns={columns}
        data={users}
        pagination
        highlightOnHover
        striped
        subHeader
        subHeaderComponent={
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => {
              const searchTerm = e.target.value.toLowerCase();
              const filteredUsers = users.filter((user) =>
                user.name.toLowerCase().includes(searchTerm) ||
                user.email.toLowerCase().includes(searchTerm)
              );
              setUsers(filteredUsers);
            }}
          />
        }
      />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Edit User"
        className="modal"
        overlayClassName="overlay"
      >
        {editingUser && <EditForm userId={editingUser} setEditingUser={setEditingUser} closeModal={() => setIsModalOpen(false)} />}
      </Modal>
    </div>
  );
};

export default UserTable;
