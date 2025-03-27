import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Card, Image, Typography } from "antd";
import {
  CheckCircleTwoTone,
  RetweetOutlined,
} from "@ant-design/icons";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ShareIcon from "@mui/icons-material/Share";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Api from "../../../api.js";
import CommentModal from "./CommentModal";

const { Text } = Typography;

// Ключ для localStorage
const VIEWED_POSTS_KEY = "viewedPosts";

// Вспомогательные функции для работы с localStorage
// const getViewedPosts = () => {
//   const stored = localStorage.getItem(VIEWED_POSTS_KEY);
//   return stored ? JSON.parse(stored) : [];
// };

// const addViewedPost = (postId) => {
//   const viewed = getViewedPosts();
//   if (!viewed.includes(postId)) {
//     viewed.push(postId);
//     localStorage.setItem(VIEWED_POSTS_KEY, JSON.stringify(viewed));
//   }
// };

const Post = ({ post, user, profile }) => {
  const [isCommentsModalVisible, setIsCommentsModalVisible] = useState(false);
  const [liked, setLiked] = useState(post.is_liked);
  // Проверяем localStorage при инициализации компонента
  const [isViewed, setIsViewed] = useState(post.is_viewed);
  // const isViewed = post.is_viewed;
  const navigate = useNavigate();
  const postRef = useRef(null);

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

  // Функция для отправки запроса о просмотре поста
  const handlePostView = async () => {
    // Если пост уже просмотрен (либо по состоянию, либо по localStorage), выходим
    if (isViewed) return;
    try {
      // Отправляем запрос на бэкенд
      await Api.Posts.view({ user_id: profile.id, post_id: post.id });
      // Отмечаем, что пост просмотрен
      setIsViewed(true);
      // Increasing post view count(not working?)
      post.views_count += 1;
      console.log(`Пользователь ${profile.id} просмотрел пост ${post.id}`);
    } catch (error) {
      console.error("Error recording post view:", error);
    }
  };

  // Инициализация IntersectionObserver только если пост ещё не был просмотрен
  useEffect(() => {
    if (isViewed) return; // если уже просмотрен, не вешаем observer

    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          // Если пост виден (50% видимости) и ещё не был просмотрен, отправляем запрос
          if (entry.isIntersecting) {
            handlePostView();
            observerInstance.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    if (postRef.current) {
      observer.observe(postRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isViewed, post.id]);

  return (
    <>
      {/* Оборачиваем Card в контейнер с ref для отслеживания */}
      <div ref={postRef}>
        <Card
          hoverable
          style={{ width: "100%", borderRadius: "8px" }}
          bordered={true}
        >
          {/* Header Section */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <Avatar
              src={user.avatar_url}
              size="large"
              style={{
                minWidth: "50px",
                minHeight: "50px",
                marginTop: "5px",
              }}
            />
            <div style={{ marginLeft: "12px" }}>
              <Text strong style={{ fontSize: "16px", display: "block" }}>
                {`${user.first_name} ${user.last_name}`}{" "}
                {user.verified && <CheckCircleTwoTone />}{" "}
                <Text type="secondary">@{user.user_name}</Text>
              </Text>
              {post.content && (
                <div style={{ marginBottom: "12px" }}>
                  <Text>{post.content}</Text>
                </div>
              )}
            </div>
          </div>

          {/* Post Image */}
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

          {/* Action Buttons */}
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
                onClick={() => {
                  navigate(`/post/${post.id}`);
                }}
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
                    <FavoriteIcon
                      style={{ fontSize: "15px", color: "red" }}
                    />
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
};

export default Post;
