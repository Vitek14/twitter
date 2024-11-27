import {Layout, Space} from 'antd';
import './App.css'
import SideMenu from "./components/side_menu/side_menu.jsx"
import ProfileHeader from "./components/center_part/ProfileHeader.jsx";

const App = () => {

    return (
        <Layout
            style={{
                minHeight: "100vh"
            }}
            >
            <SideMenu/>
            <Layout style={{ marginLeft: -40 }}>
                <ProfileHeader/>
            </Layout>
        </Layout>
    )
}

export default App;