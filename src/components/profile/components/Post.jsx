import {Avatar, Button, Col, Image, Row, Card, Typography, Space} from "antd";
import {CheckCircleTwoTone, LikeOutlined, MessageOutlined, MoreOutlined, RetweetOutlined} from "@ant-design/icons";
import ReactMarkdown from 'react-markdown';
import ReactPlayer from 'react-player'
import "../profile.scss"

const { Text, Title, Paragraph } = Typography;

const Post = ({post, user}) => {
  const isImage = (url) => {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  };

  const isVideo = (url) => {
    return url.match(/\.(mp4|webm|ogg)$/) != null;
  };

  return (
    <Card
      style={{
        width: "100%",
        margin: "16px 0",
        borderRadius: "8px",
        overflow: "hidden", // Ensures smooth cropping of child elements
      }}
      bordered={true}
      bodyStyle={{ padding: "16px" }} // Padding customization for the Card body
    >
      {/* Header Section */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
        {/* Avatar */}
        <Avatar
          src={user.avatar_url}
          size="large"
          style={{ backgroundColor: "#87d068", minWidth: "50px", minHeight: "50px", alignSelf: "start", marginTop: "5px" }}
        >
          {/*{firstName[0]?.toUpperCase()}*/}
        </Avatar>

        {/* User Details */}
        <div style={{ marginLeft: "12px" }}>
          <Text strong style={{ fontSize: "16px", display: "block" }}>
            {`${user.first_name} ${user.last_name}`} {user.verified && <CheckCircleTwoTone/>} <Text type="secondary">@{user.user_name}</Text>
          </Text>
          {post.content && (
            <div style={{ marginBottom: "12px" }}>
              <Text>{post.content}</Text>
            </div>
          )}
          {/*<Text type="secondary" style={{ fontSize: "12px" }}>*/}
          {/*  26.05.2006*/}
          {/*</Text>*/}
        </div>
      </div>

      {/* Post Content */}

       {/*Post Image (If provided) */}
      {post.image_url && (
        <Image
          src={post.image_url}
          alt="Post image"
          style={{
            width: "100%", // Make image fit the width of the post
            maxHeight: "400px",
            objectFit: "cover",
            borderRadius: "8px",
          }}
          preview={false}
        />
      )}

      {/* Action Buttons */}
      <div style={{ marginTop: "16px" }}>
        <Space>
          {/* Like Button */}
          <Button
            type="text"
            icon={<LikeOutlined />}
            style={{ color: "#1890ff" }}
          >
            2
          </Button>

          {/* Comment Button */}
          <Button
            type="text"
            icon={<MessageOutlined />}
            style={{ color: "#1890ff" }}
          >
            34
          </Button>
        </Space>
      </div>
    </Card>
    // <div className="post">
    //   <Row className="post__info-row">
    //     <Col className="post__info-col">
    //       {post.parent_id && (
    //         <RetweetOutlined className="post__retweet-icon"/>
    //       )}
    //       <Avatar size={50} src={user.avatar_url}/>
    //     </Col>
    //     <Col>
    //       {post.parent_id && (
    //         <Text className="post__reposted-text">
    //         You reposted
    //       </Text>
    //       )}
    //     </Col>
    //   </Row>
    //   <Row className="post__bio-row">
    //     <Col flex="auto" className="post__user-info">
    //       <Text className="post__fullname">
    //         {user.first_name}
    //         {user.last_name && " " + user.last_name}
    //       </Text>
    //       {user.verified && <CheckCircleTwoTone style={{fontSize: "15px"}} />}
    //       <Text className="post__publish-text">
    //         @{user.user_name} · {post.date}
    //       </Text>
    //     </Col>
    //     <Col flex="none" className="post__more">
    //       <MoreOutlined/>
    //     </Col>
    //   </Row>
    //   <Row className="post__content-row">
    //     <Col>
    //       <Text className="post__content-text">
    //         <ReactMarkdown>
    //           {post.content}
    //         </ReactMarkdown>
    //       </Text>
    //     </Col>
    //   </Row>
    //   {post.image_url &&
    //     <Row className="post__image-row">
    //       {/*{isImage(post.image_url) && <Image className="post__image" src={post.image_url}/>}*/}
    //       {/*{console.log(isVideo(post.image_url))}*/}
    //       {/*{isVideo(post.image_url) && <ReactPlayer url={post.image_url}/>}*/}
    //       <Image className="post__image" src={post.image_url}/>
    //       {/*<ReactPlayer url={post.image_url}/>*/}
    //     </Row>
    //   }
    //   <Row>
    //     <Col>
    //       <Button>
    //         Hello world
    //       </Button>
    //     </Col>
    //   </Row>
    // </div>
  )
}

export default Post;