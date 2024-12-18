import './app.scss'
import ProfilePage from "./pages/ProfilePage.jsx";
import HomePage from "./pages/HomePage.jsx";
import MessagePage from "./pages/MessagePage.jsx";
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";

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

const App = () => {
  return (
    <RouterProvider router={router}/>
  )
}

export default App;
