import { Layout } from 'antd';
import './App.css'
import {Header} from "antd/es/layout/layout.js";
import { XOutlined } from "@ant-design/icons";
const { Content, Footer, Sider } = Layout;

const App = () => {
    return (
        <Layout
            style={{
                minHeight: "100vh"
            }}
            >
            <Sider width={400} style={{ background: "#fff" }}>
                <Layout
                        style={{
                            marginTop: 20,
                            marginLeft: 60
                        }}
                        >
                    <Header
                        style={{
                            background: "#fff"
                        }}
                        >
                        <XOutlined style={{ fontSize: "30px", marginLeft: -30}} />
                    </Header>
                    <Content
                        style={{
                            background: "#fff",
                            padding: 20
                        }}
                        >
                        Test
                    </Content>
                </Layout>
            </Sider>
        </Layout>
    )
}

export default App;