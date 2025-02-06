import "./loginpage.scss"
import {XOutlined} from "@ant-design/icons";
import Auth from "../components/auth/Auth.jsx";

const LoginPage = () => {
  return (
    <html lang="ru">
      <body className="login-page">
      <div className="login-page__content">
        <Auth/>
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
