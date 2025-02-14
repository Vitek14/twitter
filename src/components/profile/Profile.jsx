import { Avatar, Col, Layout, Row } from "antd";
import Overview from "./components/Overview.jsx";
import Banner from "./components/Banner.jsx";
import Bio from "./components/Bio.jsx";
import ContentTabs from "./components/ContentTabs.jsx";
import Post from "./components/Post.jsx";
import "./profile.scss";
import {useState, useEffect} from "react"
import {ProfilePostsContext} from "./ProfileContext.jsx"
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

const Profile = ({profile, profilePosts, users}) => {
  // const [profile, setProfile] = useState([]);
  console.log("Profile is: ", profile)


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
    "../../../public/404_avatar.png";
  const bannerFallbackUrl =
    "../../../public/404_banner.png"; // Новый fallback URL для баннера

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
    </Layout>
  );
};
export default Profile;
