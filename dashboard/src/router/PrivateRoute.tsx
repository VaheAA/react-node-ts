import { Outlet, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { getToken } from '../utils/getToken';


const PrivateRoute = () => {

  return getToken() ? <Outlet /> : <Navigate to="/login" />;

};

export default PrivateRoute;