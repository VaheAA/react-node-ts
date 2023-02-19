import { Children } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '../lalyouts/MainLayout';
import Home from '../pages/Home';
import NewMessage from '../pages/NewMessage';


const router = createBrowserRouter([
  {
    path: '/:lang',
    element: <MainLayout />,
    children: [
      {
        path: '/:lang',
        element: <Home />
      },
      {
        path: '/:lang/new-message',
        element: <NewMessage />
      },
    ]
  },
  {
    path: '/*',
    element: <Navigate to="/hy" />
  }

]);

export default router;