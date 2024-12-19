import { ConfigProvider, Layout, theme} from "antd";
import ControlPanel from "../components/common_components/control_panel/ControlPanel.jsx";
import { Tabs } from 'antd';
import LightTheme from "../themes/LightTheme.jsx";
import Home from "../components/home/Home.jsx";
import DarkTheme from "../themes/DarkTheme.jsx";

const { Header } = Layout;
const {TabPane} = Tabs;

const HomePage = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <ConfigProvider theme={LightTheme}>
        <Layout style={{ display: "flex", minHeight: '100vh' }}>
          <ControlPanel />
          <Home/>
        </Layout>
      </ConfigProvider>
    </>
  )
}

export default HomePage;
