import {Typography} from "antd";
import "../auth.scss"

const {Title} = Typography;

const AboutText = () => {
  return (
    <div className="content-container__about-text">
      <div className="content-container__about-text__welcome-text">
        <Title>
          В курсе происходящего
        </Title>
      </div>
      <div className="content-container__about-text__login-text">
        <Title>
          Присоединяйтесь сегодня
        </Title>
      </div>
    </div>
  )
}

export default AboutText;
