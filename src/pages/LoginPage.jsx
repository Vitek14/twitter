import "./loginpage.scss"
import {Typography, Button, ConfigProvider, Divider} from "antd";
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import {XOutlined} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const LoginPage = () => {
  return (
    <html lang="ru">
      <body className="login-page">
      <div className="login-page__content">
        <div className="content-containter">
          <div className="content-container__box">
            <div className="content-container__welcome-text">
              <Title>
                В курсе происходящего
              </Title>
            </div>
            <div className="content-container__login-text">
              <Title>
                Присоединяйтесь сегодня
              </Title>
            </div>
            {/* TODO: Надо сделать так, чтобы это всё делалось через ConfigProvider.
              Но тут проблема, что у нас же динамическая тема и надо как-то это менять
              */}
            <div className="content-container__buttons">
              <div className="content-container__google-login">
                <Button shape={"round"} block={true} size={"large"} variant="filled" icon={<GoogleIcon/>}>
                  Регистрация с помощью Google
                </Button>
              </div>
              <div className="content-container__apple-login">
                <Button shape={"round"} size={"large"} block={true} variant="filled" icon={<AppleIcon/>}>
                  Зарегистрироваться с Apple ID
                </Button>
              </div>
              <div className="content-container__divider">
                <Divider>
                  или
                </Divider>
              </div>
              <div className="content-container__sign-up">
                <div className="content-container__sign-up__button">
                  <Button shape={"round"} size={"large"} variant="filled" block={true}>
                    Зарегистрироваться
                  </Button>
                </div>
                <div className="content-container__sign-up__text">
                  <Paragraph>
                    Регистрируясь, вы продаёте свою душу дьяволу и соглашаетесь с Условиями предоставления услуг
                    и Политикой конфиденциальности.
                  </Paragraph>
                </div>
              </div>
              <div className="content-container__login">
                <div className="content-container__login-text">
                  <Title level={5}>
                    Уже зарегистрированы?
                  </Title>
                </div>
                <div className="content-container__login-button">
                  <Button shape={"round"} size={"large"} variant="filled" block={true}>
                    Войти
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="x-image-box">
          <div className="x-image-box__image">
            <XOutlined/>
          </div>
        </div>
      </div>
      </body>
    </html>
  )
}

export default LoginPage;
