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
import React, {useEffect, useState} from "react";
import NewPostModal from "../control_panel/components/NewPostModal.jsx"

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
    return <Avatar size={40} src={imageUrl} onError={handleError} {...props} />;
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

const fallbackImageUrl =
    "../../../public/404_avatar.png";

const ControlPanel = ({profile}) => {
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
            {/*<Avatar size={50} src="../../../public/404_avatar.png"/>*/}
            <FallbackImage
              src={profile.avatar_url}
              fallbackSrc={fallbackImageUrl} // Используется отдельный URL для fallback баннера
              isAvatar={true}
              // style={{ width: "100%",objectFit: "cover" }}
            />
          </div>
          <div className="control-panel__box__footer__info">
            <div className="control-panel__box__footer__info__fullname">
              <Typography.Title level={5}>
                {profile.first_name + " " + profile.last_name}
              </Typography.Title>
            </div>
            <div className="control-panel__box__footer__info__username">
              <Typography.Paragraph level={5}>
                @{profile.user_name}
              </Typography.Paragraph>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ControlPanel;
