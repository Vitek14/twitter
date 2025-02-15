import {Input} from "antd"
import RecommendationPeople from "./RecommendationPeople.jsx";
import "./recommendations.scss"
import RecommendationTopics from "./RecommendationTopics.jsx";

const {Search} = Input;

const RecommendationPanel = () => {

  return (
    <div className="recommendations">
      <div className="recommendations__panel">
        <div className="recommendations__panel__box">
          <div className="recommendations__panel__box__search"> {/*style={{padding: '16px', marginBottom: '16px'}}*/}
            <Search
              placeholder="Search"
              // allowClear
              // onSearch={onSearch}
            />

            {/*<h3>Поиск</h3>*/}
            {/*<input type="text" placeholder="Поиск..." style={{width: '100%', padding: '8px'}}/>*/}
            <div className="recommendations__panel__trending">
              <RecommendationPeople/>
              <RecommendationTopics/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecommendationPanel;
