import React, { useEffect } from 'react'
import { useFirebase } from '../firebase'
const Logout = () => {
    const {logoutUser}=useFirebase();

    function logout(){
        const res=logoutUser();
        console.log(res)
    }
    // console.log(firebase)
    useEffect(()=>{
        console.log('use effect logout')
        logout();
    },[])
  return (
    <div>Logout</div>
  )
}

export default Logout