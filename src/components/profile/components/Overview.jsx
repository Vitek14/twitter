import { Button, Space, Typography, Layout } from "antd";
import { ArrowLeftOutlined, CheckCircleTwoTone } from "@ant-design/icons";
import "../profile.scss";

const { Header } = Layout;
const { Text } = Typography;

const Overview = ({ profile }) => {
  return (
    <div className="overview">
      <Header className="overview__header">
        <Space className="overview__space-wrapper" direction="horizontal" align="start">
          <Button
            color="default"
            variant="link"
            icon={<ArrowLeftOutlined />}
            className="profile-headers"
          />
          <Space className="overview__space" direction="vertical" size={0}>
            <Text className="overview__fullname">
              {profile.first_name}
              {profile.last_name && " " + profile.last_name}
            </Text>
            <Text className="overview__view-counter">23 post</Text>
          </Space>
          <CheckCircleTwoTone className="profile-check" />
        </Space>
      </Header>
    </div>
  );
};

export default Overview;
