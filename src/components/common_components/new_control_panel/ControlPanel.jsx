import {Avatar, Button, Dropdown, Flex, Image, Layout, Typography} from "antd";
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
import {useNavigate} from "react-router-dom";
import Api from "../../../api.js";

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

const ControlPanel = ({profile=[]}) => {

  // Experimental!
  const [profileInfo, setProfile] = useState(profile);
  if (profile.length === 0) {
    Api.Profile.get().then((res) => {
      setProfile(res.data);
    });
  }


  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const showModal = () => {
    setIsModalVisible(true); // Открываем модальное окно
  };

  const handleClose = () => {
    setIsModalVisible(false); // Закрываем модальное окно
  };

  // console.log("PROFILE: ", profile);

  const handleMenuClick = (e) => {
    if (e.key === 'settings') {
      navigate('/settings');
    } else if (e.key === 'logout') {
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  const menuItems = [
    {
      key: 'settings',
      label: 'Settings',
    },
    {
      key: 'logout',
      label: 'Logout',
      danger: true,
    },
  ];

  // console.log("PROFILE: ", profile)

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
                width: "270px",
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
        <div className="control-panel__box__footer"
             style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Flex align="center" gap={8}>
            <div className="control-panel__box__footer__avatar">
              <FallbackImage
                src={profileInfo.avatar_url}
                fallbackSrc={fallbackImageUrl}
                isAvatar={true}
              />
            </div>
            <div className="control-panel__box__footer__info">
              <Typography.Title level={5} style={{margin: 0}}>
                {profileInfo.first_name + " " + profileInfo.last_name}
              </Typography.Title>
              <Typography.Text type="secondary">
                @{profileInfo.user_name}
              </Typography.Text>
            </div>
          </Flex>
          <Dropdown
            menu={{
              items: menuItems,
              onClick: handleMenuClick
            }}
            trigger={['click']}
          >
            <Button
              type="text"
              shape="circle"
              icon={<MoreOutlined style={{fontSize: 20}}/>}
              style={{marginRight: 8}}
            />
          </Dropdown>
        </div>
      </div>
    </div>
  )
}

export default ControlPanel;
