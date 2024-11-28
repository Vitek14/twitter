import {Button, FloatButton, Space, Typography} from "antd";
import {Header} from "antd/es/layout/layout.js";
import {ArrowLeftOutlined, FastBackwardOutlined} from "@ant-design/icons";
import "./ProfileHeader.css"

const Text = Typography;
const ProfileHeader = () => {
    return (
        <Header style={{ background: "#fff" }}>
            <Space direction="horizontal"
            style={{
                padding: 0,
            }}>
                <Button color="default" variant="link" icon={<ArrowLeftOutlined
                style={{
                    fontSize: "24px"
                }}
                />}
                className="profile-headers">
                </Button>
                <Space direction="vertical" size={0} style={{
                marginLeft: 20,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start"}}>
                    <Text style={{ verticalAlign: "top" }}>Верхний текст</Text>
                    <Text style={{ verticalAlign: "top" }}>Нижний текст</Text>
                </Space>
            </Space>
        </Header>
    )
}

export default ProfileHeader