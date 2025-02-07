import {Button, Divider, Modal, Typography} from "antd";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import "../auth.scss"
import {useState} from "react";
import LoginModal from "./LoginModal.jsx";
import SignUpModal from "./SignUpModal.jsx";

const {Title, Paragraph} = Typography;

const AuthBlock = () => {
  const [loginModal, setLoginModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);

  return (
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
          <SignUpModal
            centered
            open={signUpModal}
            onOk={() => setSignUpModal(false)}
            onCancel={() => setSignUpModal(false)}
          />
          <Button shape={"round"} size={"large"} variant="filled" block={true}
          onClick={() => {
            setSignUpModal(true);
            setLoginModal(false);
          }}
          >
            Зарегистрироваться
          </Button>
        </div>
        <div className="content-container__sign-up__text">
          <Paragraph>
            Регистрируясь, вы продаёте свою кошко-жену и соглашаетесь с Условиями предоставления услуг
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
          <Button shape={"round"} size={"large"} variant="filled" block={true} onClick={() => {
            setLoginModal(true);
            setSignUpModal(false);
          }}>
            Войти
          </Button>
          <LoginModal
            centered
            open={loginModal}
            onOk={() => setLoginModal(false)}
            onCancel={() => setLoginModal(false)}
          />
        </div>
      </div>
    </div>
  )
}

export default AuthBlock;
