import {Avatar, Card, Layout, Menu, Typography, Input} from "antd"
import "./notificationpage.scss"
import {XOutlined} from "@ant-design/icons";
import ControlPanel from "../components/common_components/new_control_panel/ControlPanel.jsx";
import {useEffect, useState} from "react";
import Api from "../api.js";
import {useNavigate} from "react-router-dom";
import RecommendationPanel from "../components/common_components/new_recommendation_panel/ReccomendationPanel.jsx";

const {Sider, Content,  Header, Footer} = Layout;
const {Search} = Input;

const NotificationPage = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' }; // Пример: Feb 10, 2025
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  useEffect(() => {
    Api.Notifications.get().then((res) => {
      setNotifications(res.data);
    }).catch(err => {
      localStorage.deleteItem('token');
      navigate("/login");
      console.error(err);
    });
  }, []);

  return (
    <div className="main">
      {/* Левый Sider */}
      <div className="main__control-panel">
        <ControlPanel />
      </div>

      {/* Центральный Content */}
      <div className="main__content-box">
        <Layout>
          <Header className="main__content-box__header">
            <Typography.Title level={4}>
              Notifications
            </Typography.Title>
          </Header>
          <Content className="main__content-box__content">
            <div className="main__content-box__content__container">
              {notifications.map((notification) => (
                 <Card
                   hoverable
                   key={notification.parent_id}
                   onClick={() => handlePostClick(notification.parent_id)}
                   style={{ width: "100%", marginBottom: '10px' }}
                >
                  <Card.Meta
                    avatar={<Avatar src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/X_logo.jpg/1200px-X_logo.jpg" />}
                    title={notification.type}
                    description={
                      <>
                        {notification.type === "Login" ? (
                          <p>
                            There was a login to your account from a new device on {formatDate(notification.createdAt)}. Review it now.
                          </p>
                        ) : (
                          <p>Новый вход от вашего имени в x.com: 2025-12-02</p>
                        )}
                      </>
                    }
                  />
                </Card>
              ))}
            </div>
          </Content>
          <Footer style={{textAlign: 'center'}}>x.com</Footer>
        </Layout>
      </div>

      {/* Правая кастомная панель */}
      <RecommendationPanel/>
    </div>
  )
}

export default NotificationPage;
