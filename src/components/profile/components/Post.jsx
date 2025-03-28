import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Card, Image, Typography } from "antd";
import { CheckCircleTwoTone, RetweetOutlined } from "@ant-design/icons";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ShareIcon from "@mui/icons-material/Share";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Api from "../../../api.js";
import CommentModal from "./CommentModal";

const { Text } = Typography;

const Post = ({ post, user, profile }) => {
  const [repostPost, setRepostPost] = useState(null);
  const [isCommentsModalVisible, setIsCommentsModalVisible] = useState(false);
  const [liked, setLiked] = useState(post.is_liked);
  const [isViewed, setIsViewed] = useState(post.is_viewed);
  const [isReposted, setIsReposted] = useState(post.is_reposted)
  const navigate = useNavigate();
  const postRef = useRef(null);

  // Если это репост (есть parent_id), получаем оригинальный пост
  useEffect(() => {
    if (post.parent_post_id) {
      Api.Posts.get_post(post.parent_post_id)
        .then((res) => {
          setRepostPost(res.data);
        })
        .catch((error) =>
          console.error("Error fetching parent post:", error)
        );
    }
  }, [post.parent_post_id]);

  // Отрисовка базовой карточки поста (заголовок, изображение, действия)
  const renderPostCard = (postData, userData, showActions = true, isRepost=false) => (
    <Card
      hoverable
      style={{ width: "100%", borderRadius: "8px" }}
      bordered={true}
    >
      {/* Header Section: аватарка слева, а справа имя и контент */}
      {isRepost && (
          <div style={{marginBottom: "8px", marginLeft: "40px", textAlign: "left"}}>
            <RetweetOutlined style={{color: "#5e5e5e", marginRight: "8px"}} />
            <Text type="secondary">You reposted</Text>
          </div>
        )}
      <div style={{ display: "flex", alignItems: "flex-start", marginBottom: "8px" }}>
        <Avatar
          src={userData.avatar_url}
          size="large"
          style={{minWidth: "50px", minHeight: "50px" }}
        />
        <div
          style={{
            marginLeft: "12px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Text strong style={{ fontSize: "16px" }}>
              {`${userData.first_name} ${userData.last_name}`}
            </Text>
            <Text type="secondary" style={{ marginLeft: "8px" }}>
              @{userData.user_name}
            </Text>
            {userData.verified && <CheckCircleTwoTone style={{ marginLeft: "8px" }} />}
          </div>
          {postData.content && (
            <div style={{ marginTop: "4px", textAlign: "left" }}>
              <Text>{postData.content}</Text>
            </div>
          )}
        </div>
      </div>

      {/* Изображение поста */}
      {postData.image_url && (
        <Image
          src={postData.image_url}
          alt="Post image"
          style={{
            width: "100%",
            maxHeight: "400px",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
      )}

      {/* Панель действий */}
      {showActions && (
        <div
          style={{
            marginTop: "16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", gap: "8px" }}>
            <Button
              type="text"
              icon={<ChatBubbleOutlineIcon style={{ fontSize: "15px" }} />}
              style={{ color: "#1890ff" }}
              onClick={() => navigate(`/post/${post.id}`)}
            >
              {postData.comments_count}
            </Button>
            <Button
              type="text"
              // icon={<RetweetOutlined />}
              icon={isReposted ? (
                <RetweetOutlined style={{ color: "#00d907" }} />
              ) : (
                <RetweetOutlined />
              )}
              style={{ color: "#1890ff" }}
            >
              {postData.reposts_count}
            </Button>
            <Button
              type="text"
              icon={
                liked ? (
                  <FavoriteIcon style={{ fontSize: "15px", color: "red" }} />
                ) : (
                  <FavoriteBorderIcon style={{ fontSize: "15px" }} />
                )
              }
              style={{ color: "#1890ff" }}
              onClick={liked ? handleUnlike : handleLike}
            >
              {postData.likes_count}
            </Button>
            <Button
              type="text"
              icon={<EqualizerIcon style={{ fontSize: "15px" }} />}
              style={{ color: "#1890ff" }}
            >
              {postData.views_count}
            </Button>
          </div>
          <div style={{ display: "flex", gap: "8px", marginLeft: "auto" }}>
            <Button
              type="text"
              icon={<BookmarkBorderIcon style={{ fontSize: "15px" }} />}
              style={{ color: "#1890ff" }}
            />
            <Button
              type="text"
              icon={<ShareIcon style={{ fontSize: "15px" }} />}
              style={{ color: "#1890ff" }}
            />
          </div>
        </div>
      )}
    </Card>
  );

  const toggleCommentsModal = () => {
    setIsCommentsModalVisible(!isCommentsModalVisible);
  };

  const handleLike = async () => {
    try {
      await Api.Posts.like({
        user_id: profile.id,
        post_id: post.id,
      });
      setLiked(true);
      post.likes_count += 1;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setLiked(true);
        post.likes_count += 1;
      }
      console.error("Error liking post:", error);
    }
  };

  const handleUnlike = async () => {
    try {
      await Api.Posts.unlike(post.id, user.id);
      setLiked(false);
      post.likes_count -= 1;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setLiked(false);
        post.likes_count -= 1;
      }
      console.error("Error unliking post:", error);
    }
  };

  // Функция для регистрации просмотра поста через IntersectionObserver
  const handlePostView = async () => {
    if (isViewed) return;
    try {
      await Api.Posts.view({ user_id: profile.id, post_id: post.id });
      setIsViewed(true);
      post.views_count += 1;
      console.log(`Пользователь ${profile.id} просмотрел пост ${post.id}`);
    } catch (error) {
      console.error("Error recording post view:", error);
    }
  };

  useEffect(() => {
    if (isViewed) return;
    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            handlePostView();
            observerInstance.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    if (postRef.current) observer.observe(postRef.current);
    return () => observer.disconnect();
  }, [isViewed, post.id]);

  // Сценарий репоста с собственным текстом: карточка репостера с вложенной карточкой оригинального поста
  if (post.parent_post_id && repostPost && post.content) {
    return (
      <>
        <div ref={postRef}>
          <Card
            hoverable
            style={{ width: "100%", borderRadius: "8px" }}
            bordered={true}
          >
            {/* Header для репоста: аватарка слева, справа имя и контент */}
            <div style={{ display: "flex", alignItems: "flex-start", marginBottom: "8px" }}>
              <Avatar
                src={user.avatar_url}
                size="large"
                style={{ minWidth: "50px", minHeight: "50px" }}
              />
              <div
                style={{
                  marginLeft: "12px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Text strong style={{ fontSize: "16px" }}>
                    {`${user.first_name} ${user.last_name}`}
                  </Text>
                  <Text type="secondary" style={{ marginLeft: "8px" }}>
                    @{user.user_name}
                  </Text>
                  {user.verified && <CheckCircleTwoTone style={{ marginLeft: "8px" }} />}
                </div>
                {post.content && (
                  <div style={{ marginTop: "4px", textAlign: "left" }}>
                    <Text>{post.content}</Text>
                  </div>
                )}
              </div>
            </div>
            {/* Вложенный репост выравнивается по горизонтали с content */}
            <div style={{ marginLeft: "62px" }}>
              {renderPostCard(repostPost, repostPost.user, false)}
            </div>
            {post.image_url && (
              <Image
                src={post.image_url}
                alt="Post image"
                style={{
                  width: "100%",
                  maxHeight: "400px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            )}
            {/* Панель действий */}
            <div
              style={{
                marginTop: "16px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", gap: "8px" }}>
                <Button
                  type="text"
                  icon={<ChatBubbleOutlineIcon style={{ fontSize: "15px" }} />}
                  style={{ color: "#1890ff" }}
                  onClick={() => navigate(`/post/${post.id}`)}
                >
                  {post.comments_count}
                </Button>
                <Button
                  type="text"
                  icon={<RetweetOutlined />}
                  style={{ color: "#1890ff" }}
                >
                  {post.reposts_count}
                </Button>
                <Button
                  type="text"
                  icon={
                    liked ? (
                      <FavoriteIcon style={{ fontSize: "15px", color: "red" }} />
                    ) : (
                      <FavoriteBorderIcon style={{ fontSize: "15px" }} />
                    )
                  }
                  style={{ color: "#1890ff" }}
                  onClick={liked ? handleUnlike : handleLike}
                >
                  {post.likes_count}
                </Button>
                <Button
                  type="text"
                  icon={<EqualizerIcon style={{ fontSize: "15px" }} />}
                  style={{ color: "#1890ff" }}
                >
                  {post.views_count}
                </Button>
              </div>
              <div style={{ display: "flex", gap: "8px", marginLeft: "auto" }}>
                <Button
                  type="text"
                  icon={<BookmarkBorderIcon style={{ fontSize: "15px" }} />}
                  style={{ color: "#1890ff" }}
                />
                <Button
                  type="text"
                  icon={<ShareIcon style={{ fontSize: "15px" }} />}
                  style={{ color: "#1890ff" }}
                />
              </div>
            </div>
          </Card>
        </div>
        <CommentModal
          visible={isCommentsModalVisible}
          onCancel={toggleCommentsModal}
          initialComments={post.comments}
          profile={profile}
          post={post}
        />
      </>
    );
  }

  // Сценарий чистого репоста (без собственного текста)
  if (post.parent_post_id && repostPost) {
    return (
      <>
        <div ref={postRef}>
          {/*<div style={{ marginBottom: "8px", textAlign: "left" }}>*/}
          {/*  <Text type="secondary">You reposted</Text>*/}
          {/*</div>*/}
          {renderPostCard(repostPost, repostPost.user, true, true)}
        </div>
      </>
    );
  }

  // Если это обычный пост (без репоста)
  return (
    <>
      <div ref={postRef}>{renderPostCard(post, user)}</div>
      <CommentModal
        visible={isCommentsModalVisible}
        onCancel={toggleCommentsModal}
        initialComments={post.comments}
        profile={profile}
        post={post}
      />
    </>
  );
};

export default Post;
