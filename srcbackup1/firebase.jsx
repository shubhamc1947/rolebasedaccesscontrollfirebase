import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
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


const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyDUCpYqsPhouqrz8x3KdeRKGI-bMqS9TLA",
  authDomain: "role-based-dashboard-3245b.firebaseapp.com",
  databaseURL: "https://role-based-dashboard-3245b-default-rtdb.firebaseio.com",
  projectId: "role-based-dashboard-3245b",
  storageBucket: "role-based-dashboard-3245b.appspot.com",
  messagingSenderId: "952557441332",
  appId: "1:952557441332:web:16b7820cd3989d75f11561"
};


export const useFirebase = () => useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp); // Initialize firestore

export const FirebaseProvider = (props) => {
  const auth = getAuth(firebaseApp); // Get the auth object
  const [user, setUser] = useState(null);

  const createUser = async (email, password, name, mobileNo, roleId) => {
    console.log(name,email,password,mobileNo,roleId)
    try {
      // Create user in Firebase authentication using the auth object
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
     
      // Add user details to Firestore
      await addDoc(collection(getFirestore(firebaseApp), "users"), {
        uid: user.uid,
        name,
        email,
        mobileNo,
        roleId
      });

      return { success: true };
      
    } catch (error) {
      console.error("Error adding user: ", error);
      return { success: false, error };
    }
  };
  

  const loginUser = async (email, password) => {
    try {
      // Sign in user using email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      console.log(firebaseUser.uid)

      // Fetch user data from Firestore based on UID
      const usersRef = collection(getFirestore(firebaseApp), "users");
      const q = query(usersRef, where("uid", "==", firebaseUser.uid));
      const querySnapshot = await getDocs(q);
      const userData = querySnapshot.docs.map(doc => doc.data());

      console.log("User data:", userData);

      return { success: true, userData };

    } catch (error) {
      console.error("Error logging in: ", error);
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

  return (
    <FirebaseContext.Provider
      value={{ createUser,loginUser,addRole }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};


