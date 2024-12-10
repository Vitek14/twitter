import {Avatar, Button, Col, Divider, Image, Row, Typography} from "antd";
import {useState} from "react";
import {CheckCircleTwoTone, MoreOutlined, RetweetOutlined} from "@ant-design/icons";
import "./ContentTabs.css"

const Text = Typography.Text;

const ContentTabs = () => {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleClick = (buttonIndex) => {
    setSelectedButton(buttonIndex);
  };
  return (
    <div>
      <Row style={{
        position: "relative",
        top: "35px",
        alignItems: 'center',
      }}>
        <Col>
          <Button
            key={1}
            className={`custom-button ${selectedButton === 1 ? 'selected' : ''}`}
            onClick={() => handleClick(1)}
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 15,
              fontWeight: "bold",
              marginLeft: "50px",
              marginRight: "100px"
            }}>
            Posts
          </Button>
        </Col>
        <Col>
          <Button
            key={2}
            className={`custom-button ${selectedButton === 2 ? 'selected' : ''}`}
            onClick={() => handleClick(2)}
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 15,
              fontWeight: "bold",
              marginRight: "100px"
            }}>
            Replies
          </Button>
        </Col>
        <Col>
          <Button
            key={3}
            className={`custom-button ${selectedButton === 3 ? 'selected' : ''}`}
            onClick={() => handleClick(3)}
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 15,
              fontWeight: "bold",
              marginRight: "100px"
            }}>
            Highlights
          </Button>
        </Col>
        <Col>
          <Button
            key={4}
            className={`custom-button ${selectedButton === 4 ? 'selected' : ''}`}
            onClick={() => handleClick(4)}
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 15,
              fontWeight: "bold",
              marginRight: "100px"
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
      <div className="post" style={{
        position: "relative",
        top: "15px",
        marginRight: "25px",
      }}>
        <Row style={{
          position: "relative",
          left: "17px",
          // border: "1px solid #000",
          display: "flex",
        }}>
          <Col style={{
            marginRight: "8px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
            <RetweetOutlined style={{
              fontSize: 15,
              color: "#536471",
              marginLeft: "40px",
              marginRight: "4px"
            }}/>
            <Avatar size={50} src="src/assets/S.png"/>
          </Col>
          <Col style={{
            position: "relative",
            alignItems: "center"
          }}>
            <Text style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 12,
              marginRight: "5px",
              color: "#536471",
            }}>
              You reposted
            </Text>
          </Col>
        </Row>
        <Row style={{
          position: "relative",
          top: "-50px",
          marginLeft: "85px",
        }}>
          <Col>
            <Text style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: "bold",
              fontSize: 15,
              marginRight: "5px",
            }}>
              Modest Mitkus
            </Text>
          </Col>
          <Col>
            <CheckCircleTwoTone style={{
              fontSize: 15,
            }}/>
          </Col>
          <Col style={{
            marginLeft: "7px",
            alignItems: "center"
          }}>
            <Text style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 15,
              marginRight: "5px",
              color: "#536471"
            }}>
              @ModestMitkus · Nov 20, 2023
            </Text>
          </Col>
          <Col style={{
            marginLeft: "30vh",
            alignItems: "end",
          }}>
            <MoreOutlined style={{
              fontSize: 15,
            }}/>
          </Col>
        </Row>
        <Row style={{
          position: "relative",
          top: "-50px",
          left: "85px",
          marginRight: "200px",
        }}>
          <Col style={{
            alignItems: "center"
          }}>
            <Text style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 15,
            }}>
              Everyone should own products that earn $10,000/month. Unfortunately, most people have no idea how… Here’s
              my tested blueprint to go from $0 → $10,000/month:
            </Text>
          </Col>
        </Row>
        <Row style={{
          position: "relative",
          top: "-50px",
          left: "85px",
          marginRight: "200px",
        }}>
          <Image style={{borderRadius: '10px'}}
                 src="src/assets/vintage-engraving-depicting-diagram-imperial-standard-gallon-based-10-pound-volume-water-certain-temperature-established-1824_1257429-72247.png"/>
        </Row>
      </div>
    </div>
  )
}

export default ContentTabs;
