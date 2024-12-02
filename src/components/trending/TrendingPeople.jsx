import React, { useState } from 'react';
import {Menu, Button, Card, Row, Col, Avatar, Space, Typography} from 'antd';

const items = [
  { key: '1', img: 'src/assets/Avatar.png', text: 'Text 1', button: 'Test' },
  { key: '2', img: 'src/assets/Avatar.png', text: 'Text 2', button: 'Test' },
  { key: '3', img: 'src/assets/Avatar.png', text: 'Text 3', button: 'Test' },
  { key: '4', img: 'src/assets/Avatar.png', text: 'Text 4', button: 'Test' },
  { key: '5', img: 'src/assets/Avatar.png', text: 'Text 5', button: 'Test' },
  { key: '6', img: 'src/assets/Avatar.png', text: 'Text 6', button: 'Test' },
];

const TrendingPeople = () => {
  const [visibleItems, setVisibleItems] = useState(3);

  const showMore = () => {
    setVisibleItems((prev) => prev + 3);
  };

  return (
    <div style={{
      height: "100%",
    }}>
      <Menu>
        {items.slice(0, visibleItems).map((item) => (
          <Menu.Item key={item.key}>
              <Row>
                <Col>
                  <Avatar src={item.img} size={40} />
                  {/*<img src={item.img} alt={item.text} style={{ width: '100%' }} />*/}
                </Col>
                <Col span={16} style={{
                  marginTop: "0px",
                  alignContent: "flex-start",
                  alignItems: "flex-start",
                }}>
                  <Space size={0} direction="vertical" align={"start"} style={{

                    // TODO: FIX SPACE BETWEEN TEXT!!! idk how to this right know, even debug tool don't show anything useful
                    flexDirection: "row",
                    padding: "0px",
                    margin: "0px",
                    marginBottom: "0px",
                    display: "flex",
                    alignContent: "flex-start",
                    alignItems: "flex-start",
                    border: "1px solid #536471"
                  }}>
                    {/*<Typography>{item.text}</Typography>*/}
                    <Typography.Text >
                      <p style={{ marginTop: "0px", padding: "0px" }}>1</p>
                      <p style={{ marginTop: "0px", padding: "0px" }}>2</p>
                    </Typography.Text>
                  </Space>
                </Col>
                <Col span={4}>
                  <Button>{item.button}</Button>
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
