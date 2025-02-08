import {Tabs} from "antd";

const {TabPane} = Tabs;

const ContentTabs = () => {
  return (
    <div className="content-tabs" style={{ textAlign: 'center'}}>
      <Tabs
        defaultActiveKey="1"
        tabBarGutter={"5vw"}
        style={{
          display: 'inline-block',
          fontWeight: "bold",
        }}
      >
        <TabPane tab="Posts" key="1"/>
        <TabPane tab="Replies" key="2"/>
        <TabPane tab="Highlights" key="3"/>
        <TabPane tab="Media" key="4"/>
      </Tabs>
    </div>
  )
}

export default ContentTabs;
