import {Layout, Space, Row, Col, Avatar, Typography} from 'antd';
import "./side_menu.css"
import {Header} from "antd/es/layout/layout.js";
import {
    XOutlined,
    HomeOutlined,
    SearchOutlined,
    BellOutlined,
    MailOutlined,
    HomeFilled,
    BellFilled,
    MailFilled,
    FileTextFilled,
    FileTextOutlined,
    BookFilled,
    BookOutlined,
    UserOutlined,
    MoreOutlined,
    CheckCircleTwoTone
} from "@ant-design/icons";
import { Button } from 'antd';
import {useState} from "react";
const { Content, Footer, Sider } = Layout;

const { Text } = Typography;

const FooterSide = () => {
    return (
        <Footer style={{ display: 'flex', justifyContent: 'flex-start', background: "#fff", padding: 0 }}>
            <Row justify="space-between" gutter={[16, 16]}>
                <Col>
                    <Avatar size={40} src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"/>
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
        </Footer>
    );
};

const SideMenu = () => {
    const [isActive, setIsActive] = useState(null);

    const handleButtonClick = (buttonIndex) => {
        setIsActive(buttonIndex);
    };

    return (
        <Sider width={400} style={{ position: 'fixed', background: "#ffffff"}}>
            <Layout
                style={{
                    marginTop: 0,
                    marginLeft: 60
                }}
            >
                <Header
                    style={{
                        background: "#fff"
                    }}
                >
                    <XOutlined style={{fontSize: "24px", marginLeft: -30}}/>
                </Header>
                <Content
                    style={{
                        background: "#fff",
                        padding: 20
                    }}
                >

                    {/*    Далее идут кнопки*/}
                    <Space direction="vertical" size={[0, 20]} style={{marginBottom: 20, marginLeft: -13}}>
                        <Button color="default" variant="link" icon={isActive === 1 ? <HomeFilled/> : <HomeOutlined/>}
                                className={`side-buttons ${isActive === 1 ? 'active' : ''}`}
                                onClick={() => handleButtonClick(1)}>
                            Home
                        </Button>
                        <Button color="default" variant="link" icon={isActive === 2 ? <SearchOutlined/> : <SearchOutlined/>}
                                className={`side-buttons ${isActive === 2 ? 'active' : ''}`}
                                onClick={() => handleButtonClick(2)}>
                            Explore
                        </Button>
                        <Button color="default" variant="link" icon={isActive === 3 ? <BellFilled/> : <BellOutlined/>}
                                className={`side-buttons ${isActive === 3 ? 'active' : ''}`}
                                onClick={() => handleButtonClick(3)}>
                            Notifications
                        </Button>
                        <Button color="default" variant="link" icon={isActive === 4 ? <MailFilled/> : <MailOutlined/>}
                                className={`side-buttons ${isActive === 4 ? 'active' : ''}`}
                                onClick={() => handleButtonClick(4)}>
                            Messages
                        </Button>
                        <Button color="default" variant="link"
                                icon={isActive === 5 ? <FileTextFilled/> : <FileTextOutlined/>}
                                className={`side-buttons ${isActive === 5 ? 'active' : ''}`}
                                onClick={() => handleButtonClick(5)}>
                            Lists
                        </Button>
                        <Button color="default" variant="link" icon={isActive === 6 ? <BookFilled/> : <BookOutlined/>}
                                className={`side-buttons ${isActive === 6 ? 'active' : ''}`}
                                onClick={() => handleButtonClick(6)}>
                            Bookmarks
                        </Button>
                        <Button color="default" variant="link" icon={isActive === 7 ? <UserOutlined/> : <UserOutlined/>}
                                className={`side-buttons ${isActive === 7 ? 'active' : ''}`}
                                onClick={() => handleButtonClick(7)}>
                            Profile
                        </Button>
                        <Button color="default" variant="link" icon={isActive === 8 ? <MoreOutlined/> : <MoreOutlined/>}
                                className={`side-buttons ${isActive === 8 ? 'active' : ''}`}
                                onClick={() => handleButtonClick(8)}>
                            Lists
                        </Button>
                        <Button type="primary" shape="round"
                                style={{width: '270px', height: '60px', fontWeight: 'bold', fontSize: 16}}>
                            Post
                        </Button>
                    </Space>
                    <FooterSide/>
                </Content>
            </Layout>
        </Sider>
    );
}

export default SideMenu;
