import {Button, Layout, Row, Typography} from "antd";

const { Content } = Layout;
const { Title, Text } = Typography;

const Inbox = () => {
  return (
    <div style={{ marginLeft: "80px", marginTop: "30px", marginRight: "74px" }}>
      <Row>
        <Title size={{ marginBottom: "7px" }}>
        Welcome to your inbox!
        </Title>
      </Row>
      <Row>
        <Text style={{ color: "#85919A", fontWeight: "bold", marginBottom: "21px" }}>
          Drop a line, share posts and more with private conversations between you and others on X.
        </Text>
      </Row>
      <Row>
        <Button type="primary" shape="round" size="large" style={{ fontWeight: "bold" }}>
          Write a message
        </Button>
      </Row>
    </div>
  )
}

export default Inbox;
