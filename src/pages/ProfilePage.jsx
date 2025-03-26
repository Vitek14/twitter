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
    Api.Home.get().then((res) => {
      setProfilePosts(res.data);

      const users = [...new Set(res.data.map(post => post.user))];
      console.log("ЮЗЕРЫ:");
      console.log(users);
      setUsers(users);
    }).catch(err => {
      localStorage.deleteItem('token');
      navigate("/login");
      console.error(err);
    });
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
          <ControlPanel
            profileInfo={profile}
          />
        </div>
        <div className="main__content-box">
            <Layout className="profile">
              <Profile profile={profile} profilePosts={profilePosts} users={users}/>
            </Layout>
        </div>
            {/* Правое боковое меню */}
            <RecommendationPanel/>
        </div>
    </ProfilePostsContext.Provider>
  )
}

export default ProfilePage;
