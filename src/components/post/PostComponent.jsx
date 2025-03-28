import React, { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { Avatar, Card, Typography, Image, Button, List, Space, Input, Form, Dropdown, Menu, Modal } from 'antd';
import {ArrowLeftOutlined, CheckCircleTwoTone, LikeOutlined, RetweetOutlined} from '@ant-design/icons';
import ControlPanel from '../common_components/new_control_panel/ControlPanel';
import RecommendationPanel from '../common_components/new_recommendation_panel/RecommendationPanel';
import Api from "../../api.js";

const { Text, Title } = Typography;

const PostComponent = () => {
  const [profile, setProfile] = useState([]);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newCommentContent, setNewCommentContent] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState('');
  const navigate = useParams();
  const navigation = useNavigate();

  // For repost
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [quoteContent, setQuoteContent] = useState('');

  const { postId } = useParams();

  useEffect(() => {
    Api.Profile.get().then((res) => {
      setProfile(res.data);
    }).catch(err => {
      localStorage.removeItem('token');
      navigate("/login");
    });
  }, []);

  useEffect(() => {
    Api.Posts.get_post(postId).then((res) => {
      setPost(res.data);
      setLoading(false);
    }).catch(err => {
      localStorage.removeItem('token');
      navigate("/login");
    });
  }, []);

  const handleRepost = () => {
    Api.Posts.create_post({
      user_id: profile.id,
      parent_post_id: post.id,
      content: null,
    })
    .then((res) => {
      Api.Posts.repost({user_id: profile.id, post_id: res.data.id})
      return Api.Posts.get_post(postId);
    })
    .then((res) => {
      setPost(res.data);
    })
    .catch(console.error);
  };

  const handleQuoteSubmit = () => {
    Api.Posts.create_post({
      user_id: profile.id,
      parent_post_id: post.id,
      content: quoteContent,
    })
    .then((res) => {
      setShowQuoteModal(false);
      setQuoteContent('');
      Api.Posts.repost({user_id: profile.id, post_id: res.data.id})
      return Api.Posts.get_post(postId);
    })
    .then((res) => {
      setPost(res.data);
    })
    .catch(console.error);
  };

  const handleCommentSubmit = () => {
    if (newCommentContent.trim()) {
      Api.Comments.create({
        user_id: profile.id,
        post_id: postId,
        content: newCommentContent
      })
        .then((res) => {
          const commentData = {
            id: res.data.id, // В реальном случае id возвращается сервером
            content: newCommentContent,
            user: {
              id: profile.id,
              first_name: profile.first_name,
              avatar_url: profile.avatar_url,
            },
          };
          setPost(prevPost => ({
            ...prevPost,
            comments: [...prevPost.comments, commentData]
          }));
          setNewCommentContent('');
        })
        .catch(console.error);
    }
  };

  const handleDeleteComment = (commentId) => {
    Api.Comments.delete(commentId)
      .then(() => {
        setPost(prevPost => ({
          ...prevPost,
          comments: prevPost.comments.filter(c => c.id !== commentId)
        }));
      })
      .catch(console.error);
  };

  const handleEditComment = (commentId) => {
    Api.Comments.update(commentId, { content: editedContent })
      .then((res) => {

        const commentData = {
          id: res.data.id,
          content: res.data.content,
          user: profile
        }
        setPost(prevPost => ({
          ...prevPost,
          comments: prevPost.comments.map(c =>
            c.id === commentId ? commentData : c
          )
        }));
        setEditingCommentId(null);
        setEditedContent('');
      })
      .catch(console.error);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="main">
      <div className="main__control-panel">
        <ControlPanel profileInfo={profile} />
      </div>

      <div style={{maxWidth: 800, margin: '0 auto'}}>
        <div className="main__header">
          <div className="main__content-box">
            <Space className="overview__space-wrapper" direction="horizontal" align="center">
              <Button
                color="default"
                variant="link"
                icon={<ArrowLeftOutlined/>}
                size="large"
                onClick={() => {navigation(-1)}}
              />
              <Title level={3} style={{marginLeft: "50px", marginTop: 10, marginBottom: 10}}>Post</Title>
            </Space>
          </div>
        </div>
        <Card>
          <Space align="start" size={16} style={{width: '100%'}}>
            <Avatar size={48} src={post.user.avatar_url}/>
            <div style={{flex: 1}}>
              <Text strong>
                {post.user.first_name} {post.user.last_name}
              </Text>
              <div style={{margin: '12px 0'}}>
                <Text>{post.content}</Text>
              </div>
              {post.image_url && (
                <Image
                  width="100%"
                  src={post.image_url}
                  alt="Post content"
                  style={{borderRadius: 8, marginBottom: 16}}
                />
              )}
              <Space size="large">
                <Button icon={<LikeOutlined/>}>
                  {post.likes_count} Likes
                </Button>
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item key="repost" onClick={handleRepost}>
                        Repost
                      </Menu.Item>
                      <Menu.Item key="quote" onClick={() => setShowQuoteModal(true)}>
                        Quote
                      </Menu.Item>
                    </Menu>
                  }
                  trigger={['click']}
                >
                  <Button icon={<RetweetOutlined/>}>
                    {post.reposts_count} Reposts
                  </Button>
                </Dropdown>
                {/*<Button icon={<RetweetOutlined />}>*/}
                {/*  {post.reposts_count} Reposts*/}
                {/*</Button>*/}
              </Space>

              <List
                itemLayout="horizontal"
                dataSource={post.comments}
                renderItem={comment => {
                  const isOwnComment = comment.user.id === profile.id;
                  return (
                    <List.Item
                      style={{paddingLeft: 0}}
                      actions={
                        isOwnComment && (
                          editingCommentId === comment.id ? [
                            <Button key="save" onClick={() => handleEditComment(comment.id)}>
                              Save
                            </Button>,
                            <Button key="cancel" onClick={() => {
                              setEditingCommentId(null);
                              setEditedContent('');
                            }}>
                              Cancel
                            </Button>
                          ] : [
                            <Button key="edit" onClick={() => {
                              setEditingCommentId(comment.id);
                              setEditedContent(comment.content);
                            }}>
                              Edit
                            </Button>,
                            <Button key="delete" onClick={() => handleDeleteComment(comment.id)}>
                              Delete
                            </Button>
                          ]
                        )
                      }
                    >
                      <List.Item.Meta
                        avatar={<Avatar src={comment.user.avatar_url}/>}
                        title={<Text strong>{comment.user.first_name}</Text>}
                        description={
                          editingCommentId === comment.id ? (
                            <Input.TextArea
                              value={editedContent}
                              onChange={(e) => setEditedContent(e.target.value)}
                              autoSize={{minRows: 2, maxRows: 6}}
                            />
                          ) : (
                            comment.content
                          )
                        }
                      />
                    </List.Item>
                  );
                }}
                style={{marginTop: 24}}
              />
              <Form onFinish={handleCommentSubmit} style={{marginTop: 16}}>
                <Input.TextArea
                  rows={4}
                  value={newCommentContent}
                  onChange={(e) => setNewCommentContent(e.target.value)}
                  placeholder="Write a comment..."
                />
                <Button type="primary" htmlType="submit" style={{marginTop: 8}}>
                  Post Comment
                </Button>
              </Form>
            </div>
          </Space>
        </Card>
        <Modal
          title="Quote Post"
          visible={showQuoteModal}
          onOk={handleQuoteSubmit}
          onCancel={() => setShowQuoteModal(false)}
          okText="Post"
          cancelText="Cancel"
        >
          <Input.TextArea
            value={quoteContent}
            onChange={(e) => setQuoteContent(e.target.value)}
            placeholder="Add your comment..."
            autoSize={{minRows: 4, maxRows: 8}}
          />
        </Modal>
      </div>

      <RecommendationPanel/>
    </div>
  );
};

export default PostComponent;