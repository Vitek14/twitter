import React, {useEffect, useRef, useState} from "react";
import {Avatar, Button, Modal, Input, Divider, Tooltip, Flex} from "antd";
import "./modal.scss"
import CropOriginalIcon from "@mui/icons-material/CropOriginal";
import GifIcon from "@mui/icons-material/Gif";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Picker from "@emoji-mart/react";
import {useContext} from "react"
import data from "@emoji-mart/data";
import { ProfilePostsContext } from "../../../profile/ProfileContext.jsx"; // Путь к файлу с контекстом


const {TextArea} = Input;

const NewPostModal = ({ open, onClose}) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { profilePosts, setProfilePosts } = useContext(ProfilePostsContext); // Доступ к данным из контекста

  const [text, setText] = useState("");
  const handleEmojiSelect = (emoji) => {
    setText((prevText) => prevText + emoji.native);
  };

  const addPost = () => {
    console.log(`POSTS: ${profilePosts}`)
    const newPost = {
      id: profilePosts.length + 1,
      user_id: 2,
      content: "Test",
      // avatar_url:
    };

    setProfilePosts((prevPosts) => [newPost, ...prevPosts]);
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      onOk={onClose} // Если нужно, на onOk можно повесить другую логику
      footer={null}
      // content={"test"}
    >
      <div className="modal-content">
        <div className="modal-content__input">
          <div className="modal-content__input__avatar">
            <Avatar size={40}/>
          </div>
          <div className="modal-content__input__text">
            <TextArea
              placeholder="What's hapenning?!"
              size="large"
              autoSize={{ maxRows: 10 }}
              variant="borderless"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            {uploadedImage && (
              <img
                src={uploadedImage}
                alt="Uploaded"
                style={{ marginTop: '10px', maxWidth: '100%' }}
              />
            )}
          </div>
        </div>
        <div className="modal-content__can-reply">
          <Button>
            Everyone can reply
          </Button>
        </div>
        <div className="modal-content__divider">
          <Divider/>
        </div>
        <div className="modal-content__footer">
          <div className="modal-content__footer__helpers">
            <Tooltip title="Media" mouseEnterDelay={0.3} placement={"bottom"}>
              <Button type={"text"} shape="circle" icon={<CropOriginalIcon style={{color: "#0ba4ff"}}/>}>
                <input
                  type="file"
                  accept="image/*"
                  style={{opacity: 0, position: "absolute", width: '100%', height: '100%', cursor: 'pointer'}}
                  onChange={handleFileChange}
                />
              </Button>
            </Tooltip>
            <Tooltip title="GIF" mouseEnterDelay={0.3} placement={"bottom"}>
              <Button type={"text"} shape="circle" icon={<GifIcon style={{color: "#0ba4ff"}}/>}/>
            </Tooltip>
            <Tooltip title="Generate Image" mouseEnterDelay={0.3} placement={"bottom"}>
              <Button type={"text"} shape="circle" icon={<AutoFixHighIcon style={{ color: "#0ba4ff" }} />} />
            </Tooltip>
            <Tooltip title="Poll" mouseEnterDelay={0.3} placement={"bottom"}>
              <Button type={"text"} shape="circle" icon={<PollOutlinedIcon style={{ color: "#0ba4ff" }} />} />
            </Tooltip>
            <Tooltip title="Emoji" mouseEnterDelay={0.3} placement={"bottom"}>
              <Button
                type="text"
                shape="circle"
                icon={<SentimentSatisfiedAltIcon style={{ color: "#0ba4ff" }} />}
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              />
            </Tooltip>
            {showEmojiPicker && (
              <div style={{ position: "absolute", bottom: "60px", left: "20px", zIndex: 1000 }}>
                <Picker data={data} onEmojiSelect={handleEmojiSelect} navPosition="bottom"/>
              </div>
            )}
            <Tooltip title="Schedule" mouseEnterDelay={0.3} placement={"bottom"}>
              <Button type={"text"} shape="circle" icon={<CalendarMonthIcon style={{ color: "#0ba4ff" }} />} />
            </Tooltip>
            <Tooltip title="Location" mouseEnterDelay={0.3} placement={"bottom"}>
              <Button type={"text"} shape="circle" icon={<LocationOnOutlinedIcon style={{ color: "#0ba4ff" }} />} />
            </Tooltip>
          </div>
          <div className="modal-content__footer__post-button">
            <Button onClick={addPost}>
              Post
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default NewPostModal;
