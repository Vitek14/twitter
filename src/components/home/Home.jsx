import { Layout, theme} from "antd";
import ContentTabs from "./components/ContentTabs.jsx";
const { Header, Content } = Layout;
import data from "../../data/data.json"
import NewPost from "./components/NewPost.jsx";
import RecentPosts from "./components/RecentPosts.jsx";
import Post from "../profile/components/Post.jsx";
import {useEffect, useState} from "react";
import axios from "axios";

const Home = () => {
  const [profile, setProfile] = useState([]);
  const [profilePosts, setProfilePosts] = useState([]);
  const [users, setUsers] = useState({});

  useEffect(() => {
    // Получаем данные постов и пользователей синхронно
    const fetchHomeData = () => {
      axios.get("http://localhost:5000/api/home/")
        .then(res => {
          setProfilePosts(res.data);
          return res.data;
        })
        .then(posts => {
          // Получаем уникальные ID пользователей
          const userIds = [...new Set(posts.map(post => post.user_id))];

          // Получаем данные пользователей
          const userPromises = userIds.map(userId =>
            axios.get(`http://localhost:5000/api/users/${userId}`)
          );

          return Promise.all(userPromises);
        })
        .then(userResponses => {
          const usersMap = userResponses.reduce((acc, userResponse) => {
            acc[userResponse.data.id] = userResponse.data;
            return acc;
          }, {});
          setUsers(usersMap);
        })
        .catch(error => {
          console.error('Ошибка при получении данных:', error);
        });
    };

    fetchHomeData();
  }, []);

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
    <Layout style={{ maxWidth: "800px" }}>
      <Header style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ContentTabs/>
      </Header>
      <Content>
        <NewPost profile_image={profile.avatar_url} />
        <RecentPosts/>
        {profilePosts.map((post, key) => {
            const user = users[post.user_id]; // Получаем пользователя из состояния
            return (
              user && (
                <Post
                  key={key}
                  post={post}
                  user={user} // Передаем пользователя в компонент Post
                />
              )
            );
          })}
      </Content>
    </Layout>
  )
}

export default Home;
