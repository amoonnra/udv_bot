import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'normalize.css';
import AuthPage from './pages/AuthPage';
import ChatPage from './pages/ChatPage';
import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthPage />,
    errorElement: <Navigate replace to="/" />,
  },
  {
    path: '/chat',
    element: <ChatPage />,
    errorElement: <Navigate replace to="/" />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
