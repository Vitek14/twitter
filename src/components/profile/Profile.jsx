import { Avatar, Col, Layout, Row } from "antd";
import Overview from "./components/Overview.jsx";
import Banner from "./components/Banner.jsx";
import Bio from "./components/Bio.jsx";
import ContentTabs from "./components/ContentTabs.jsx";
import Post from "./components/Post.jsx";
import "./profile.scss";
import { useEffect, useState } from "react";
import axios from "axios";

const { Content, Footer } = Layout;

const Profile = () => {
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
    <Layout className="profile">
      <Overview />
      <div className="profile__content">
        <Row>
          <Col flex="auto">
            <Banner profile_image={profile.banner_url} />
          </Col>
          <Col>
            <Avatar
              className="profile__avatar"
              size={132}
              src={profile.avatar_url}
              // src="src/assets/Avatar.png"
            />
          </Col>
        </Row>
        <Bio profile={profile} />
        <Content>
          <ContentTabs />
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
      </div>
      <Footer>
        <Row>
          <Col>Дальше ничего нет</Col>
        </Row>
      </Footer>
    </Layout>
  );
};

export default Profile;
