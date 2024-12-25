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
      <Row style={{
        position: "relative",
        top: "-50px",
        marginLeft: "85px",
      }}>
        <Col>
          <Text style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: "bold",
            fontSize: 15,
            marginRight: "5px",
          }}>
            {user.first_name + " " + user.last_name}
          </Text>
        </Col>
        <Col>
          <CheckCircleTwoTone style={{
            fontSize: 15,
          }}/>
        </Col>
        <Col style={{
          marginLeft: "7px",
          alignItems: "center"
        }}>
          <Text style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 15,
            marginRight: "5px",
            color: "#536471"
          }}>
            @{user.user_name} · {post.date}
          </Text>
        </Col>
        <Col style={{
          marginLeft: "30vh",
          alignItems: "end",
        }}>
          <MoreOutlined style={{
            fontSize: 15,
          }}/>
        </Col>
      </Row>
      <Row style={{
        position: "relative",
        top: "-50px",
        left: "85px",
        marginRight: "200px",
      }}>
        <Col style={{
          alignItems: "center"
        }}>
          <Text style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 15,
          }}>
            {post.content}
          </Text>
        </Col>
      </Row>
      <Row style={{
        position: "relative",
        top: "-50px",
        left: "85px",
        marginRight: "200px",
      }}>
        <Image style={{ borderRadius: '10px' }} src={post.image}/>
      </Row>
    </div>
  )
}

export default Post;