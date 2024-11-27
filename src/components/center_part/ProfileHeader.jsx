import {Button, FloatButton, Space} from "antd";
import {Header} from "antd/es/layout/layout.js";
import {FastBackwardOutlined} from "@ant-design/icons";
import "./ProfileHeader.css"


const ProfileHeader = () => {
    return (
        <Header style={{ background: "#fff" }}>
            <Space direction="horizontal">
                <Button color="default" variant="link" icon={<FastBackwardOutlined/>}
                className="profile-headers"
                style={{
                    fontSize: "24px"
                }}>
                </Button>
            </Space>
        </Header>
    )
}

export default ProfileHeader