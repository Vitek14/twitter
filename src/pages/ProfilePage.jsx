import {Col, Layout, Row, Spin} from "antd";
import ControlPanel from "../components/common_components/control_panel/ControlPanel.jsx";
import Profile from "../components/profile/Profile.jsx";
import RecommendationPanel from "../components/common_components/recommendation_panel/RecommendationPanel.jsx";
import "./profilepage.scss"
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {LoadingOutlined, XOutlined} from "@ant-design/icons";
import {ProfilePostsContext} from "../components/profile/ProfileContext.jsx";
import Api from "../api";

const ProfilePage = () => {
  // Состояние загрузки
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState([]);
  const [users, setUsers] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem('token');


  const [profilePosts, setProfilePosts] = useState([]);

  useEffect(() => {
    // Получаем данные постов и пользователей синхронно
    const fetchHomeData = () => {
      axios.get("http://localhost:5000/api/home/")
        .then(res => {
          setProfilePosts(res.data);
          return res.data;
        })
        .then(posts => {
          // Получаем уникальные ID пользователей
          const userIds = [...new Set(posts.map(post => post.user_id))];

          // Получаем данные пользователей
          const userPromises = userIds.map(userId =>
            axios.get(`http://localhost:5000/api/users/${userId}`)
          );

          return Promise.all(userPromises);
        })
        .then(userResponses => {
          const usersMap = userResponses.reduce((acc, userResponse) => {
            acc[userResponse.data.id] = userResponse.data;
            return acc;
          }, {});
          setUsers(usersMap);
        })
        .catch(error => {
          console.error('Ошибка при получении данных:', error);
        });
    };

    fetchHomeData();
  }, []);


  useEffect(() => {
    Api.Profile.get().then((res) => {
      console.log("test")
        setProfile(res.data);
        setLoading(false);
    }).catch(err => {
      localStorage.deleteItem('token');
      navigate("/login");
      console.error(err);
    });
  }, []);

  return (
    <ProfilePostsContext.Provider value={{ profilePosts, setProfilePosts }}>
      <Layout>
        <Row wrap={false}>
          <Col className="control-panel" xs={2} sm={4} md={7} lg={8} xl={{ flex: "0 0 300px" }} xxl={{ flex: "0 0 483px" }}>
            <ControlPanel profile={profile}/>
          </Col>
          <Col xs={3} sm={5} md={9} lg={{ flex: "0 0 500px" }} xl={{ flex: "0 0 700px" }} xxl={{ flex: "0 0 800px" }} style={{
            maxWidth: "800px", // max to 800
            minWidth: "0", // To stretch!
            height: "100%",
            width: "100%", // Not required, but can be useful
          }}>
            <Layout className="profile" style={{ display: "flex", paddingLeft: "0px"}}>
              <Profile profile={profile} profilePosts={profilePosts} users={users}/>
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
    </ProfilePostsContext.Provider>
  )
}

export default ProfilePage;
