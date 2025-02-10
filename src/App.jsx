import './app.scss'
import ProfilePage from "./pages/ProfilePage.jsx";
import HomePage from "./pages/HomePage.jsx";
import MessagePage from "./pages/MessagePage.jsx";
import {createBrowserRouter, Navigate, RouterProvider, useNavigate} from "react-router-dom";
import React from "react";
import LightTheme from "./themes/LightTheme.jsx";
import {ConfigProvider, FloatButton} from "antd";
import DarkTheme from "./themes/DarkTheme.jsx";
import BedtimeIcon from '@mui/icons-material/Bedtime';
import LoginPage from "./pages/LoginPage.jsx";
import router from "./routes.jsx"

const App = () => {
  const [currentTheme, setCurrentTheme] = React.useState(LightTheme);

  React.useEffect(() => {
    if (currentTheme && currentTheme.token) {
      document.documentElement.style.setProperty('--login-bg', currentTheme.token.loginBg);
      document.documentElement.style.setProperty('--login-integration-buttons', currentTheme.token.loginIntegrationButtons);
    }
  }, [currentTheme]);

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
