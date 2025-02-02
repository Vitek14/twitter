import {useEffect, useState} from 'react';
import {Menu, Button, Row, Col, Avatar, Typography} from 'antd';
import VerifiedIcon from '@mui/icons-material/Verified';
import {CheckCircleTwoTone} from "@ant-design/icons";
import axios from "axios";

// const items = [
//   { key: '1', img: 'src/assets/avatars/typeface.png', text: 'Typeface', secondText: "@typefaceai", button: 'Test' },
//   { key: '2', img: 'src/assets/avatars/paul.png', text: 'Paul Mit', secondText: "@pmitu", button: 'Test' },
//   { key: '3', img: 'src/assets/avatars/sam.png', text: 'Sam Altman', secondText: "@sams", button: 'Test' },
//   { key: '4', img: 'src/assets/avatars/maxim.png', text: 'Maxim Boyarchuk', secondText: "@maximka", button: 'Test' },
//   { key: '5', img: 'src/assets/avatars/sweetie.jpg', text: 'Sweetie Fox', secondText: "@sweetie", button: 'Test' },
//   { key: '6', img: 'src/assets/avatars/gleb.png', text: 'Gleb Sharapo', secondText: "@sharapogleb", button: 'Test' },
// ];

const RecommendationPeople = () => {

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
      marginLeft: "25px",
      width: "475px",
      backgroundColor: "#f7f9f9",
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
        backgroundColor: "#f7f9f9",
        borderRadius: "16px",
        width: "475px"
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
                      {/*<p style={{ fontWeight: "bold", margin: 0, lineHeight: 1}}>{item.text}</p>*/}
                      {/*<p style={{ color: "#536471", marginTop: 5,  lineHeight: 1}}>{item.secondText}</p>*/}
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
