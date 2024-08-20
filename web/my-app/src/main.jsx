import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Package from './pages/Package.jsx'
import Login from './pages/Login';
import Home from './pages/Home';

import {

createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

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
    path: "/home",
    element: <Home />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
