import {Avatar, Button, Flex, Image, Layout, Typography} from "antd";
import "./controlpanel.scss"
import {
  BellOutlined,
  BookOutlined, CheckCircleOutlined, CommentOutlined,
  FileTextOutlined,
  HomeOutlined,
  MailOutlined, MoreOutlined,
  SearchOutlined, UserOutlined,
  XOutlined
} from "@ant-design/icons";
import React, {useState} from "react";
import NewPostModal from "../control_panel/components/NewPostModal.jsx"


const ControlPanel = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true); // Открываем модальное окно
  };

  const handleClose = () => {
    setIsModalVisible(false); // Закрываем модальное окно
  };

  return (
    <div className="control-panel">
      <div className="control-panel__box">
        <div className="control-panel__box__content-box">
          <div className="control-panel__box__header">
            <div className="control-panel__box__header__logo">
              <Button type="dashed" shape="circle" icon={<XOutlined/>}/>
            </div>
          </div>
          <Flex justify="flex-end" className="control-panel__box__content" vertical gap={21}>
            <Button block type="text" shape="round" icon={<HomeOutlined/>}>
              Home
            </Button>
            <Button block type="text" shape="round" icon={<SearchOutlined/>}>
              Explore
            </Button>
            <Button block type="text" shape="round" icon={<BellOutlined/>}>
              Notifications
            </Button>
            <Button block type="text" shape="round" icon={<MailOutlined/>}>
              Messages
            </Button>
            <Button block type="text" shape="round" icon={<FileTextOutlined/>}>
              Lists
            </Button>
            <Button block type="text" shape="round" icon={<BookOutlined/>}>
              Bookmarks
            </Button>
            <Button block type="text" shape="round" icon={<CommentOutlined/>}>
              Communities
            </Button>
            <Button block type="text" shape="round" icon={<CheckCircleOutlined/>}>
              Verified Orgs
            </Button>
            <Button block type="text" shape="round" icon={<UserOutlined/>}>
              Profile
            </Button>
            <Button block type="text" shape="round" icon={<MoreOutlined/>}>
              More
            </Button>
            <Button block
              type="primary"
              shape="round"
              style={{
                // width: "270px",
                height: "60px",
                fontWeight: "bold",
                fontSize: 16,
                // marginBottom: "200px",
              }}
              onClick={showModal}
            >
              Post
            </Button>
            <NewPostModal open={isModalVisible} onClose={handleClose} />
          </Flex>
        </div>
        <div className="control-panel__box__footer">
          <div className="control-panel__box__footer__avatar">
            <Avatar size={50} src="../../../public/404_avatar.png"/>
          </div>
          <div className="control-panel__box__footer__info">
            <div className="control-panel__box__footer__info__fullname">
              <Typography.Title level={5}>
                Test
              </Typography.Title>
            </div>
            <div className="control-panel__box__footer__info__username">
              <Typography.Paragraph level={5}>
                Another Test
              </Typography.Paragraph>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ControlPanel;
