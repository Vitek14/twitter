import './app.scss'
import ProfilePage from "./pages/ProfilePage.jsx";
import HomePage from "./pages/HomePage.jsx";
import MessagePage from "./pages/MessagePage.jsx";
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import React from "react";
import LightTheme from "./themes/LightTheme.jsx";
import {ConfigProvider, FloatButton} from "antd";
import DarkTheme from "./themes/DarkTheme.jsx";
import BedtimeIcon from '@mui/icons-material/Bedtime';

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
  const [currentTheme, setCurrentTheme] = React.useState(LightTheme);
  return (
    <ConfigProvider theme={currentTheme}>
      <RouterProvider router={router}/>

      {/* Changing theme*/}
      <FloatButton icon={<BedtimeIcon/>} onClick={() => {
        if (currentTheme === DarkTheme) {
          setCurrentTheme(LightTheme);
        }
        else {
          setCurrentTheme(DarkTheme);
        }
      }} />
    </ConfigProvider>
  )
}

export default App;
