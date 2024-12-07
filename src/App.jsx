import {Col, Divider, Layout, Row } from 'antd';
import './App.css'
import SideMenu from "./components/side_menu/side_menu.jsx"
import ProfileHeader from "./components/center_part/ProfileHeader.jsx";
import ProfileContent from "./components/center_part/ProfileContent.jsx"
import Post from "./components/center_part/Post.jsx"
import SearchComponent from "./components/trending/Search.jsx";
import {Content, Footer} from "antd/es/layout/layout.js";
import TrendingPeople from "./components/trending/TrendingPeople.jsx";
import TrendsRecommendation from "./components/trending/TrendsRecommendation.jsx";

const App = () => {

  return (
    <Layout
      style={{
        minHeight: "100vh"
      }}
    >
      <Row wrap={false} style={{ width: "100%", height: "100%", backgroundColor: "#fff" }}>
        <Col xs={2} sm={4} md={7} lg={8} xl={{ flex: "0 0 300px" }} xxl={{ flex: "0 0 483px" }} style={{
          maxWidth: "483px", // max to 800
          minWidth: "0", // To stretch!
          height: "100%",
          width: "100%", // Not required, but can be useful
        }}>
          <SideMenu/>
        </Col>
        <Col xs={3} sm={5} md={9} lg={{ flex: "0 0 500px" }} xl={{ flex: "0 0 700px" }} xxl={{ flex: "0 0 800px" }} style={{
          maxWidth: "800px", // max to 800
          minWidth: "0", // To stretch!
          height: "100%",
          width: "100%", // Not required, but can be useful
        }}>
          <Layout style={{ display: "flex", backgroundColor: "#fff", paddingLeft: "0px", border: "1px solid #f7f9f9"}}>
            <ProfileHeader/>
            <Content>
              <div
                style={{
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
        <Col style={{
          flex: 1,
          height: "100%",
          width: "100%",
          // minWidth: "100%",
          // minHeight: "100%"
        }}>
          {/* Правое боковое меню */}
          <Layout style={{ width: "100%", backgroundColor: "#fff" }}>
            <SearchComponent/>
            <TrendingPeople/>
            <TrendsRecommendation/>
          </Layout>
        </Col>
      </Row>
    </Layout>
  )
}

export default App;