import {Button, Layout, Menu} from "antd";
import ApplicationLogo from "./components/ApplicationLogo.jsx";
import Navbar from "./components/Navbar.jsx";
import ProfileBar from "./components/ProfileBar.jsx";
import NewPostButton from "./components/NewPostButton.jsx";
const { Header, Sider, Content, Footer } = Layout;
import "./controlpanel.scss"
import {UserOutlined, XOutlined} from "@ant-design/icons";

const ControlPanel = ({profile}) => {
  return (
    <div className="control-panel">
      <div className="control-panel__content">
        <div className="control-panel__panel">
          <div className="control-panel__panel__app-logo">
            <XOutlined/>
          </div>
          <div className="control-panel__panel__buttons">
            <Button block>
              Test
            </Button>
            <Button block>
              Test
            </Button>
            <Button block>
              Test
            </Button>
            <Button block>
              Test
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default ControlPanel;
