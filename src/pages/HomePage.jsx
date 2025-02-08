import { Layout } from "antd";
import ControlPanel from "../components/common_components/control_panel/ControlPanel.jsx";
import Home from "../components/home/Home.jsx";
import Sider from "antd/es/layout/Sider.js";
import RecommendationPeople from "../components/common_components/recommendation_panel/RecommendationPeople.jsx";
import RecommendationTopics from "../components/common_components/recommendation_panel/RecommendationTopics.jsx";
import SearchBar from "../components/common_components/recommendation_panel/SearchBar.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const HomePage = () => {
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
      })
      .catch(err => {
        stop();
        navigate("/login");
        console.error(err);
      });
  }, []);

  return (
    <>
        <Layout style={{ display: "flex", minHeight: '100vh' }}>
          <ControlPanel profile={profile} />
          <Home/>
          <Sider >
            <SearchBar/>
            <RecommendationPeople/>
            <RecommendationTopics/>
          </Sider>
        </Layout>
    </>
  )
}

export default HomePage;
