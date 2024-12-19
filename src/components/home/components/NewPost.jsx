import {Avatar, Col, Input, Row} from "antd";

const NewPost = (Props) => {
  const {profile_image} = Props;
  return (
    <div className="NewPost">
      <Row style={{ margin: "10px" }}>
        <Col>
          <Avatar src={profile_image}/>
        </Col>
        <Col>
          <Input placeholder={"What is happening?!"} maxLength={50} variant={"borderless"}/>
        </Col>
      </Row>
    </div>
  )
}

export default NewPost;
