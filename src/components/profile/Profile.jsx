import {Avatar, Col, Divider, Layout, Row} from "antd";
import Overview from "./components/Overview.jsx";
import Banner from "./components/Banner.jsx";
import Bio from "./components/Bio.jsx";
import ContentTabs from "./components/ContentTabs.jsx";
import Post from "./components/Post.jsx";
import data from "../../data/data.json"

const {Content, Footer} = Layout

const Profile = () => {
  return (
    <Layout className="profile" style={{display: "flex", backgroundColor: "#fff", paddingLeft: "0px", border: "1px solid #f7f9f9"}}>
      <Overview/>
      <div className="ProfileContent">
        <Row style={{
          width: "100%"
        }}>
          <Col flex="auto">
            <Banner/>
          </Col>
          <Col>
          <Avatar
            size={132}
            src="src/assets/Avatar.png"
            style={{
              marginTop: "-80px",
              marginLeft: "20px",
            }}
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
      <Footer style={{
        position: "relative",
        left: "40px",
        marginRight: "660px",
        backgroundColor: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center"
      }}>
        <Row style={{}}>
          <Col>
            Дальше ничего нет
          </Col>
        </Row>
      </Footer>
    </Layout>
)
}

export default Profile;
