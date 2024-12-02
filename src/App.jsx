import {Col, Divider, Layout, Row, Space} from 'antd';
import './App.css'
import SideMenu from "./components/side_menu/side_menu.jsx"
import ProfileHeader from "./components/center_part/ProfileHeader.jsx";
import ProfileContent from "./components/center_part/ProfileContent.jsx"
import Post from "./components/center_part/Post.jsx"
import {Content, Footer} from "antd/es/layout/layout.js";

const App = () => {

  return (
    <Layout
      style={{
        minHeight: "100vh"
      }}
    >
      <Row style={{ height: "100vh" }}>
        <Col xs={2} sm={4} md={7} lg={8} xl={8} style={{ height: "100%" }}>
          <SideMenu/>
        </Col>
        <Col xs={3} sm={5} md={9} lg={9} xl={10} style={{ height: "100%" }}>
          <Layout style={{ backgroundColor: "#fff", border: "1px solid #000" }}>
            <ProfileHeader/>
            <Content style={{ margin: '0px 40px 0', overflow: 'initial', border: '1px solid #eff3f4' }}>
              <div
                style={{
                  // marginTop: "0px",
                  // padding: 24,
                  textAlign: 'left'
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
        </Col>
        <Col xs={24} sm={8} md={6} lg={4} xl={3} style={{ height: "100%", backgroundColor: "#fff" }}>
          {/* Правое боковое меню */}
        </Col>
      </Row>
    </Layout>
  )
}

export default App;