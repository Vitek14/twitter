import {Menu, Layout} from "antd";

const {Sider} = Layout;

const ControlPanel = () => {
  return (
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
  )
}

export default ControlPanel;
