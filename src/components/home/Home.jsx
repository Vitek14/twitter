import { Layout, theme} from "antd";
import ContentTabs from "./components/ContentTabs.jsx";
const { Header, Content } = Layout;
import data from "../../data/data.json"
import NewPost from "./components/NewPost.jsx";
import RecentPosts from "./components/RecentPosts.jsx";
import Post from "../profile/components/Post.jsx";

const Home = () => {

  return (
    <Layout style={{ maxWidth: "800px" }}>
      <Header style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ContentTabs/>
      </Header>
      <Content>
        <NewPost profile_image={data.profile.avatar} />
        <RecentPosts/>
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
    </Layout>
  )
}

export default Home;
