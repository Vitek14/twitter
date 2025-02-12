import {Layout, Menu, Typography} from "antd"
import "./notificationpage.scss"
import {XOutlined} from "@ant-design/icons";
import ControlPanel from "../components/common_components/new_control_panel/ControlPanel.jsx";

const {Sider, Content,  Header, Footer} = Layout;

const NotificationPage = () => {
  return (
    <div className="main">
      {/* Левый Sider */}
      <div className="control-panel" style={{flexGrow: 1, display: 'flex', alignItems: "flex-end", flexDirection: 'column', height: "100vh"}}>
        <ControlPanel />
      </div>

      {/* Центральный Content */}
      <div style={{flexGrow: 2, display: 'flex', flexDirection: 'column'}}>
        <Layout>
          <Header style={{textAlign: 'start', padding: '16px'}}>
            <Typography.Title level={4}>
              Notifications
            </Typography.Title>
          </Header>
          <Content style={{padding: '24px', flexGrow: 1}}>
            <div style={{
              background: '#fafafa',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              Основное содержимое
            </div>
          </Content>
          <Footer style={{background: '#eee', textAlign: 'center'}}>Ant Design ©2025</Footer>
        </Layout>
      </div>

      {/* Правая кастомная панель */}
      <div style={{flexGrow: 1, display: 'flex', flexDirection: 'column', background: '#f0f2f5', padding: '24px'}}>
        <div style={{background: '#fff', padding: '16px', marginBottom: '16px'}}>
          <h3>Поиск</h3>
          <input type="text" placeholder="Поиск..." style={{width: '100%', padding: '8px'}}/>
        </div>
        <div style={{background: '#fff', padding: '16px'}}>
          <h3>Тренды</h3>
          <ul>
            <li>Тренд 1</li>
            <li>Тренд 2</li>
            <li>Тренд 3</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default NotificationPage;
