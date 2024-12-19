import {Tabs} from "antd";
const {TabPane} = Tabs;

const ContentTabs = () => {
  return (
    <Tabs
      defaultActiveKey="1"
      tabBarGutter={"15vw"}
    >
      <TabPane tab="For you" key="1">
      </TabPane>
      <TabPane tab="Following" key="2">
      </TabPane>
    </Tabs>
  )
}

export default ContentTabs;
