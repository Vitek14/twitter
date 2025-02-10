import React, { useState } from "react";
import { Button } from "antd";
import NewPostModal from "./NewPostModal"; // Импортируем модальное окно

const NewPostButton = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true); // Открываем модальное окно
  };

  const handleClose = () => {
    setIsModalVisible(false); // Закрываем модальное окно
  };

  return (
    <>
      <Button
        type="primary"
        shape="round"
        style={{
          width: "270px",
          height: "60px",
          fontWeight: "bold",
          fontSize: 16,
          marginBottom: "200px",
        }}
        onClick={showModal}
      >
        Post
      </Button>
      <NewPostModal open={isModalVisible} onClose={handleClose} />
    </>
  );
};

export default NewPostButton;
