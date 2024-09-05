import { Outlet, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './authContext';
import Cookies from 'js-cookie'

export const PrivateRoute = () => {
    /* const { cookies } = useAuth(); */
    const { isAuthenticated, loading, cookies } = useContext(AuthContext);

    const storedisAuthenticated = !!Cookies.get('token');
    console.log("Private Route: ", storedisAuthenticated);
    if (loading) {
      // While loading, display a spinner or some placeholder content
      return <div>Loading...</div>;
  }
  console.log(!!Cookies.get('token'));

    return storedisAuthenticated ? <Outlet/> : <Navigate to='/' exact />
};

export default PrivateRoute;