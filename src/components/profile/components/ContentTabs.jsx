import {Avatar, Button, Col, Divider, Image, Row, Typography} from "antd";
import {useState} from "react";
import {CheckCircleTwoTone, MoreOutlined, RetweetOutlined} from "@ant-design/icons";

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
    </div>
  )
}

export default ContentTabs;
