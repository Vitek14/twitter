import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from "./App.jsx";
import {ConfigProvider} from "antd";
import LightTheme from "./themes/LightTheme.jsx";
import DarkTheme from "./themes/DarkTheme.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConfigProvider theme={LightTheme}>
      <App/>
    </ConfigProvider>
  </StrictMode>,
)
