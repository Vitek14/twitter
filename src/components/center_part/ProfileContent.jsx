import "./ProfileContent.css"
import {Avatar, Button, Col, Image, Row} from "antd";
import {MoreOutlined, UserOutlined} from "@ant-design/icons";

const ProfileContent = () => {
    return (
        <div className="ProfileContent">
            {/*<img src="https://st4.depositphotos.com/7269304/24917/i/450/depositphotos_249175016-stock-photo-background-white-marble-pattern-wavy.jpg"/>*/}
            <Image
                src="https://i.pinimg.com/originals/70/31/2d/70312d533a72f2ae4e934fb93d2673c7.jpg"
                className="profileBanner"
            />
            <Avatar size={152} src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            style={{
                marginTop: "-80px",
                marginLeft: "20px"
            }}/>
            <Row style={{
                position: "relative",
                top: "-72px",
                border: "1px solid #000"
            }}>
                <Col push={20} style={{
                    border: "1px solid #000"
                }}>
                    <Button size="large" shape="circle" icon={<MoreOutlined style={{
                        fontSize: "24px"
                    }}/>}

                    style={{
                        // fontSize: "36px"
                    }}>

                    </Button>
                </Col>
                <Col push={20} style={{
                    border: "1px solid #000"
                }}>
                    TEST
                </Col>
                <Col push={20} style={{
                    border: "1px solid #000"
                }}>
                    TEST
                </Col>
                <Col push={20} style={{
                    border: "1px solid #000"
                }}>
                    TEST
                </Col>
            </Row>
        </div>
    )
}

export default ProfileContent