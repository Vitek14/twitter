import {useEffect, useState} from 'react';
import {Menu, Button, Row, Col, Avatar, Typography, theme} from 'antd';
import VerifiedIcon from '@mui/icons-material/Verified';
import axios from "axios";
// import {useTheme} from ".../themes/DarkTheme"

const RecommendationPeople = () => {
  const { token } = theme.useToken();

  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users/might_like/")
      .then(res => {
        setItems(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  const [visibleItems, setVisibleItems] = useState(3);

  const showMore = () => {
    setVisibleItems((prev) => prev + 3);
  };

  return (
    <div style={{
      marginTop: "16px",
      paddingTop: "21px",
      backgroundColor: token.recMenuBg,
      borderRadius: "16px"
    }}>
      <Typography.Text style={{
        margin: "16px",
        marginTop: "16px",
        marginLeft: "16px",
        fontWeight: "bold",
        fontSize: "26px"
      }}>
        You might like
      </Typography.Text>
      <Menu style={{
        marginTop: "16px",
        backgroundColor: token.recMenuBg,
        borderRadius: "16px",
      }}>
        {items.slice(0, visibleItems).map((item) => (
          <Menu.Item key={item.key} style={{
            height: "55px",
            marginBottom: "24px"
          }}>
              <Row style={{ display: "flex", alignItems: "center" }}>
                <Col style={{
                  alignSelf: "flex-start"
                }}>
                  <Avatar src={item.avatar_url} size={53} />
                </Col>
                <Col style={{
                  marginTop: "2px",
                  alignContent: "flex-start",
                  alignItems: "flex-start",
                }}>
                  <Col style={{
                    marginLeft: "5px",
                    marginTop: "2px",
                    alignItems: "start",
                  }}>
                    <Typography.Text style={{fontSize: "20px"}}>
                      <p style={{fontWeight: "bold", margin: 0, lineHeight: 1}}>{item.first_name}</p>
                      <p style={{color: "#536471", marginTop: 5, lineHeight: 1}}>{item.last_name}</p>
                    </Typography.Text>
                  </Col>
                </Col>
                <Col style={{
                  alignSelf: "start",
                  height: "auto",
                  marginLeft: "5px",
                }} span={4}>
                  {item.verified && <VerifiedIcon style={{
                    color: "#1D9BF0",
                    fontSize: "22px",
                  }} />}
                </Col>
                <Col style={{ marginLeft: "auto", alignSelf: "flex-start", marginTop: "8px" }}>  {/* Сомнительное решение. */}
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
        <Button type={"link"} onClick={showMore} style={{ marginLeft: "10px", marginBottom: "21px", font: "Inter", fontWeight: "regular", fontSize: 20 }}>Show More</Button>
      )}
    </div>
  );

};

export default RecommendationPeople;
