import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut, // Import signOut
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

// Create a context for Firebase
const FirebaseContext = createContext(null);

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyDUCpYqsPhouqrz8x3KdeRKGI-bMqS9TLA",
  authDomain: "role-based-dashboard-3245b.firebaseapp.com",
  databaseURL: "https://role-based-dashboard-3245b-default-rtdb.firebaseio.com",
  projectId: "role-based-dashboard-3245b",
  storageBucket: "role-based-dashboard-3245b.appspot.com",
  messagingSenderId: "952557441332",
  appId: "1:952557441332:web:16b7820cd3989d75f11561"
};

// Custom hook to use Firebase context
export const useFirebase = () => useContext(FirebaseContext);

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp); // Initialize Firestore
const firebaseAuth = getAuth(firebaseApp);

// Firebase provider component



export const FirebaseProvider = (props) => {

  const auth = getAuth(firebaseApp); // Get the auth object
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Listen to auth state changes
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser(user);
        fetchUserInfo(user.uid); // Fetch user info if user is logged in
      } else {
       

      }
    });
  }, []);


  const fetchUserInfo = async (uid) => {
    try {
      // Fetch user data from Firestore based on UID
      const usersRef = collection(firestore, "users");
      const q = query(usersRef, where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      const userDataArray = querySnapshot.docs.map(doc => doc.data());
      const userData = userDataArray[0];

      // Fetch role data from Firestore based on roleId
      const rolesRef = doc(firestore, "roles", userData.roleId);
      const roleDoc = await getDoc(rolesRef);

      if (!roleDoc.exists()) {
        throw new Error(`Role with ID ${userData.roleId} not found`);
      }

      const roleData = roleDoc.data();

      // Combine user data and role data
      const combinedData = { ...userData, role: roleData };
      setUserInfo(combinedData);
    } catch (error) {
      console.error("Error fetching user info: ", error);
      setError(error);
    }
  };

  const createUser = async (email, password, name, mobileNo, roleId) => {
    try {
      // Create user in Firebase authentication using the auth object
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Add user details to Firestore
      await addDoc(collection(firestore, "users"), {
        uid: user.uid,
        name,
        email,
        mobileNo,
        roleId
      });

      return { success: true };

    } catch (error) {
      console.error("Error adding user: ", error);
      setError(error);
      return { success: false, error };
    }
  };

  // const createUser = async (email, password, name, mobileNo, roleId) => {
  //   try {
  //     // Store the current user's credentials
  //     const currentUser = auth.currentUser;
  //     const currentUserEmail = currentUser ? currentUser.email : null;
  //     const currentUserPassword = currentUser ? prompt("Please enter your password to authenticate the process.") : null;
  
  //     // Sign out the current user
  //     if (currentUser) {
  //       await signOut(auth);
  //       setUser(null);
  //     }
  
  //     // Create the new user in Firebase authentication
  //     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  //     const user = userCredential.user;
  
  //     // Add user details to Firestore
  //     await addDoc(collection(firestore, "users"), {
  //       uid: user.uid,
  //       name,
  //       email,
  //       mobileNo,
  //       roleId,
  //     });
  
  //     // Sign out the newly created user
  //     await signOut(auth);
  
  //     // Re-sign in the old user
  //     if (currentUserEmail && currentUserPassword) {
  //       await signInWithEmailAndPassword(auth, currentUserEmail, currentUserPassword);
  //       fetchUserInfo(auth.currentUser.uid); // Fetch user info if user is logged back in
  //     }
  
  //     return { success: true };
  //   } catch (error) {
  //     console.error("Error adding user: ", error);
  //     setError(error);
  //     return { success: false, error };
  //   }
  // };
  


  const loginUser = async (email, password) => {
    try {
      // Sign in user using email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      await fetchUserInfo(firebaseUser.uid);

      return { success: true };

    } catch (error) {
      console.error("Error logging in: ", error);
      setError(error);
      return { success: false, error };
    }
  };

  const logoutUser = async () => {
    try {
      await signOut(auth); // Sign out the user
      setUser(null); // Clear the user state
      setUserInfo(null); // Clear the userInfo state
      return { success: true };
    } catch (error) {
      console.error("Error logging out: ", error);
      setError(error);
      return { success: false, error };
    }
  };

  const addRole = async (roleName, routes) => {
    try {
      await addDoc(collection(firestore, 'roles'), {
        roleName,
        routes
      });
      return { success: true };
    } catch (error) {
      console.error('Error adding role:', error);
      return { success: false, error };
    }
  };

  const getRoles = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, 'roles'));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching roles:', error);
      return []; // Return an empty array in case of error
    }
  };

  const isLoggedIn = !!user;

  return (
    <FirebaseContext.Provider
      value={{ createUser, loginUser, logoutUser, addRole, getRoles, isLoggedIn, user, userInfo, error }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
