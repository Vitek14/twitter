import { Layout } from "antd";
import ControlPanel from "../components/common_components/control_panel/ControlPanel.jsx";
import Home from "../components/home/Home.jsx";
import Sider from "antd/es/layout/Sider.js";
import RecommendationPeople from "../components/common_components/recommendation_panel/RecommendationPeople.jsx";
import RecommendationTopics from "../components/common_components/recommendation_panel/RecommendationTopics.jsx";
import SearchBar from "../components/common_components/recommendation_panel/SearchBar.jsx";
import {useEffect, useState} from "react";
import axios from "axios";

const HomePage = () => {
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/profile/")
      .then(res => {
        setProfile(res.data);
      })
      .catch(err => {
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
