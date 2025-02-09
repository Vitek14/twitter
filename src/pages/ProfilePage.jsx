import {Col, Layout, Row, Spin} from "antd";
import ControlPanel from "../components/common_components/control_panel/ControlPanel.jsx";
import Profile from "../components/profile/Profile.jsx";
import RecommendationPanel from "../components/common_components/recommendation_panel/RecommendationPanel.jsx";
import "./profilepage.scss"
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {LoadingOutlined, XOutlined} from "@ant-design/icons";

const ProfilePage = () => {
  // Состояние загрузки
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  if (!token) {
    console.error('ERROR, NO TOKEN');
    stop();
    navigate("/login")
  }

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/profile/", {
        headers: {
          'x-auth-token': token
        }
      })
      .then(res => {
        if (res.status !== 200) {
          stop();
          navigate("/login")
          return;
        }
        setProfile(res.data);
        setLoading(false);
      })
      .catch(err => {
        stop();
        navigate("/login");
        console.error(err);
      });
  }, []);

  return (
    <Layout hasSider>
      <ControlPanel profile={profile}/>
      {/*<Row wrap={false}>*/}
        {/*<Col xs={3} sm={5} md={9} lg={{ flex: "0 0 500px" }} xl={{ flex: "0 0 700px" }} xxl={{ flex: "0 0 800px" }} style={{*/}
        {/*  maxWidth: "800px", // max to 800*/}
        {/*  minWidth: "0", // To stretch!*/}
        {/*  height: "100%",*/}
        {/*  width: "100%", // Not required, but can be useful*/}
        {/*}}>*/}
        {/*  <Layout className="profile" style={{ display: "flex", paddingLeft: "0px"}}>*/}
        {/*    <Profile profile={profile}/>*/}
        {/*  </Layout>*/}
        {/*/!*</Col>*!/*/}
        {/*/!*<Col style={{*!/*/}
        {/*/!*  flex: 1,*!/*/}
        {/*/!*  height: "100%",*!/*/}
        {/*/!*  width: "100%",*!/*/}
        {/*/!*}}>*!/*/}
        {/*  /!* Правое боковое меню *!/*/}
        {/*  <RecommendationPanel/>*/}
        {/*/!*</Col>*!/*/}
      {/*</Row>*/}
    </Layout>
  )
}

export default ProfilePage;
