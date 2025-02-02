import {Layout} from "antd";
import ApplicationLogo from "./components/ApplicationLogo.jsx";
import Navbar from "./components/Navbar.jsx";
import ProfileBar from "./components/ProfileBar.jsx";
import NewPostButton from "./components/NewPostButton.jsx";
const { Header, Sider, Content, Footer } = Layout;

const ControlPanel = ({profile}) => {
  return (
    <Sider width={400}
    // style={{
    //     position: 'fixed', // Закрепление панели
    //     height: '100vh', // Высота на весь экран
    //     left: 0, // Чтобы она примыкала к левому краю
    //     top: 0, // Начало от верхней границы страницы
    //     overflow: 'auto', // Автоскролл, если содержимое больше высоты
    //   }}
    >
      <Layout
        style={{
          marginTop: 0,
          marginLeft: 60,
        }}
      >
      {/*  Here will be all components*/}
        <Header>
          <ApplicationLogo/>
        </Header>

        <Content
          style={{
            height: "100vh",
            padding: 20
          }}
        >
          <Navbar/>
          <NewPostButton/>

          {/* TODO: This shouldn't be heere*/}
          <Footer style={{ display: 'flex', justifyContent: 'flex-start', padding: 0 }}>
            <ProfileBar profile={profile}/>
          </Footer>
        </Content>
      </Layout>
    </Sider>
    )
};

export default ControlPanel;
