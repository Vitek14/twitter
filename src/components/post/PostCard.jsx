import React from 'react';
import { Card, Avatar, Image, Typography } from 'antd';
import { RetweetOutlined, CheckCircleTwoTone } from '@ant-design/icons';

const { Text } = Typography;

const PostCard = ({ postData, userData, isRepost, children }) => {
  return (
    <Card hoverable style={{ width: "100%", borderRadius: "8px" }} bordered>
      {isRepost && (
        <div style={{ marginBottom: "8px", marginLeft: "40px", textAlign: "left" }}>
          <RetweetOutlined style={{ color: "#5e5e5e", marginRight: "8px" }} />
          <Text type="secondary">You reposted</Text>
        </div>
      )}
      <div style={{ display: "flex", alignItems: "flex-start", marginBottom: "8px" }}>
        <Avatar src={userData.avatar_url} size="large" style={{ minWidth: "50px", minHeight: "50px" }} />
        <div style={{ marginLeft: "12px", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Text strong style={{ fontSize: "16px" }}>
              {`${userData.first_name} ${userData.last_name}`}
            </Text>
            <Text type="secondary" style={{ marginLeft: "8px" }}>
              @{userData.user_name}
            </Text>
            {userData.verified && <CheckCircleTwoTone style={{ marginLeft: "8px" }} />}
          </div>
          {postData.content && (
            <div style={{ marginTop: "4px", textAlign: "left" }}>
              <Text>{postData.content}</Text>
            </div>
          )}
        </div>
      </div>
      {postData.image_url && (
        <Image
          src={postData.image_url}
          alt="Post image"
          style={{ width: "100%", maxHeight: "400px", objectFit: "cover", borderRadius: "8px" }}
        />
      )}
      {/* Дочерние элементы могут содержать панель действий или дополнительное содержимое */}
      {children}
    </Card>
  );
};

export default PostCard;
