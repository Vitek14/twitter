import {Avatar, Col, Row} from "antd";
import {CheckCircleTwoTone, MoreOutlined} from "@ant-design/icons";
import {Layout, Typography} from "antd";

const Text = Typography.Text;

const ProfileBar = ({profile}) => {
  return (
    <Row justify="space-between" gutter={[16, 16]}>
      <Col>
        <Avatar size={40} src={profile.avatar_url}/>
      </Col>
      <Col>
        <Text strong>
          {profile.first_name}
          {profile.last_name && " " + profile.last_name}
        </Text>
        {profile.verified && <CheckCircleTwoTone style={{ marginLeft: 4 }} />}
        <div style={{marginTop: '0px'}}>
          <Text style={{ color: "#536471" }}>@{profile.user_name}</Text>
        </div>
      </Col>
      <Col>
        <MoreOutlined style={{ fontSize: 20, marginTop: 10, marginLeft: 10 }}/>
      </Col>
    </Row>
  );
};

export default ProfileBar;
