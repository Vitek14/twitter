import { Layout } from "antd";
import ControlPanel from "../components/common_components/control_panel/ControlPanel.jsx";
import Home from "../components/home/Home.jsx";
import Sider from "antd/es/layout/Sider.js";
import RecommendationPeople from "../components/common_components/recommendation_panel/RecommendationPeople.jsx";
import RecommendationTopics from "../components/common_components/recommendation_panel/RecommendationTopics.jsx";
import SearchBar from "../components/common_components/recommendation_panel/SearchBar.jsx";

const HomePage = () => {

  return (
    <>
        <Layout style={{ display: "flex", minHeight: '100vh' }}>
          <ControlPanel />
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
