import {Col, Row, Typography} from "antd";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const trends = [
  { key: '1', trendType: 'Trending', trendName: "Stripe", popularityCount: "4,377 posts" },
  { key: '2', trendType: 'Business & finance · Trending', trendName: "S&P 500", popularityCount: "4,555 posts" },
  { key: '3', trendType: 'Trending', trendName: "SaaS", popularityCount: "4,486 posts" },
  { key: '4', trendType: 'Technology · Trending', trendName: "Tailwind", popularityCount: "23.7K posts" },
  { key: '5', trendType: 'Trending', trendName: "Notion", popularityCount: "4,377 posts" },
  { key: '6', trendType: 'Technology · Trending', trendName: "#figma", popularityCount: "4,377 posts" }
];

const TrendsRecommendation = () => {
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
        Trends for you
      </Typography.Text>
      {trends.map((item) => (
        <Row key={item.key} style={{
          marginLeft: "21px",
          marginTop: "16px",
          marginBottom: "32px",
        }}>
        <Col>
          <Typography.Text style={{ fontSize: "17px" }}>
            <p style={{ margin: 0, lineHeight: 1, color: "#536471"}}>{item.trendType}</p>
            {/*<p style={{ color: "#536471", marginTop: 5,  lineHeight: 1}}>asdfsdfbh</p>*/}
          </Typography.Text>
          <Typography.Text style={{ fontSize: "20px" }}>
            <p style={{ fontWeight: "bold", marginTop: "7px", marginBottom: "7px", lineHeight: 1 }}>{item.trendName}</p>
            {/*<p style={{ color: "#536471", marginTop: 5,  lineHeight: 1}}>asdfsdfbh</p>*/}
          </Typography.Text>
          <Typography.Text style={{ fontSize: "17px" }}>
            <p style={{ margin: 0, lineHeight: 1, color: "#536471"}}>{item.popularityCount}</p>
            {/*<p style={{ color: "#536471", marginTop: 5,  lineHeight: 1}}>asdfsdfbh</p>*/}
          </Typography.Text>
        </Col>
        <Col style={{
          marginLeft: "auto",
          marginRight: "21px"
        }}>
          <MoreHorizIcon style={{
            color: "#536471",
          }}/>
        </Col>
      </Row>
      ))}
    </div>
  );
}

export default TrendsRecommendation;
