import {Avatar, Col, Layout, Row} from "antd";
import Overview from "./components/Overview.jsx";
import Banner from "./components/Banner.jsx";
import Bio from "./components/Bio.jsx";
import ContentTabs from "./components/ContentTabs.jsx";
import Post from "./components/Post.jsx";
import data from "../../data/data.json"
import "./profile.scss"

const {Content, Footer} = Layout

const Profile = () => {
  return (
    <Layout className="profile">
      <Overview/>
      <div className="profile__content">
        <Row>
          <Col flex="auto">
            <Banner/>
          </Col>
          <Col>
          <Avatar
            className="profile__avatar"
            size={132}
            src="src/assets/Avatar.png"
          />
        </Col>
        </Row>
        <Bio/>
        <Content>
          <ContentTabs/>
          {data.posts.map((post, key) => {
            // const user = data.users.find(u => u.id === post.user_id);
            return(
              <Post
                key={key}
                post={post}
                user={data.users.find(u => u.id === post.user_id)}
              />
            )
          })}
        </Content>
      </div>
      <Footer>
        <Row>
          <Col>
            Дальше ничего нет
          </Col>
        </Row>
      </Footer>
    </Layout>
)
}

export default Profile;
