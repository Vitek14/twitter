import { Layout, theme} from "antd";
import ContentTabs from "./components/ContentTabs.jsx";
const { Header, Content } = Layout;
import data from "../../data/data.json"
import NewPost from "./components/NewPost.jsx";

const Home = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ maxWidth: "600px" }}>
      <Header style={{ backgroundColor: colorBgContainer, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ContentTabs/>
      </Header>
      <Content style={{ backgroundColor: colorBgContainer }}>
        <NewPost profile_image={data.profile.avatar} />
      </Content>
    </Layout>
  )
}

export default Home;
