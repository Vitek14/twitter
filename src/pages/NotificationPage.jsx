import {Layout, Menu} from "antd"
import "./notificationpage.scss"

const {Sider, Content,  Header, Footer} = Layout;

const NotificationPage = () => {
  return (
    <div className="main">
      {/* Левый Sider */}
      <div style={{flexGrow: 1, display: 'flex', alignItems: "flex-end", flexDirection: 'column'}}>
        <Sider
          breakpoint="lg"
          collapsedWidth="50"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}

        >
          <div className="logo" style={{textAlign: 'center', padding: '16px'}}>Логотип</div>
          <Menu theme="dark" mode="vertical" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">Опция 1</Menu.Item>
            <Menu.Item key="2">Опция 2</Menu.Item>
            <Menu.Item key="3">Опция 3</Menu.Item>
          </Menu>
        </Sider>
      </div>

      {/* Центральный Content */}
      <div style={{flexGrow: 2, display: 'flex', flexDirection: 'column'}}>
        <Layout>
          <Header style={{background: '#eee', textAlign: 'center', padding: '16px'}}>
            Заголовок
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
