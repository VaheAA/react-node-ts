import { createBrowserRouter, createRoutesFromElements, Navigate, Route, Routes } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import MainLayout from '../layouts/MainLayout';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Settings from '../pages/Settings';
import PrivateRoute from './PrivateRoute';




const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<MainLayout />}>
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="/" element={<Navigate to='/dashboard' />} />
    </>
  )
);




// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <PrivateRoute />,
//     children: [
//       {
//         path: '/dashboard',
//         element: <Dashboard />
//       },
//       {
//         path: '/settings',
//         element: <Settings />
//       }
//     ]
//   },
//   {
//     path: '/auth',
//     element: <AuthLayout />,
//     children: [
//       {
//         path: '/auth/login',
//         element: <Login />
//       }
//     ]
//   },
// ]);

export default router;