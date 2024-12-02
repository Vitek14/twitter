import {Col, Divider, Layout, Row, Space} from 'antd';
import './App.css'
import SideMenu from "./components/side_menu/side_menu.jsx"
import ProfileHeader from "./components/center_part/ProfileHeader.jsx";
import ProfileContent from "./components/center_part/ProfileContent.jsx"
import Post from "./components/center_part/Post.jsx"
import SearchComponent from "./components/trending/Search.jsx";
import {Content, Footer} from "antd/es/layout/layout.js";
import TrendingPeople from "./components/trending/TrendingPeople.jsx";

const App = () => {

  return (
    <Layout
      style={{
        minHeight: "100vh"
      }}
      >
        <SideMenu/>
          <Layout style={{ marginLeft: 400, backgroundColor: "#fff", border: '1px solid #000' }}>
            <ProfileHeader/>
              <Content style={{ margin: '0px 40px 0', width: 'calc(58%)', overflow: 'initial', border: '1px solid #eff3f4' }}>
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
                <Footer style={{
                  position: "relative",
                  left: "40px",
                  marginRight: "660px",
                  backgroundColor: "#fff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center"
                  // border: '1px solid #000',
                }}>
                  <Row style={{
                    }}>
                    <Col>
                      Дальше ничего нет
                    </Col>
                  </Row>
                </Footer>
          </Layout>
        <Layout style={{ backgroundColor: "#fff", border: '1px solid #000' }}>
          <SearchComponent/>
          <TrendingPeople/>
        </Layout>
        </Layout>
    )
}

export default App;