import {Button, ConfigProvider, Space} from "antd";
import {
  BellFilled,
  BellOutlined,
  BookFilled,
  BookOutlined,
  CheckCircleFilled,
  CheckCircleOutlined,
  CommentOutlined,
  FileTextFilled,
  FileTextOutlined,
  HomeFilled,
  HomeOutlined,
  MailFilled,
  MailOutlined, MoreOutlined,
  SearchOutlined, UserOutlined
} from "@ant-design/icons";
import {useState} from "react";
import "./navbar.scss"
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isActive, setIsActive] = useState(null);
  const navigate = useNavigate();

  const handleButtonClick = (buttonIndex) => {
    switch (buttonIndex) {
      case 1:
        navigate("/home");
        break;
      case 4:
        navigate("/message");
        break;
      case 9:
        navigate("/profile");
        break;
    }
    setIsActive(buttonIndex);
  };

  return (
    <Space direction="vertical" size={[0, 20]} style={{marginBottom: 20, marginLeft: -13}}>
      <Button color="default" variant="link" icon={isActive === 1 ? <HomeFilled/> : <HomeOutlined/>}
              className={`side-buttons ${isActive === 1 ? 'active' : ''}`}
              onClick={() => handleButtonClick(1)}>
        Home
      </Button>
      <Button color="default" variant="link" icon={isActive === 2 ? <SearchOutlined/> : <SearchOutlined/>}
              className={`side-buttons ${isActive === 2 ? 'active' : ''}`}
              onClick={() => handleButtonClick(2)}>
        Explore
      </Button>
      <Button color="default" variant="link" icon={isActive === 3 ? <BellFilled/> : <BellOutlined/>}
              className={`side-buttons ${isActive === 3 ? 'active' : ''}`}
              onClick={() => handleButtonClick(3)}>
        Notifications
      </Button>
      <Button color="default" variant="link" icon={isActive === 4 ? <MailFilled/> : <MailOutlined/>}
              className={`side-buttons ${isActive === 4 ? 'active' : ''}`}
              onClick={() => handleButtonClick(4)}>
        Messages
      </Button>
      <Button color="default" variant="link"
              icon={isActive === 5 ? <FileTextFilled/> : <FileTextOutlined/>}
              className={`side-buttons ${isActive === 5 ? 'active' : ''}`}
              onClick={() => handleButtonClick(5)}>
        Lists
      </Button>
      <Button color="default" variant="link" icon={isActive === 6 ? <BookFilled/> : <BookOutlined/>}
              className={`side-buttons ${isActive === 6 ? 'active' : ''}`}
              onClick={() => handleButtonClick(6)}>
        Bookmarks
      </Button>
      <Button color="default" variant="link" icon={isActive === 7 ? <CommentOutlined/> : <CommentOutlined/>}
              className={`side-buttons ${isActive === 7 ? 'active' : ''}`}
              onClick={() => handleButtonClick(7)}>
        Communities
      </Button>
      <Button color="default" variant="link" icon={isActive === 8 ? <CheckCircleFilled/> : <CheckCircleOutlined />}
              className={`side-buttons ${isActive === 8 ? 'active' : ''}`}
              onClick={() => handleButtonClick(8)}>
        Verified Orgs
      </Button>
      <Button color="default" variant="link" icon={isActive === 9 ? <UserOutlined/> : <UserOutlined/>}
              className={`side-buttons ${isActive === 9 ? 'active' : ''}`}
              onClick={() => handleButtonClick(9)}>
        Profile
      </Button>
      <Button color="default" variant="link" icon={isActive === 10 ? <MoreOutlined/> : <MoreOutlined/>}
              className={`side-buttons ${isActive === 10 ? 'active' : ''}`}
              onClick={() => handleButtonClick(10)}>
        More
      </Button>
    </Space>
  )
}

export default Navbar;
