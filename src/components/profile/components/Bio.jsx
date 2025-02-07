import {Button, Col, Row, Typography} from "antd";
import {
  BankOutlined,
  CalendarOutlined,
  CheckCircleTwoTone,
  EnvironmentOutlined,
  LinkOutlined,
  MessageOutlined,
  MoreOutlined,
  SmileOutlined
} from "@ant-design/icons";

const Text = Typography.Text;

const Bio = ({profile}) => {

  console.log("profile", profile);
  console.log(profile.first_name)

  // Formatting input date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  return (
    <div>
      <Row justify={"end"} gutter={8} style={{
        position: "relative",
        top: "-45px",
      }}>
        <Col style={{
          marginLeft: "15px"  // Добавляет отступ для того, чтобы было ближе к левой менюшке
        }}>
          <Button size="large" shape="circle" icon={<MoreOutlined style={{
            fontSize: "24px"
          }}/>}/>
        </Col>
        <Col>
          <Button size="large" shape="circle" icon={<MessageOutlined style={{
            fontSize: "24px"
          }}/>}/>
        </Col>
        <Col style={{
          marginRight: "22px"
        }}>
          <Button size="large" shape="round" style={{
            color: "white",
            backgroundColor: "black",
            fontWeight: "bold",
            fontSize: "15px"
          }}>
            Follow
          </Button>
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
              fontWeight: "bold",
              fontSize: 20,
              marginRight: "5px"
            }}>
              {profile.first_name} {profile.last_name}
            </Text>
          </Col>
          <Col style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
          }}>
            {profile.verified && <CheckCircleTwoTone style={{fontSize: "15px"}} />}
          </Col>
        </Row>
      {/*))}*/}
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
            {/*@sneprokin*/}
            @{profile.user_name}
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
            {profile.description}
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
        <Col>
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
            {profile.workplace}
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
            {profile.location}
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
            {profile.website}
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
            Born {formatDate(profile.birthdate)}
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
            Joined {formatDate(profile.joined_date)}
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
        <Col>
          <Text style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 15,
            marginRight: "5px",
            fontWeight: "bold"
          }}>
            {profile.following_count}
          </Text>
        </Col>
        <Col>
          <Text style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 15,
            marginRight: "15px",
            color: "#536471"
          }}>
            Following
          </Text>
        </Col>

        <Col>
          <Text style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 15,
            marginRight: "5px",
            fontWeight: "bold"
          }}>
            {profile.followers_count}
          </Text>
        </Col>
        <Col>
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
    </div>
  )
}

export default Bio;
