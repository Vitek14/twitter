import { ConfigProvider, Layout, theme} from "antd";
import ControlPanel from "../components/common_components/control_panel/ControlPanel.jsx";
import { Tabs } from 'antd';
import LightTheme from "../themes/LightTheme.jsx";

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
          <Header style={{ backgroundColor: colorBgContainer, width: "600px", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Tabs
                defaultActiveKey="1"
                tabBarGutter={300}
              >
                  <TabPane tab="For you" key="1">
                  </TabPane>
                  <TabPane tab="Following" key="2">
                  </TabPane>
                </Tabs>
          </Header>
        </Layout>
      </ConfigProvider>
    </>
  )
}

export default HomePage;
