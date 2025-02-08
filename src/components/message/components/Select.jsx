import {Button, Layout, Row, Typography} from "antd";

const { Content } = Layout;
const { Title, Text } = Typography;

const Select = () => {
  return (
    <div style={{ marginLeft: "80px", marginTop: "300px", marginRight: "74px" }}>
      <Row>
        <Title style={{ marginBottom: "7px" }}>
          Select a message
        </Title>
      </Row>
      <Row>
        <Text style={{ color: "#85919A", fontWeight: "bold", marginBottom: "21px" }}>
          Choose from your existing conversations, start a new one, or just keep swimming.
        </Text>
      </Row>
      <Row>
        <Button type="primary" shape="round" size="large" style={{ fontWeight: "bold" }}>
          New message
        </Button>
      </Row>
    </div>
  )
}

export default Select;
