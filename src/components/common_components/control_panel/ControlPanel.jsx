import {Layout} from "antd";
import ApplicationLogo from "./components/ApplicationLogo.jsx";
import Navbar from "./components/Navbar.jsx";
import ProfileBar from "./components/ProfileBar.jsx";
import NewPostButton from "./components/NewPostButton.jsx";
const { Header, Sider, Content, Footer } = Layout;

const ControlPanel = ({profile}) => {
  return (
    <Sider width={300} style={
      {
        overflow: 'auto',
        height: '100vh',
        position: 'sticky',
        insetInlineStart: 0,
        top: 0,
        bottom: 0,
        scrollbarWidth: 'thin',
        scrollbarGutter: 'stable',
      }
    }
    // style={{
    //     position: 'fixed', // Закрепление панели
    //     height: '100vh', // Высота на весь экран
    //     left: 0, // Чтобы она примыкала к левому краю
    //     top: 0, // Начало от верхней границы страницы
    //     overflow: 'auto', // Автоскролл, если содержимое больше высоты
    //   }}
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
    </Sider>
    )
};

export default ControlPanel;
