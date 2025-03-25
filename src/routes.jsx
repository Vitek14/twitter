import {createBrowserRouter, Navigate} from "react-router-dom";
import ProfilePage from "./pages/ProfilePage.jsx";
import HomePage from "./pages/HomePage.jsx";
import MessagePage from "./pages/MessagePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import React from "react";
import NotificationPage from "./pages/NotificationPage.jsx";
import PostComponent from "./components/post/Post.jsx";

const SecuredRoute = ({children, ...rest}) => {
  if (localStorage.getItem("token") === null) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate replace to="/profile" />,
    errorElement: <div>404 Not Found Error</div>
  },
  {
    path: "/profile",
    element: <SecuredRoute>
      <ProfilePage />
    </SecuredRoute>,
  },
  {
    path: "/post/:postId", // Change in future maybe
    element: <SecuredRoute>
      <PostComponent/>
    </SecuredRoute>,
  },
  {
    path: "/notifications",
    element: <SecuredRoute>
      <NotificationPage />
    </SecuredRoute>,
  },
  {
    path: "/home",
    element: <HomePage />
  },
  {
    path: "/message",
    element: <MessagePage />
  },
  {
    path: "/login",
    element: <LoginPage />
  }
])

export default router;
