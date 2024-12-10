import {Avatar, Col, Row} from "antd";
import {CheckCircleTwoTone, MoreOutlined} from "@ant-design/icons";
import {Layout, Typography} from "antd";

const Text = Typography.Text;

const ProfileBar = () => {
  return (
    <Row justify="space-between" gutter={[16, 16]}>
      <Col>
        <Avatar size={40} src="src/assets/Avatar.png"/>
      </Col>
      <Col>
        <Text strong>Stas Neprokin</Text>
        <CheckCircleTwoTone style={{ marginLeft: 4 }}/>
        <div style={{marginTop: '0px'}}>
          <Text style={{ color: "#536471" }}>@sneprokin</Text>
        </div>
      </Col>
      <Col>
        <MoreOutlined style={{ fontSize: 20, marginTop: 10, marginLeft: 10 }}/>
      </Col>
    </Row>
  );
};

export default ProfileBar;
