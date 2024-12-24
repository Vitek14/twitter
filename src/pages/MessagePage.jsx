import { Layout, theme} from "antd";
import ControlPanel from "../components/common_components/control_panel/ControlPanel.jsx";
import Message from "../components/message/Message.jsx";
import Select from "../components/message/components/Select.jsx";

const { Sider } = Layout

const MessagePage = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
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
  )
}

export default MessagePage;
