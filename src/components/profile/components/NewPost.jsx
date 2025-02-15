import {Avatar, Card, Image} from "antd";

<Card style={{ width: "100%", margin: "16px 0" }} bordered={true}>
      {/* Header section */}
      <Card.Meta
        avatar={
          <Avatar src={user.avatar_url}>
            {user.first_name[0].toUpperCase()}
          </Avatar>
        }
        title={
          <div>
            {/* Fullname and Nickname */}
            <Text style={{ fontSize: "16px", display: "block" }}>
              {`${user.first_name} ${user.last_name}`} <Text type="secondary">@{user.user_name}</Text>
            </Text>
          </div>
        }
        // description={<Text type="secondary">26.05.2006</Text>}
        style={{ marginBottom: "16px" }}
      />

      {/* Content */}
      {post.content && <Text>{post.content}</Text>}

      {/* Image (Optional, under the content) */}
      {post.image_url && (
        <div style={{ marginTop: "16px" }}>
          <Image
            src={post.image_url}
            alt="Post image"
            style={{ maxHeight: "300px", objectFit: "cover" }}
            // preview={false} // Disable full-size preview on click
          />
        </div>
      )}
    </Card>