import {Divider, Layout, Space} from 'antd';
import './App.css'
import SideMenu from "./components/side_menu/side_menu.jsx"
import ProfileHeader from "./components/center_part/ProfileHeader.jsx";
import ProfileContent from "./components/center_part/ProfileContent.jsx"
import Post from "./components/center_part/Post.jsx"
import {Content} from "antd/es/layout/layout.js";

const App = () => {

    return (
        <Layout
            style={{
                minHeight: "100vh"
            }}
            >
            <SideMenu/>
            <Layout style={{ marginLeft: 400, backgroundColor: "#fff" }}>
                <ProfileHeader/>
                <Content style={{ margin: '0px 40px 0', marginRight: "620px", overflow: 'initial', border: '1px solid #eff3f4' }}>
                    <div
                    style={{
                        marginTop: "0px",
                        // padding: 24,
                        textAlign: 'left',
                    }}
                    className="content-tweet"
                    >
                        <ProfileContent/>
                        <Post/>
                        <Divider/>
                        <Post/>
                        <Divider/>
                        <Post/>
                        <Divider/>
                        <Post/>
                {/*<p>long content</p>*/}
                </div>
                </Content>
            </Layout>
        </Layout>
    )
}

export default App;