// CommentModal.jsx
import React, { useState, useEffect } from "react";
import { Modal, List, Input, Button, Avatar, Typography } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Api from "../../../api.js";


const { Text } = Typography;

const CommentModal = ({ visible, onCancel, initialComments, profile, post }) => {
  // Локальное состояние для комментариев
  const [comments, setComments] = useState(initialComments || []);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState("");

  // Обновляем локальное состояние, если изменились начальные комментарии
  useEffect(() => {
    setComments(initialComments || []);
  }, [initialComments]);

  // Добавление нового комментария
  const handleAddComment = async () => {
    if (newComment.trim()) {
      const response = await Api.Comments.create({
        user_id: profile.id,
        post_id: post.id,
        content: newComment,
      })
      const commentData = {
        id: response.data.id, // В реальном случае id возвращается сервером
        content: newComment,
        user: {
          id: profile.id,
          first_name: profile.first_name,
          avatar_url: profile.avatar_url,
        },
      };
      setComments([...comments, commentData]);
      setNewComment("");
    }
  };

  // Нажатие на кнопку редактирования комментария
  const handleEditClick = (comment) => {
    setEditingCommentId(comment.id);
    setEditingCommentText(comment.content);
  };

  // Сохранение изменений комментария
  const handleSaveEdit = async () => {
    setComments(
      comments.map((comment) =>
        comment.id === editingCommentId
          ? {...comment, content: editingCommentText}
          : comment
      )
    );
    // Здесь можно добавить вызов API для сохранения изменений
    await Api.Comments.update(editingCommentId, {
      content: editingCommentText,
    })
    setEditingCommentId(null);
    setEditingCommentText("");
  };

  // Отмена редактирования
  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditingCommentText("");
  };

  // Удаление комментария
  const handleDelete = async (commentId) => {
    setComments(comments.filter((comment) => comment.id !== commentId));
    // Здесь можно добавить вызов API для удаления комментария
    await Api.Comments.delete(commentId);
  };

  return (
    <Modal
      title="Комментарии"
      open={visible}
      onCancel={onCancel}
      footer={null}
      // Отступ снизу для корректного отображения кнопки "Отправить"
      // Кастомная кнопка закрытия с абсолютным позиционированием
      closeIcon={
        null
      }
    >
      <List
        dataSource={comments}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <List.Item.Meta
              avatar={
                item.user && item.user.avatar_url ? (
                  <Avatar src={item.user.avatar_url} />
                ) : (
                  <Avatar>{item.user ? item.user.first_name[0] : "?"}</Avatar>
                )
              }
              title={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text strong>
                    {item.user ? item.user.first_name : "Неизвестный пользователь"}
                  </Text>
                  {item.user && item.user.id === profile.id && (
                    <div style={{ display: "flex", gap: "8px" }}>
                      <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => handleEditClick(item)}
                      />
                      <Button
                        type="link"
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(item.id)}
                      />
                    </div>
                  )}
                </div>
              }
              description={
                editingCommentId === item.id ? (
                  <div>
                    <Input.TextArea
                      value={editingCommentText}
                      onChange={(e) => setEditingCommentText(e.target.value)}
                      rows={2}
                    />
                    <div
                      style={{
                        marginTop: "4px",
                        display: "flex",
                        gap: "8px",
                      }}
                    >
                      <Button type="primary" onClick={handleSaveEdit}>
                        Сохранить
                      </Button>
                      <Button onClick={handleCancelEdit}>Отмена</Button>
                    </div>
                  </div>
                ) : (
                  item.content
                )
              }
            />
          </List.Item>
        )}
      />
      <div style={{ marginTop: "16px" }}>
        <Input.TextArea
          placeholder="Напишите комментарий..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows={3}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "8px",
          }}
        >
          <Button type="primary" onClick={handleAddComment}>
            Отправить
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CommentModal;
