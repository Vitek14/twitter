import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Card, Typography, Image, Button, List, Space, Input, Form, Dropdown, Menu, Modal } from "antd";
import { ArrowLeftOutlined, CheckCircleTwoTone, RetweetOutlined } from "@ant-design/icons";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ShareIcon from "@mui/icons-material/Share";
import EqualizerIcon from "@mui/icons-material/Equalizer";
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
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [quoteContent, setQuoteContent] = useState('');

  // Дополнительные состояния для лайка, репоста, просмотров и репоста-родителя
  const [liked, setLiked] = useState(false);
  const [isReposted, setIsReposted] = useState(false);
  const [isViewed, setIsViewed] = useState(false);
  const [repostPost, setRepostPost] = useState(null);

  const navigate = useNavigate();
  const { postId } = useParams();
  const postRef = useRef(null);

  // Загрузка профиля
  useEffect(() => {
    Api.Profile.get()
      .then((res) => {
        setProfile(res.data);
      })
      .catch(err => {
        localStorage.removeItem('token');
        navigate("/login");
      });
  }, []);

  // Загрузка поста
  useEffect(() => {
    Api.Posts.get_post(postId)
      .then((res) => {
        setPost(res.data);
        setLiked(res.data.is_liked);
        setIsReposted(res.data.is_reposted);
        setLoading(false);
      })
      .catch(err => {
        localStorage.removeItem('token');
        navigate("/login");
      });
  }, [postId]);

  // Если пост является репостом, подгружаем родительский пост
  useEffect(() => {
    if (post && post.parent_post_id) {
      Api.Posts.get_post(post.parent_post_id)
        .then((res) => {
          setRepostPost(res.data);
        })
        .catch(error => console.error("Error fetching parent post:", error));
    }
  }, [post]);

  // Регистрируем просмотр поста через Intersection Observer
  useEffect(() => {
    if (isViewed || !post) return;
    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            handlePostView();
            observerInstance.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    if (postRef.current) observer.observe(postRef.current);
    return () => observer.disconnect();
  }, [isViewed, post]);

  const handlePostView = async () => {
    try {
      await Api.Posts.view({ user_id: profile.id, post_id: post.id });
      setIsViewed(true);
      // Обновляем счетчик просмотров
      setPost(prev => ({ ...prev, views_count: prev.views_count + 1 }));
    } catch (error) {
      console.error("Error recording post view:", error);
    }
  };

  // Обработка лайка и отмены лайка
  const handleLike = async () => {
    try {
      await Api.Posts.like({ user_id: profile.id, post_id: post.id });
      setLiked(true);
      setPost(prev => ({ ...prev, likes_count: prev.likes_count + 1 }));
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleUnlike = async () => {
    try {
      await Api.Posts.unlike(post.id, profile.id);
      setLiked(false);
      setPost(prev => ({ ...prev, likes_count: prev.likes_count - 1 }));
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };

  // Репост и цитирование
  const handleRepost = () => {
    // Репост без цитирования
    Api.Posts.create_post({
      user_id: profile.id,
      parent_post_id: post.id,
      content: null,
    })
      .then((res) => {
        Api.Posts.repost({ user_id: profile.id, post_id: res.data.id });
        return Api.Posts.get_post(postId);
      })
      .then((res) => {
        setPost(res.data);
        setIsReposted(true);
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
        Api.Posts.repost({ user_id: profile.id, post_id: res.data.id });
        return Api.Posts.get_post(postId);
      })
      .then((res) => {
        setPost(res.data);
        setIsReposted(true);
      })
      .catch(console.error);
  };

  // Отмена репоста (если требуется)
  const handleUndoRepost = async () => {
    try {
      await Api.Posts.delete(post.id);
      setIsReposted(false);
      setPost(prev => ({ ...prev, reposts_count: prev.reposts_count - 1 }));
    } catch (error) {
      console.error("Error undoing repost:", error);
    }
  };

  // Добавление комментария
  const handleCommentSubmit = () => {
    if (newCommentContent.trim()) {
      Api.Comments.create({
        user_id: profile.id,
        post_id: postId,
        content: newCommentContent,
      })
        .then((res) => {
          const commentData = {
            id: res.data.id,
            content: newCommentContent,
            user: {
              id: profile.id,
              first_name: profile.first_name,
              avatar_url: profile.avatar_url,
            },
          };
          setPost(prev => ({ ...prev, comments: [...prev.comments, commentData] }));
          setNewCommentContent('');
        })
        .catch(console.error);
    }
  };

  const handleDeleteComment = (commentId) => {
    Api.Comments.delete(commentId)
      .then(() => {
        setPost(prev => ({
          ...prev,
          comments: prev.comments.filter(c => c.id !== commentId)
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
          user: profile,
        };
        setPost(prev => ({
          ...prev,
          comments: prev.comments.map(c => c.id === commentId ? commentData : c)
        }));
        setEditingCommentId(null);
        setEditedContent('');
      })
      .catch(console.error);
  };

  // Функция для отрисовки панели действий (лайки, репост, комментарии, просмотры и пр.)
  const renderActions = (postData) => (
    <div
      style={{
        marginTop: "16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", gap: "8px" }}>
        <Button
          type="text"
          icon={<ChatBubbleOutlineIcon style={{ fontSize: "15px" }} />}
          style={{ color: "#1890ff" }}
          onClick={() => { /* Можно открыть модальное окно комментариев */ }}
        >
          {postData.comments_count}
        </Button>
        {isReposted ? (
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="undoRepost" onClick={handleUndoRepost}>
                  Undo Repost
                </Menu.Item>
              </Menu>
            }
            trigger={['click']}
          >
            <Button type="text" icon={<RetweetOutlined style={{ color: "#00d907" }} />} style={{ color: "#1890ff" }}>
              {postData.reposts_count}
            </Button>
          </Dropdown>
        ) : (
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
            <Button type="text" icon={<RetweetOutlined />} style={{ color: "#1890ff" }}>
              {postData.reposts_count}
            </Button>
          </Dropdown>
        )}
        <Button
          type="text"
          icon={
            liked ? (
              <FavoriteIcon style={{ fontSize: "15px", color: "red" }} />
            ) : (
              <FavoriteBorderIcon style={{ fontSize: "15px" }} />
            )
          }
          style={{ color: "#1890ff" }}
          onClick={liked ? handleUnlike : handleLike}
        >
          {postData.likes_count}
        </Button>
        <Button type="text" icon={<EqualizerIcon style={{ fontSize: "15px" }} />} style={{ color: "#1890ff" }}>
          {postData.views_count}
        </Button>
      </div>
      <div style={{ display: "flex", gap: "8px", marginLeft: "auto" }}>
        <Button type="text" icon={<BookmarkBorderIcon style={{ fontSize: "15px" }} />} style={{ color: "#1890ff" }} />
        <Button type="text" icon={<ShareIcon style={{ fontSize: "15px" }} />} style={{ color: "#1890ff" }} />
      </div>
    </div>
  );

  // Функция для отрисовки карточки поста (аналог renderPostCard из компонента Post)
  const renderPostCard = (postData, userData, isRepostPost = false) => (
    <Card hoverable style={{ width: "100%", borderRadius: "8px" }} bordered>
      {isRepostPost && (
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
      {renderActions(postData)}
    </Card>
  );

  if (loading || !post) return <div>Loading...</div>;

  // Если пост является репостом
  if (post.parent_post_id) {
    // Репост с собственным текстом
    if (post.content) {
      return (
        <div className="main">
          <div className="main__control-panel">
            <ControlPanel profileInfo={profile} />
          </div>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <div className="main__header">
              <div className="main__content-box">
                <Space className="overview__space-wrapper" direction="horizontal" align="center">
                  <Button icon={<ArrowLeftOutlined />} size="large" onClick={() => navigate(-1)} />
                  <Title level={3} style={{ marginLeft: "50px", marginTop: 10, marginBottom: 10 }}>
                    Post
                  </Title>
                </Space>
              </div>
            </div>
            <div ref={postRef}>
              <Card hoverable style={{ width: "100%", borderRadius: "8px" }} bordered>
                <div style={{ display: "flex", alignItems: "flex-start", marginBottom: "8px" }}>
                  <Avatar src={profile.avatar_url} size="large" style={{ minWidth: "50px", minHeight: "50px" }} />
                  <div style={{ marginLeft: "12px", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Text strong style={{ fontSize: "16px" }}>
                        {`${profile.first_name} ${profile.last_name}`}
                      </Text>
                      <Text type="secondary" style={{ marginLeft: "8px" }}>
                        @{profile.user_name}
                      </Text>
                      {profile.verified && <CheckCircleTwoTone style={{ marginLeft: "8px" }} />}
                    </div>
                    {post.content && (
                      <div style={{ marginTop: "4px", textAlign: "left" }}>
                        <Text>{post.content}</Text>
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ marginLeft: "62px" }}>
                  {repostPost && renderPostCard(repostPost, repostPost.user)}
                </div>
                {post.image_url && (
                  <Image
                    src={post.image_url}
                    alt="Post image"
                    style={{
                      width: "100%",
                      maxHeight: "400px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                )}
                {renderActions(post)}
              </Card>
            </div>
            <div style={{ marginTop: 24 }}>
              <List
                itemLayout="horizontal"
                dataSource={post.comments}
                renderItem={(comment) => {
                  const isOwnComment = comment.user.id === profile.id;
                  return (
                    <List.Item
                      style={{ paddingLeft: 0 }}
                      actions={
                        isOwnComment &&
                        (editingCommentId === comment.id
                          ? [
                              <Button key="save" onClick={() => handleEditComment(comment.id)}>
                                Save
                              </Button>,
                              <Button
                                key="cancel"
                                onClick={() => {
                                  setEditingCommentId(null);
                                  setEditedContent('');
                                }}
                              >
                                Cancel
                              </Button>,
                            ]
                          : [
                              <Button
                                key="edit"
                                onClick={() => {
                                  setEditingCommentId(comment.id);
                                  setEditedContent(comment.content);
                                }}
                              >
                                Edit
                              </Button>,
                              <Button key="delete" onClick={() => handleDeleteComment(comment.id)}>
                                Delete
                              </Button>,
                            ])
                      }
                    >
                      <List.Item.Meta
                        avatar={<Avatar src={comment.user.avatar_url} />}
                        title={<Text strong>{comment.user.first_name}</Text>}
                        description={
                          editingCommentId === comment.id ? (
                            <Input.TextArea
                              value={editedContent}
                              onChange={(e) => setEditedContent(e.target.value)}
                              autoSize={{ minRows: 2, maxRows: 6 }}
                            />
                          ) : (
                            comment.content
                          )
                        }
                      />
                    </List.Item>
                  );
                }}
              />
              <Form onFinish={handleCommentSubmit} style={{ marginTop: 16 }}>
                <Input.TextArea
                  rows={4}
                  value={newCommentContent}
                  onChange={(e) => setNewCommentContent(e.target.value)}
                  placeholder="Write a comment..."
                />
                <Button type="primary" htmlType="submit" style={{ marginTop: 8 }}>
                  Post Comment
                </Button>
              </Form>
            </div>
          </div>
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
              autoSize={{ minRows: 4, maxRows: 8 }}
            />
          </Modal>
          <RecommendationPanel />
        </div>
      );
    } else {
      // Репост без собственного текста
      return (
        <div className="main">
          <div className="main__control-panel">
            <ControlPanel profileInfo={profile} />
          </div>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <div className="main__header">
              <div className="main__content-box">
                <Space className="overview__space-wrapper" direction="horizontal" align="center">
                  <Button icon={<ArrowLeftOutlined />} size="large" onClick={() => navigate(-1)} />
                  <Title level={3} style={{ marginLeft: "50px", marginTop: 10, marginBottom: 10 }}>
                    Post
                  </Title>
                </Space>
              </div>
            </div>
            <div ref={postRef}>
              {repostPost && renderPostCard(repostPost, repostPost.user, true)}
            </div>
            <div style={{ marginTop: 24 }}>
              <List
                itemLayout="horizontal"
                dataSource={post.comments}
                renderItem={(comment) => {
                  const isOwnComment = comment.user.id === profile.id;
                  return (
                    <List.Item
                      style={{ paddingLeft: 0 }}
                      actions={
                        isOwnComment &&
                        (editingCommentId === comment.id
                          ? [
                              <Button key="save" onClick={() => handleEditComment(comment.id)}>
                                Save
                              </Button>,
                              <Button
                                key="cancel"
                                onClick={() => {
                                  setEditingCommentId(null);
                                  setEditedContent('');
                                }}
                              >
                                Cancel
                              </Button>,
                            ]
                          : [
                              <Button
                                key="edit"
                                onClick={() => {
                                  setEditingCommentId(comment.id);
                                  setEditedContent(comment.content);
                                }}
                              >
                                Edit
                              </Button>,
                              <Button key="delete" onClick={() => handleDeleteComment(comment.id)}>
                                Delete
                              </Button>,
                            ])
                      }
                    >
                      <List.Item.Meta
                        avatar={<Avatar src={comment.user.avatar_url} />}
                        title={<Text strong>{comment.user.first_name}</Text>}
                        description={
                          editingCommentId === comment.id ? (
                            <Input.TextArea
                              value={editedContent}
                              onChange={(e) => setEditedContent(e.target.value)}
                              autoSize={{ minRows: 2, maxRows: 6 }}
                            />
                          ) : (
                            comment.content
                          )
                        }
                      />
                    </List.Item>
                  );
                }}
              />
              <Form onFinish={handleCommentSubmit} style={{ marginTop: 16 }}>
                <Input.TextArea
                  rows={4}
                  value={newCommentContent}
                  onChange={(e) => setNewCommentContent(e.target.value)}
                  placeholder="Write a comment..."
                />
                <Button type="primary" htmlType="submit" style={{ marginTop: 8 }}>
                  Post Comment
                </Button>
              </Form>
            </div>
          </div>
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
              autoSize={{ minRows: 4, maxRows: 8 }}
            />
          </Modal>
          <RecommendationPanel />
        </div>
      );
    }
  }

  // Если обычный пост (не репост)
  return (
    <div className="main">
      <div className="main__control-panel">
        <ControlPanel profileInfo={profile} />
      </div>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div className="main__header">
          <div className="main__content-box">
            <Space className="overview__space-wrapper" direction="horizontal" align="center">
              <Button icon={<ArrowLeftOutlined />} size="large" onClick={() => navigate(-1)} />
              <Title level={3} style={{ marginLeft: "50px", marginTop: 10, marginBottom: 10 }}>
                Post
              </Title>
            </Space>
          </div>
        </div>
        <div ref={postRef}>{renderPostCard(post, post.user)}</div>
        <div style={{ marginTop: 24 }}>
          <List
            itemLayout="horizontal"
            dataSource={post.comments}
            renderItem={(comment) => {
              const isOwnComment = comment.user.id === profile.id;
              return (
                <List.Item
                  style={{ paddingLeft: 0 }}
                  actions={
                    isOwnComment &&
                    (editingCommentId === comment.id
                      ? [
                          <Button key="save" onClick={() => handleEditComment(comment.id)}>
                            Save
                          </Button>,
                          <Button
                            key="cancel"
                            onClick={() => {
                              setEditingCommentId(null);
                              setEditedContent('');
                            }}
                          >
                            Cancel
                          </Button>,
                        ]
                      : [
                          <Button
                            key="edit"
                            onClick={() => {
                              setEditingCommentId(comment.id);
                              setEditedContent(comment.content);
                            }}
                          >
                            Edit
                          </Button>,
                          <Button key="delete" onClick={() => handleDeleteComment(comment.id)}>
                            Delete
                          </Button>,
                        ])
                  }
                >
                  <List.Item.Meta
                    avatar={<Avatar src={comment.user.avatar_url} />}
                    title={<Text strong>{comment.user.first_name}</Text>}
                    description={
                      editingCommentId === comment.id ? (
                        <Input.TextArea
                          value={editedContent}
                          onChange={(e) => setEditedContent(e.target.value)}
                          autoSize={{ minRows: 2, maxRows: 6 }}
                        />
                      ) : (
                        comment.content
                      )
                    }
                  />
                </List.Item>
              );
            }}
          />
          <Form onFinish={handleCommentSubmit} style={{ marginTop: 16 }}>
            <Input.TextArea
              rows={4}
              value={newCommentContent}
              onChange={(e) => setNewCommentContent(e.target.value)}
              placeholder="Write a comment..."
            />
            <Button type="primary" htmlType="submit" style={{ marginTop: 8 }}>
              Post Comment
            </Button>
          </Form>
        </div>
      </div>
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
          autoSize={{ minRows: 4, maxRows: 8 }}
        />
      </Modal>
      <RecommendationPanel />
    </div>
  );
};

export default PostComponent;
