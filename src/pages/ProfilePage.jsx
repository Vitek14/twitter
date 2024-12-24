import {Col, Layout, Row} from "antd";
import ControlPanel from "../components/common_components/control_panel/ControlPanel.jsx";
import Profile from "../components/profile/Profile.jsx";
import RecommendationPanel from "../components/common_components/recommendation_panel/RecommendationPanel.jsx";
import "./profilepage.scss"

const ProfilePage = () => {
  return (
    <Layout>
      <Row wrap={false}>
        <Col className="control-panel" xs={2} sm={4} md={7} lg={8} xl={{ flex: "0 0 300px" }} xxl={{ flex: "0 0 483px" }}>
          <ControlPanel/>
        </Col>
        <Col xs={3} sm={5} md={9} lg={{ flex: "0 0 500px" }} xl={{ flex: "0 0 700px" }} xxl={{ flex: "0 0 800px" }} style={{
          maxWidth: "800px", // max to 800
          minWidth: "0", // To stretch!
          height: "100%",
          width: "100%", // Not required, but can be useful
        }}>
          <Layout style={{ display: "flex", paddingLeft: "0px", border: "1px solid #f7f9f9"}}>
            <Profile/>
          </Layout>
        </Col>
        <Col style={{
          flex: 1,
          height: "100%",
          width: "100%",
        }}>
          {/* Правое боковое меню */}
          <RecommendationPanel/>
        </Col>
      </Row>
    </Layout>
  )
}

export default ProfilePage;
