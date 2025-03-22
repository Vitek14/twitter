import React, { useState } from "react";
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

const Post = ({ post, user, profile }) => {
  const [isCommentsModalVisible, setIsCommentsModalVisible] = useState(false);
  const [liked, setLiked] = useState(post.is_liked);

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

  return (
    <>
      <Card
        hoverable
        style={{ width: "100%", borderRadius: "8px" }}
        bordered={true}
      >
        {/* Header Section */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
          <Avatar
            src={user.avatar_url}
            size="large"
            style={{ minWidth: "50px", minHeight: "50px", marginTop: "5px" }}
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
              onClick={toggleCommentsModal}
            >
              {post.comments_count}
            </Button>
            <Button type="text" icon={<RetweetOutlined />} style={{ color: "#1890ff" }}>
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
            <Button type="text" icon={<EqualizerIcon style={{ fontSize: "15px" }} />} style={{ color: "#1890ff" }}>
              {post.views_count}
            </Button>
          </div>
          <div style={{ display: "flex", gap: "8px", marginLeft: "auto" }}>
            <Button type="text" icon={<BookmarkBorderIcon style={{ fontSize: "15px" }} />} style={{ color: "#1890ff" }} />
            <Button type="text" icon={<ShareIcon style={{ fontSize: "15px" }} />} style={{ color: "#1890ff" }} />
          </div>
        </div>
      </Card>

      <CommentModal
        visible={isCommentsModalVisible}
        onCancel={toggleCommentsModal}
        initialComments={post.comments}
        profile={profile}
      />
    </>
  );
};

export default Post;
