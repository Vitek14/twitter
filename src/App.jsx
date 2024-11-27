import {Layout, Space} from 'antd';
import './App.css'
import {Header} from "antd/es/layout/layout.js";
import {
    XOutlined,
    HomeOutlined,
    SearchOutlined,
    BellOutlined,
    MailOutlined,
    HomeFilled,
    BellFilled, MailFilled, FileTextFilled, FileTextOutlined, BookFilled, BookOutlined, UserOutlined, MoreOutlined
} from "@ant-design/icons";
import { Button, ConfigProvider, Flex } from 'antd';
import {useState} from "react";
const { Content, Footer, Sider } = Layout;

const App = () => {
    const [isActive, setIsActive] = useState(null);

    const handleButtonClick = (buttonIndex) => {
        setIsActive(buttonIndex);
    };

    return (
        <Layout
            style={{
                minHeight: "100vh"
            }}
            >
            <Sider width={400} style={{ background: "#ffffff" }}>
                <Layout
                        style={{
                            marginTop: 20,
                            marginLeft: 60
                        }}
                        >
                    <Header
                        style={{
                            background: "#fff"
                        }}
                        >
                        <XOutlined style={{ fontSize: "30px", marginLeft: -30}} />
                    </Header>
                    <Content
                        style={{
                            background: "#fff",
                            padding: 20
                        }}
                        >

                    {/*    Далее идут кнопки*/}
                        <Space direction="vertical" size={[0, 20]} style={{ marginBottom: 20, marginLeft: -13}}>
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
                            <Button color="default" variant="link" icon={isActive === 5 ? <FileTextFilled/> : <FileTextOutlined/>}
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
                            <Button type="primary" shape="round" style={{ width: '270px', height: '60px', fontWeight: 'bold', fontSize: 16}}>
                                Post
                            </Button>
                        </Space>
                    </Content>
                </Layout>
            </Sider>
        </Layout>
    )
}

export default App;