import { Layout } from "antd";
import ControlPanel from "../components/common_components/control_panel/ControlPanel.jsx";
import Home from "../components/home/Home.jsx";

const HomePage = () => {

  return (
    <>
        <Layout style={{ display: "flex", minHeight: '100vh' }}>
          <ControlPanel />
          <Home/>
        </Layout>
    </>
  )
}

export default HomePage;
