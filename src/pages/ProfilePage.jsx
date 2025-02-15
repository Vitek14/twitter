import {Col, Layout, Row, Spin} from "antd";
import ControlPanel from "../components/common_components/new_control_panel/ControlPanel.jsx";
import Profile from "../components/profile/Profile.jsx";
import RecommendationPanel from "../components/common_components/new_recommendation_panel/RecommendationPanel.jsx";
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
      <div className="main">
        <div className="main__control-panel">
          <ControlPanel/>
        </div>
        <div className="main__content-box">
            <Layout className="profile">
              <Profile profile={profile} profilePosts={profilePosts} users={users}/>
            </Layout>
        </div>
            {/* Правое боковое меню */}
            <RecommendationPanel/>
        {/*</Row>*/}
      {/*</Layout>*/}
        </div>
    </ProfilePostsContext.Provider>
  )
}

export default ProfilePage;
