import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import isAuthenticated from '../utils/isAuthenticated';

const ProtectedRoute = ({ element }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await isAuthenticated();
      setAuth(isAuth);
    };

    if (auth === null) {
      checkAuth();
    }
  }, [auth]);

  if (auth === null) {
    return <div>Loading...</div>;
  }

  return auth ? element : <Navigate to="/admin" replace />;
};

export default ProtectedRoute;