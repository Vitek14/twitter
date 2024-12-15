import {ConfigProvider, Layout, theme} from "antd";
import ControlPanel from "../components/common_components/control_panel/ControlPanel.jsx";
import Message from "../components/message/Message.jsx";
import LightTheme from "../themes/LightTheme.jsx";
import DarkTheme from "../themes/DarkTheme.jsx";
import Select from "../components/message/components/Select.jsx";

const { Sider, Content, Header } = Layout

const MessagePage = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <ConfigProvider theme={LightTheme}>
      <Layout style={{ display: "flex", minHeight: '100vh' }}>
        <ControlPanel/>
        <Message/>
        <Sider width={"48.2vw"} style={{
          borderLeft: "1px solid #f7f9f9",
          backgroundColor: colorBgContainer,
        }}>
          <Select/>
        </Sider>
      </Layout>
    </ConfigProvider>
  )
}

export default MessagePage;
