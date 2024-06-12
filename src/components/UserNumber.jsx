import React, { useState, useEffect } from 'react';
import { useFirebase } from '../firebase';
import { TailSpin } from 'react-loader-spinner';

const UserNumber = () => {
  const { getUsers } = useFirebase();
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        setLoading(true);
        const usersList = await getUsers();
        setTotalUsers(usersList.length);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching total users:', error);
        setLoading(false);
      }
    };
    fetchTotalUsers();
  }, [getUsers]);

  return (
    <div className="numbercont">
      {loading ? (
        <div className="loader">
          <TailSpin
            height={20}
            width={20}
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
          />
        </div>
      ) : (
        <div className="totalrolebox">
          <div className="totaldiv">Total Users: </div>
          <div className="totaldivnum">{totalUsers}</div>
        </div>
      )}
    </div>
  );
};

export default UserNumber;
