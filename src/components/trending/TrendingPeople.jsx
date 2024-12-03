import React, { useState } from 'react';
import {Menu, Button, Card, Row, Col, Avatar, Space, Typography} from 'antd';
import {MoreOutlined} from "@ant-design/icons";

const items = [
  { key: '1', img: 'src/assets/Avatar.png', text: 'Typeface', secondText: "@typefaceai", button: 'Test' },
  { key: '2', img: 'src/assets/Avatar.png', text: 'Paul Mit', secondText: "@pmitu", button: 'Test' },
  { key: '3', img: 'src/assets/Avatar.png', text: 'Sam Altman', secondText: "@sams", button: 'Test' },
  { key: '4', img: 'src/assets/Avatar.png', text: 'Maxim Boyarchuk', secondText: "Text2", button: 'Test' },
  { key: '5', img: 'src/assets/Avatar.png', text: 'Sweetie Fox', secondText: "@sweetie", button: 'Test' },
  { key: '6', img: 'src/assets/Avatar.png', text: 'Gleb Sharapo', secondText: "Text2", button: 'Test' },
];

const TrendingPeople = () => {
  const [visibleItems, setVisibleItems] = useState(3);

  const showMore = () => {
    setVisibleItems((prev) => prev + 3);
  };

  return (
    <div style={{
      // height: "100%",
      marginTop: "16px",
      marginLeft: "25px",
      width: "356px",
      backgroundColor: "#f7f9f9",
      borderRadius: "16px"
    }}>
      {/* might like text */}
      <Typography.Text style={{
        margin: "16px",
        marginTop: "16px",
        marginLeft: "16px",
        fontWeight: "bold",
        fontSize: "20px"
      }}>
        {/* P tags causes unexpected spaces...*/}
        You might like
      </Typography.Text>
      <Menu style={{
        marginTop: "16px",
        backgroundColor: "#f7f9f9",
        borderRadius: "16px",
        width: "356px"
        // marginBottom: "20px"
      }}>
        {items.slice(0, visibleItems).map((item) => (
          <Menu.Item key={item.key} style={{
            marginBottom: "24px"
          }}>
              <Row>
                <Col>
                  <Avatar src={item.img} size={42} />
                  {/*<img src={item.img} alt={item.text} style={{ width: '100%' }} />*/}
                </Col>
                <Col span={13} style={{
                  marginTop: "2px",
                  marginRight: "10px",
                  alignContent: "flex-start",
                  alignItems: "flex-start",
                }}>
                  <Col style={{
                    marginLeft: "5px",
                    marginTop: "2px",
                    alignItems: "start",
                  }}>
                    {/*<Typography>{item.text}</Typography>*/}
                    <Typography.Text style={{ fontSize: "15px" }}>
                      <p style={{ fontWeight: "bold", margin: 0, lineHeight: 1}}>{item.text}</p>
                      <p style={{ color: "#536471", marginTop: 5,  lineHeight: 1}}>{item.secondText}</p>
                    </Typography.Text>
                  </Col>
                </Col>
                <Col>

                  {/* Follow button */}
                  <Button size="large" shape="round"

                    style={{
                        color: "white",
                        backgroundColor: "black",
                        fontWeight: "bold",
                        fontSize: "15px"
                    }}>
                        Follow
                    </Button>
                </Col>
              </Row>
          </Menu.Item>
        ))}
      </Menu>
      {visibleItems < items.length && (
        <Button onClick={showMore}>Show More</Button>
      )}
    </div>
  );
};

export default TrendingPeople;
