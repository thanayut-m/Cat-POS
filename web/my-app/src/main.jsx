import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Package from './pages/Package.jsx'
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Product from './pages/Product';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Package />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/product",
    element: <Product />
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
