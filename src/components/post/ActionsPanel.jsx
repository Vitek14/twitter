import React from 'react';
import { Button, Dropdown, Menu } from 'antd';
import { RetweetOutlined } from '@ant-design/icons';
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ShareIcon from "@mui/icons-material/Share";
import EqualizerIcon from "@mui/icons-material/Equalizer";

const ActionsPanel = ({
  post,
  liked,
  onLike,
  onUnlike,
  isReposted,
  onRepost,
  onQuote,
  onUndoRepost,
  onComments,
}) => {
  return (
    <div style={{
      marginTop: "16px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}>
      <div style={{ display: "flex", gap: "8px" }}>
        <Button
          type="text"
          icon={<ChatBubbleOutlineIcon style={{ fontSize: "15px" }} />}
          style={{ color: "#1890ff" }}
          onClick={onComments}
        >
          {post.comments_count}
        </Button>
        {isReposted ? (
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="undoRepost" onClick={onUndoRepost}>
                  Undo Repost
                </Menu.Item>
              </Menu>
            }
            trigger={['click']}
          >
            <Button type="text" icon={<RetweetOutlined style={{ color: "#00d907" }} />} style={{ color: "#1890ff" }}>
              {post.reposts_count}
            </Button>
          </Dropdown>
        ) : (
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="repost" onClick={onRepost}>
                  Repost
                </Menu.Item>
                <Menu.Item key="quote" onClick={onQuote}>
                  Quote
                </Menu.Item>
              </Menu>
            }
            trigger={['click']}
          >
            <Button type="text" icon={<RetweetOutlined />} style={{ color: "#1890ff" }}>
              {post.reposts_count}
            </Button>
          </Dropdown>
        )}
        <Button
          type="text"
          icon={
            liked ? (
              <FavoriteIcon style={{ fontSize: "15px", color: "red" }} />
            ) : (
              <FavoriteBorderIcon style={{ fontSize: "15px" }} />
            )
          }
          style={{ color: "#1890ff" }}
          onClick={liked ? onUnlike : onLike}
        >
          {post.likes_count}
        </Button>
        <Button type="text" icon={<EqualizerIcon style={{ fontSize: "15px" }} />} style={{ color: "#1890ff" }}>
          {post.views_count}
        </Button>
      </div>
      <div style={{ display: "flex", gap: "8px", marginLeft: "auto" }}>
        <Button type="text" icon={<BookmarkBorderIcon style={{ fontSize: "15px" }} />} style={{ color: "#1890ff" }} />
        <Button type="text" icon={<ShareIcon style={{ fontSize: "15px" }} />} style={{ color: "#1890ff" }} />
      </div>
    </div>
  );
};

export default ActionsPanel;
