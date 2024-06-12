import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFirebase } from '../firebase';

const ProtectedRoutes = ({ compo: Component }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [accessRoutes, setAccessRoutes] = useState(null);
  const { userInfo } = useFirebase();

  useEffect(() => {
    const localUserInfo = localStorage.getItem('localuserinfo');
    if (localUserInfo) {
      setAccessRoutes(JSON.parse(localUserInfo));
    }
  }, [userInfo]);

  useEffect(() => {
    if (accessRoutes?.role?.routes) {
      const isAccessible = accessRoutes.role.routes.includes(location.pathname);
      if (!isAccessible) {
        navigate('/pagenotfound');
      }
    }
  }, [accessRoutes, location.pathname, navigate]);

  return <Component />;
};

export default ProtectedRoutes;
