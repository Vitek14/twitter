import {Avatar, Col, Image, Row, Typography} from "antd";
import { CheckCircleTwoTone, MoreOutlined, RetweetOutlined} from "@ant-design/icons";
import ReactMarkdown from 'react-markdown';
import ReactPlayer from 'react-player'
import "../profile.scss"

const { Text } = Typography;

const Post = ({post, user}) => {
  const isImage = (url) => {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  };

  const isVideo = (url) => {
    return url.match(/\.(mp4|webm|ogg)$/) != null;
  };

  return (
    <div className="post">
      <Row className="post__info-row">
        <Col className="post__info-col">
          <RetweetOutlined className="post__retweet-icon"/>
          <Avatar size={50} src={user.avatar_url}/>
        </Col>
        <Col>
          <Text className="post__reposted-text">
            You reposted
          </Text>
        </Col>
      </Row>
      <Row className="post__bio-row">
        <Col flex="auto" className="post__user-info">
          <Text className="post__fullname">
            {user.first_name}
            {user.last_name && " " + user.last_name}
          </Text>
          {user.verified && <CheckCircleTwoTone style={{fontSize: "15px"}} />}
          <Text className="post__publish-text">
            @{user.user_name} · {post.date}
          </Text>
        </Col>
        <Col flex="none" className="post__more">
          <MoreOutlined/>
        </Col>
      </Row>
      <Row className="post__content-row">
        <Col>
          <Text className="post__content-text">
            <ReactMarkdown>
              {post.content}
            </ReactMarkdown>
          </Text>
        </Col>
      </Row>
      {post.image_url &&
        <Row className="post__image-row">
          {/*{isImage(post.image_url) && <Image className="post__image" src={post.image_url}/>}*/}
          {/*{console.log(isVideo(post.image_url))}*/}
          {/*{isVideo(post.image_url) && <ReactPlayer url={post.image_url}/>}*/}
          <Image className="post__image" src={post.image_url}/>
          {/*<ReactPlayer url={post.image_url}/>*/}
        </Row>
      }
    </div>
  )
}

export default Post;