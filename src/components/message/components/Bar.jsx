import {Col, Row, Typography} from "antd";
import SettingsIcon from '@mui/icons-material/Settings';
import MessageIcon from '@mui/icons-material/Message';

const { Title } = Typography

const MessageBar = () => {
  return (
    <Row style={{ width: "100%" }}>
      <Col style={{ marginLeft: "21px", display: "flex", alignItems: "center" }}>
        <Title level={3} style={{ marginTop: "0px", fontFamily: "Segoe UI", marginBottom: "0px" }}>
          Messages
        </Title>
      </Col>
      <Col flex="auto"></Col>  {/* It is necessary to align the other elements on the right side */}
      <Col style={{ textAlign: "right", display: "flex", alignItems: "center", marginRight: "18px" }}>
        <SettingsIcon/>
      </Col>
      <Col style={{ display: "flex", alignItems: "center", marginRight: "18px" }}>
        <MessageIcon/>
      </Col>
    </Row>
  )
}

export default MessageBar;
