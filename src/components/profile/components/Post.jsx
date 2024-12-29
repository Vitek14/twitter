import {Avatar, Col, Image, Row, Typography} from "antd";
import { CheckCircleTwoTone, MoreOutlined, RetweetOutlined} from "@ant-design/icons";
import "../profile.scss"

const { Text } = Typography;

const Post = ({post, user}) => {
  return (
    <div className="post">
      <Row className="post__info-row">
        <Col className="post__info-col">
          <RetweetOutlined className="post__retweet-icon"/>
          <Avatar size={50} src="src/assets/S.png"/>
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
            {user.first_name + " " + user.last_name}
          </Text>
          <CheckCircleTwoTone className="post__verified-icon" />
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
            {post.content}
          </Text>
        </Col>
      </Row>
      <Row className="post__image-row">
        <Image className="post__image" src={post.image}/>
      </Row>
    </div>
  )
}

export default Post;