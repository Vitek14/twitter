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

const FallbackImage = ({ src, fallbackSrc, isAvatar, ...props }) => {
  const [imageUrl, setImageUrl] = useState(src || fallbackSrc);
  const [error, setError] = useState(false);

  useEffect(() => {
    setImageUrl(src || fallbackSrc);
    setError(false);
  }, [src, fallbackSrc]);

  const handleError = () => {
    setError(true);
    setImageUrl(fallbackSrc);
  };

  if (isAvatar) {
    return <Avatar size={132} src={imageUrl} onError={handleError} {...props} />;
  }

  return (
    <img
      src={imageUrl}
      onError={handleError}
      alt="Banner"
      style={{ width: "100%", height: "auto", ...props.style }}
    />
  );
};

const Profile = ({profile}) => {
  // const [profile, setProfile] = useState([]);
  console.log("Profile is: ", profile)
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

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/api/profile/")
  //     .then(res => {
  //       setProfile(res.data);
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     });
  // }, []);

  const fallbackImageUrl =
    "https://cdn.discordapp.com/attachments/826717369400688643/1337386782395863081/00004-3704161152.png?ex=67a74200&is=67a5f080&hm=bcfac182bb16ea37be44b1c1e8ccfe4d05489589838508b42dbae6db9f644089&";
  const bannerFallbackUrl =
    "https://cdn.discordapp.com/attachments/826717369400688643/1337395303040684093/00009-1025043266.png?ex=67a749ef&is=67a5f86f&hm=9abd080c735ca2688de6c82e2fe652ea77af2799d0dba4c087be7d55a08db90e&"; // Новый fallback URL для баннера

  return (
    <Layout className="profile">
      <Overview profile={profile} />
      <div className="profile__content">
        <Row>
          <Col flex="auto">
            <Banner profile_image={profile.banner_url} />
            <FallbackImage
              src={profile.banner_url}
              fallbackSrc={bannerFallbackUrl} // Используется отдельный URL для fallback баннера
              style={{ width: "100%", height: "350px", objectFit: "cover" }}
              />
          </Col>
          <Col>
            {/*<Avatar*/}
            {/*  className="profile__avatar"*/}
            {/*  size={132}*/}
            {/*  src={profile.avatar_url}*/}
            {/*  // src="src/assets/Avatar.png"*/}
            {/*/>*/}
            <FallbackImage
              isAvatar
              src={profile.avatar_url}
              fallbackSrc={fallbackImageUrl}
              className="profile__avatar"
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
