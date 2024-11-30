import "./ProfileContent.css"
import {Avatar, Button, Col, Divider, Image, Row, Typography} from "antd";
import {
    BankOutlined, CalendarOutlined,
    CheckCircleTwoTone, EnvironmentOutlined,
    FileMarkdownOutlined, LinkOutlined,
    MessageOutlined,
    MoreOutlined, SmileOutlined,
    UserOutlined
} from "@ant-design/icons";

const Text = Typography
const ProfileContent = () => {
    return (
        <div className="ProfileContent">
            {/*<img src="https://st4.depositphotos.com/7269304/24917/i/450/depositphotos_249175016-stock-photo-background-white-marble-pattern-wavy.jpg"/>*/}
            <Image
                src="https://i.pinimg.com/originals/70/31/2d/70312d533a72f2ae4e934fb93d2673c7.jpg"
                className="profileBanner"
            />
            <Avatar size={152} src="src/assets/Avatar.png"
            style={{
                marginTop: "-80px",
                marginLeft: "20px"
            }}/>
            <Row gutter={8} style={{
                position: "relative",
                top: "-55px",
            }}>
                <Col push={18} style={{
                    marginLeft: "15px"  // Добавляет отступ для того, чтобы было ближе к левой менюшке
                }}>
                    <Button size="large" shape="circle" icon={<MoreOutlined style={{
                        fontSize: "24px"
                    }}/>}

                    style={{
                        // fontSize: "36px"
                    }}>

                    </Button>
                </Col>
                <Col push={18}>
                    <Button size="large" shape="circle" icon={<MessageOutlined style={{
                        fontSize: "24px"
                    }}/>}

                    style={{
                        // fontSize: "36px"
                    }}>

                    </Button>
                </Col>
                <Col push={18}>
                    <Button size="large" shape="round"

                    style={{
                        color: "white",
                        // textTextColor: "blue",
                        backgroundColor: "black",
                        fontWeight: "bold",
                        fontSize: "15px"
                    }}>
                        Follow
                    </Button>
                </Col>
            </Row>
        {/*    Дальше никнейм и тег */}
            <Row style={{
                position: "relative",
                top: "-20px",
                left: "25px",
            }}>
                <Col>
                    <Text style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: "bold",
                        fontSize: 20,
                        marginRight: "5px"
                    }}>
                        Stas Neprokin
                    </Text>
                </Col>
                <Col style={{
                    display: 'flex', justifyContent: 'center', alignItems: 'center'
                }}>
                    <CheckCircleTwoTone style={{ fontSize: "15px" }}/>
                </Col>
            </Row>
            <Row style={{
                position: "relative",
                top: "-20px",
                left: "25px",
            }}>
                <Col>
                    <Text style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 13,
                        marginRight: "5px",
                        color: "#536471"
                    }}>
                        @sneprokin
                    </Text>
                </Col>
            </Row>
            <Row style={{
                position: "relative",
                top: "-10px",
                left: "25px",
            }}>
                <Col>
                    <Text style={{
                        // fontFamily: "Inter, sans-serif",
                        fontSize: 15,
                        marginRight: "5px",
                        // color: "#536471"
                    }}>
                        Designing Products that Users Love
                    </Text>
                </Col>
            </Row>

        {/*    Далее теги пользователя*/}
            <Row style={{
                position: "relative",
                top: "0px",
                left: "25px",
                alignItems: 'center'
            }}>
                <Col >
                    <BankOutlined style={{
                        color: "#536471",
                        marginRight: "4px"
                    }}/>
                </Col>
                <Col>
                    <Text style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 15,
                        marginRight: "5px",
                        color: "#536471"
                    }}>
                        Enterpreneur
                    </Text>
                </Col>

                <Col style={{
                    marginLeft: "12px"
                }}>
                    <EnvironmentOutlined style={{
                        color: "#536471",
                        marginRight: "4px"
                    }}/>
                </Col>
                <Col>
                    <Text style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 15,
                        marginRight: "5px",
                        color: "#536471"
                    }}>
                        Earth
                    </Text>
                </Col>

                <Col style={{
                    marginLeft: "12px"
                }}>
                    <LinkOutlined style={{
                        color: "#536471",
                        marginRight: "4px"
                    }}/>
                </Col>
                <Col>
                    <Text style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 15,
                        marginRight: "5px",
                        color: "#1d9bf0"
                    }}>
                        neprokin.com
                    </Text>
                </Col>

                <Col style={{
                    marginLeft: "12px"
                }}>
                    <SmileOutlined style={{
                        color: "#536471",
                        marginRight: "4px"
                    }}/>
                </Col>
                <Col>
                    <Text style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 15,
                        marginRight: "5px",
                        color: "#536471"
                    }}>
                        Born November 7, 1987
                    </Text>
                </Col>

                <Col style={{
                    marginLeft: "12px"
                }}>
                    <CalendarOutlined style={{
                        color: "#536471",
                        marginRight: "4px"
                    }}/>
                </Col>
                <Col>
                    <Text style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 15,
                        marginRight: "5px",
                        color: "#536471"
                    }}>
                        Joined November 2010
                    </Text>
                </Col>
            </Row>

        {/*    Далее кол-во фолловеров*/}
            <Row style={{
                position: "relative",
                marginTop: "8px",
                left: "25px",
                // border: "1px solid #000",
                alignItems: 'center'
            }}>
                <Col >
                    <Text style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 15,
                        marginRight: "5px",
                        fontWeight: "bold"
                    }}>
                        143
                    </Text>
                </Col>
                <Col >
                    <Text style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 15,
                        marginRight: "15px",
                        color: "#536471"
                    }}>
                        Following
                    </Text>
                </Col>

                <Col >
                    <Text style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 15,
                        marginRight: "5px",
                        fontWeight: "bold"
                    }}>
                        149
                    </Text>
                </Col>
                <Col >
                    <Text style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 15,
                        marginRight: "15px",
                        color: "#536471"
                    }}>
                        Followers
                    </Text>
                </Col>
            </Row>

        {/*    Далее кнопочки выбора категорий(посты/ответы/т.д.)*/}
            <Row style={{
                position: "relative",
                top: "35px",
                left: "50px",
                marginRight: "30px",
                alignItems: 'center',
                // border: "1px solid #000"
            }}>
                <Col>
                    <Button style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 15,
                        fontWeight: "bold",
                        marginRight: "125px"
                    }}>
                        Posts
                    </Button>
                </Col>
                <Col>
                    <Button style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 15,
                        fontWeight: "bold",
                        marginRight: "125px"
                    }}>
                        Replies
                    </Button>
                </Col>
                <Col>
                    <Button style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 15,
                        fontWeight: "bold",
                        marginRight: "125px"
                    }}>
                        Highlights
                    </Button>
                </Col>
                <Col>
                    <Button style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 15,
                        fontWeight: "bold",
                        marginRight: "125px"
                    }}>
                        Media
                    </Button>
                </Col>
            </Row>
            <Row style={{
                position: "relative",
                top: "35px",
            }}>
                <Divider/>
            </Row>
        </div>
    )
}
// <LinkOutlined />
export default ProfileContent