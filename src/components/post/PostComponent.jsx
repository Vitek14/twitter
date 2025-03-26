import React, { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { Avatar, Card, Typography, Image, Button, List, Space } from 'antd';
import { LikeOutlined, RetweetOutlined } from '@ant-design/icons';
import ControlPanel from '../common_components/new_control_panel/ControlPanel';
import RecommendationPanel from '../common_components/new_recommendation_panel/RecommendationPanel';

import Api from "../../api.js";

const { Text, Title } = Typography;

const PostComponent = () => {
 const [profile, setProfile] = useState([]);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { postId } = useParams();
  useEffect(() => {
    Api.Profile.get().then((res) => {
      console.log("PROFILE NOW: ", res.data);
      setProfile(res.data);
    }).catch(err => {
      console.log(err);
      localStorage.removeItem('token');
      navigate("/login");
      console.error(err);
    });
  }, []);

  
  useEffect(() => {
    Api.Posts.get_post(postId).then((res) => {
      setPost(res.data);
      console.log("post: ", res.data)
      setLoading(false);
    }).catch(err => {
      localStorage.deleteItem('token');
      navigate("/login");
      console.error(err);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main">
      <div className="main__control-panel">
        <ControlPanel
          profileInfo={profile}
        />
      </div>

        <div style={{ maxWidth: 800, margin: '0 auto' }}>
        {/* Post Header */}
        {/*<div style={{ marginBottom: 24 }}>*/}
        {/*    <Title level={4} style={{ marginBottom: 0 }}>*/}
        {/*      {profile.first_name} {profile.last_name}*/}
        {/*    </Title>*/}
        {/*    <Text type="secondary">@{profile.user_name}</Text>*/}
        {/*</div>*/}

        {/* Post Content */}
        <Card>
            <Space align="start" size={16} style={{ width: '100%' }}>
            {/* User Avatar */}
            <Avatar size={48} src={post.user.avatar_url} />

            {/* Post Body */}
            <div style={{ flex: 1 }}>
                {/* User Info */}
                <Text strong>
                {post.user.first_name} {post.user.last_name}
                </Text>

                {/* Post Content */}
                <div style={{ margin: '12px 0' }}>
                <Text>{post.content}</Text>
                </div>

                {/* Post Image */}
                {post.image_url && (
                <Image
                    width="100%"
                    src={post.image_url}
                    alt="Post content"
                    style={{ borderRadius: 8, marginBottom: 16 }}
                />
                )}

                {/* Action Buttons */}
                <Space size="large">
                <Button icon={<LikeOutlined />}>
                    {post.likes_count} Likes
                </Button>
                <Button icon={<RetweetOutlined />}>
                    {post.reposts_count} Reposts
                </Button>
                </Space>

                {/* Comments Section */}
                <List
                itemLayout="horizontal"
                dataSource={post.comments}
                renderItem={comment => (
                    <List.Item style={{ paddingLeft: 0 }}>
                    <List.Item.Meta
                        avatar={<Avatar src={comment.user.avatar_url} />}
                        title={<Text strong>{comment.user.first_name}</Text>}
                        description={comment.content}
                    />
                    </List.Item>
                )}
                style={{ marginTop: 24 }}
                />
            </div>
            </Space>
        </Card>
        </div>

        <RecommendationPanel/>
    </div>
  );
};

// PropTypes example (you might want to add proper prop-types)
// PostComponent.propTypes = {
//   profile: PropTypes.shape({
//     first_name: PropTypes.string,
//     last_name: PropTypes.string,
//     username: PropTypes.string,
//   }),
//   post: PropTypes.shape({
//     user: PropTypes.object,
//     content: PropTypes.string,
//     image_url: PropTypes.string,
//     likes_count: PropTypes.number,
//     reposts_count: PropTypes.number,
//     comments: PropTypes.arrayOf(
//       PropTypes.shape({
//         user: PropTypes.object,
//         content: PropTypes.string,
//       })
//     ),
//   }),
// };

export default PostComponent;
