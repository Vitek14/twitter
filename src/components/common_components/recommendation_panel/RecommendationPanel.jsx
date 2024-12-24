import SearchBar from "./SearchBar.jsx";
import {Layout} from "antd";
import RecommendationPeople from "./RecommendationPeople.jsx";
import RecommendationTopics from "./RecommendationTopics.jsx";


const RecommendationPanel = () => {
  return (
    <Layout style={{ width: "100%", position: 'fixed' }}>
      <SearchBar/>
      <RecommendationPeople/>
      <RecommendationTopics/>
    </Layout>
  )
}

export default RecommendationPanel;
