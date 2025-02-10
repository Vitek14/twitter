import {Avatar, Col, Row} from "antd";
import {CheckCircleTwoTone, MoreOutlined} from "@ant-design/icons";
import {Layout, Typography} from "antd";
import {useEffect, useState} from "react";

const Text = Typography.Text;

const FallbackImage = ({ src, fallbackSrc, isAvatar, ...props }) => {
  const [imageUrl, setImageUrl] = useState(src || fallbackSrc);
  const [error, setError] = useState(false);

  useEffect(() => {
    setImageUrl(src || fallbackSrc);
    setError(false);
  }, [src, fallbackSrc]);

  const handleError = () => {
    setError(true);
    setImageUrl(fallbackSrc);
  };

  if (isAvatar) {
    return <Avatar size={40} src={imageUrl} onError={handleError} {...props} />;
  }

  return (
    <img
      src={imageUrl}
      onError={handleError}
      alt="Banner"
      style={{ width: "100%", height: "auto", ...props.style }}
    />
  );
};

const fallbackImageUrl =
    "../../../public/404_avatar.png";

const ProfileBar = ({profile}) => {
  return (
    <Row justify="space-between" gutter={[16, 16]}>
      <Col>
        <FallbackImage
          src={profile.avatar_url}
          fallbackSrc={fallbackImageUrl} // Используется отдельный URL для fallback баннера
          isAvatar={true}
          // style={{ width: "100%",objectFit: "cover" }}
          />
        {/*<Avatar size={40} src={profile.avatar_url}/>*/}
      </Col>
      <Col>
        <Text strong>
          {profile.first_name}
          {profile.last_name && " " + profile.last_name}
        </Text>
        {profile.verified && <CheckCircleTwoTone style={{ marginLeft: 4 }} />}
        <div style={{marginTop: '0px'}}>
          <Text style={{ color: "#536471" }}>@{profile.user_name}</Text>
        </div>
      </Col>
      <Col>
        <MoreOutlined style={{ fontSize: 20, marginTop: 10, marginLeft: 10 }}/>
      </Col>
    </Row>
  );
};

export default ProfileBar;
