import {Tabs} from "antd";

const ContentTabs = () => {
  return (
    <Tabs
      defaultActiveKey="1"
      tabBarGutter={300}
    >
      <TabPane tab="For you" key="1">
      </TabPane>
      <TabPane tab="Following" key="2">
      </TabPane>
    </Tabs>
  )
}

