import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import ProfilePage from "./pages/ProfilePage.jsx";
import HomePage from "./pages/HomePage.jsx";
import MessagePage from "./pages/MessagePage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate replace to="/profile" />,
    errorElement: <div>404 Not Found Error</div>
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/home",
    element: <HomePage />
  },
  {
    path: "/message",
    element: <MessagePage />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
