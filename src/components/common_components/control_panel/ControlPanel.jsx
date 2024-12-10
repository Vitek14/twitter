import {ConfigProvider, Layout} from "antd";
import ApplicationLogo from "./components/ApplicationLogo.jsx";
import NavBar from "./components/NavBar.jsx";
import ProfileBar from "./components/ProfileBar.jsx";
import lightTheme from "../../../themes/LightTheme.jsx";
import NewPostButton from "./components/NewPostButton.jsx";
const { Header, Sider, Content, Footer } = Layout;

const ControlPanel = () => {
  return (
    <Sider width={400} style={{ position: 'fixed', backgroundColor: "#fff" }}>
      <Layout
        style={{
          marginTop: 0,
          marginLeft: 60,
          backgroundColor: "#fff"
        }}
      >
      {/*  Here will be all components*/}
        <Header style={{
          background: "#fff",
        }}>
          <ApplicationLogo/>
        </Header>

        <Content
          style={{
            height: "100vh",
            padding: 20
          }}
        >
          <NavBar/>
          <NewPostButton/>

          {/* TODO: This shouldn't be heere*/}
          <Footer style={{ display: 'flex', justifyContent: 'flex-start', padding: 0, backgroundColor: "#fff" }}>
            <ProfileBar/>
          </Footer>
        </Content>
      </Layout>
    </Sider>
    )
};

export default ControlPanel;
