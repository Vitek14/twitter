import {Button, Space, Typography, Layout} from "antd";
import {ArrowLeftOutlined, CheckCircleTwoTone } from "@ant-design/icons";
import "./overview.scss"

const { Header } = Layout;
const Text = Typography;
const Overview = () => {
  return (
    <Header style={{ background: "#ffffff", padding: "0px" }}>
      <Space direction="horizontal" align={ "start" }>
        <Button color="default" variant="link" icon={<ArrowLeftOutlined
          style={{
            fontSize: "20px"
          }}
        />}
                className="profile-headers">
        </Button>
        <Space direction="vertical" size={0} style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start"}}>
          <Text style={{
            verticalAlign: "top",
            fontFamily: "Inter, sans-serif",
            fontWeight: "bold",
            fontSize: 20
          }}>Stas Neprokin</Text>
          <Text style={{
            verticalAlign: "top",
            fontFamily: "Inter, sans-serif",
            fontSize: 13,
            color: "#536471"
          }}>23 post</Text>
        </Space>
        <CheckCircleTwoTone style={{ display: "flex" }}/>
      </Space>
    </Header>
  )
}

export default Overview
