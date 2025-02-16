import React, { useState } from "react";
import { Avatar, Button, Card, Image, Modal, List, Input, Typography } from "antd";
import {
  CheckCircleTwoTone,
  RetweetOutlined,
  LikeOutlined,
  MessageOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ShareIcon from "@mui/icons-material/Share";

const { Text } = Typography;

const Post = ({ post, user }) => {
  const [isCommentsModalVisible, setIsCommentsModalVisible] = useState(false);
  const [comments, setComments] = useState([
    // Пример начальных комментариев
    { id: 1, author: "John Doe", text: "Отличный пост!" },
    { id: 2, author: "Jane Smith", text: "Я полностью с этим согласен!" },
  ]);
  const [newComment, setNewComment] = useState("");

  const isImage = (url) => {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  };

  const toggleCommentsModal = () => {
    setIsCommentsModalVisible(!isCommentsModalVisible);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        { id: comments.length + 1, author: "Вы", text: newComment },
      ]);
      setNewComment(""); // Очистка поля
    }
  };

  return (
    <>
      <Card
        hoverable
        style={{
          width: "100%",
          borderRadius: "8px",
        }}
        bordered={true}
      >
        {/* Header Section */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
          <Avatar
            src={user.avatar_url}
            size="large"
            style={{ minWidth: "50px", minHeight: "50px", alignSelf: "start", marginTop: "5px" }}
          />
          {/* User Details */}
          <div style={{ marginLeft: "12px" }}>
            <Text strong style={{ fontSize: "16px", display: "block" }}>
              {`${user.first_name} ${user.last_name}`} {user.verified && <CheckCircleTwoTone />}{" "}
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
              onClick={toggleCommentsModal} // Открытие комментариев
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
              icon={<FavoriteBorderIcon style={{ fontSize: "15px" }} />}
              style={{ color: "#1890ff" }}
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

      {/* Модальное окно с комментариями */}
      <Modal
        title="Комментарии"
        visible={isCommentsModalVisible}
        onCancel={toggleCommentsModal}
        footer={null}
      >
        <List
          dataSource={comments}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar>{item.author[0]}</Avatar>}
                title={<Text strong>{item.author}</Text>}
                description={item.text}
              />
            </List.Item>
          )}
        />
        <Input.TextArea
          placeholder="Напишите комментарий..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows={3}
        />
        <Button
          type="primary"
          style={{ marginTop: "8px", float: "right" }}
          onClick={handleAddComment}
        >
          Отправить
        </Button>
      </Modal>
    </>
  );
};

export default Post;
