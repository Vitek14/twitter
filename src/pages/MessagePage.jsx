import { Layout, theme} from "antd";
import ControlPanel from "../components/common_components/control_panel/ControlPanel.jsx";
import Message from "../components/message/Message.jsx";
import Select from "../components/message/components/Select.jsx";
import {useEffect, useState} from "react";
import axios from "axios";

const { Sider } = Layout

const MessagePage = () => {
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/profile/")
      .then(res => {
        setProfile(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
      <Layout style={{ display: "flex", minHeight: '100vh' }}>
        <ControlPanel profile={profile}/>
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
