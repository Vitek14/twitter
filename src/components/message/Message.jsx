import {ConfigProvider, Layout, theme} from "antd";
import Bar from "./components/Bar.jsx";
import {useContext} from "react";
import Inbox from "./components/Inbox.jsx";
import Sider from "antd/es/layout/Sider.js";
import Select from "./components/Select.jsx";

const { Header, Content } = Layout;

const Message = () => {
  const {
        token: { colorBgContainer },
    } = theme.useToken();
  // const { token } = useContext(ConfigProvider);
  return (
    <Layout style={{ width: "30vw", backgroundColor: colorBgContainer, borderLeft: "1px solid #f7f9f9" }}>
      <Header style={{
        padding: 0,
        display: "flex",
        alignItems: "center",
        backgroundColor: colorBgContainer,
      }}>
        <Bar/>
      </Header>
      <Content>
        <Inbox/>
      </Content>
    </Layout>
  )
}

export default Message;
