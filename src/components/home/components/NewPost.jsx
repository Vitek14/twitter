import {Avatar, Button, Col, Input, Row, Tooltip} from "antd";
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import GifIcon from '@mui/icons-material/Gif';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import PollOutlinedIcon from '@mui/icons-material/PollOutlined';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

const NewPost = (Props) => {
  const {profile_image} = Props;
  return (
    <div className="NewPost" style={{ border: "1px solid #ededed" }}>
      <Row style={{ margin: "10px" }}>
        <Col>
          <Avatar src={profile_image} size={{ lg: 30, xl: 40, xxl: 45, md: 35, sm: 20, xs: 35 }}/>
        </Col>
        <Col style={{ display: "flex", alignItems: "center" }}>
          <Input placeholder={"What is happening?!"} maxLength={50} variant={"borderless"}/>
        </Col>
      </Row>
      <Row style={{ margin: "10px", marginLeft: "60px" }}>
        <Col>
          <Tooltip title="Media" mouseEnterDelay={0.3} placement={"bottom"}>
            <Button type={"text"} shape="circle" icon={<CropOriginalIcon style={{ color: "#0ba4ff" }} />} />
          </Tooltip>
        </Col>
        <Col>
          <Tooltip title="GIF" mouseEnterDelay={0.3} placement={"bottom"}>
            <Button type={"text"} shape="circle" icon={<GifIcon style={{ color: "#0ba4ff" }} />} />
          </Tooltip>
        </Col>
        <Col>
          <Tooltip title="Generate Image" mouseEnterDelay={0.3} placement={"bottom"}>
            <Button type={"text"} shape="circle" icon={<AutoFixHighIcon style={{ color: "#0ba4ff" }} />} />
          </Tooltip>
        </Col>
        <Col>
          <Tooltip title="Poll" mouseEnterDelay={0.3} placement={"bottom"}>
            <Button type={"text"} shape="circle" icon={<PollOutlinedIcon style={{ color: "#0ba4ff" }} />} />
          </Tooltip>
        </Col>
        <Col>
          <Tooltip title="Emoji" mouseEnterDelay={0.3} placement={"bottom"}>
            <Button type={"text"} shape="circle" icon={<SentimentSatisfiedAltIcon style={{ color: "#0ba4ff" }} />} />
          </Tooltip>
        </Col>
        <Col>
          <Tooltip title="Schedule" mouseEnterDelay={0.3} placement={"bottom"}>
            <Button type={"text"} shape="circle" icon={<CalendarMonthIcon style={{ color: "#0ba4ff" }} />} />
          </Tooltip>
        </Col>
        <Col>
          <Tooltip title="Location" mouseEnterDelay={0.3} placement={"bottom"}>
            <Button type={"text"} shape="circle" icon={<LocationOnOutlinedIcon style={{ color: "#0ba4ff" }} />} />
          </Tooltip>
        </Col>
      </Row>
    </div>
  )
}

export default NewPost;
