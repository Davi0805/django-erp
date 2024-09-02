import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import axiosConfig from "./axiosConfig";
import Cookies from 'js-cookie'

const PrivateRoute = () => {
  const isAuthenticated = !!Cookies.get("token");

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};
export default PrivateRoute;

/* const PrivateRoute = () => {

  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const [loading, setLoading] = React.useState(true);


  React.useEffect(() => {

    axiosConfig.get('api/isauthenticated')

      .then(response => {

        setIsAuthenticated(response.data.authenticated);

        setLoading(false);

      })

      .catch(error => {

        setLoading(false);

      });

  }, []);


  if (loading) {

    return <div>Carregando...</div>;

  }


  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;

};


export default PrivateRoute;
 */