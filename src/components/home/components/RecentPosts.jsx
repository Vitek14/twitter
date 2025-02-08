import {Button, Col, Row} from "antd";


const RecentPosts = () => {
  return (
    <div className="recent-posts">
      <Row justify="center" className="recent-posts__row">
        <Col>
          <Button type="link">
            Show 136 posts
          </Button>
        </Col>
      </Row>
    </div>
  )
}

export default RecentPosts;
