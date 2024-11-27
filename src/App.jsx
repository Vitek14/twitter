import {Layout, Space} from 'antd';
import './App.css'
import SideMenu from "./components/side_menu/side_menu.jsx"

const App = () => {

    return (
        <Layout
            style={{
                minHeight: "100vh"
            }}
            >
            <SideMenu/>
        </Layout>
    )
}

export default App;