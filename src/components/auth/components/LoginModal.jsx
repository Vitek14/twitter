import {Button, Checkbox, Divider, Flex, Form, Input, message, Modal, Typography} from 'antd';
import {CloseOutlined, LockOutlined, UserOutlined, XOutlined} from '@ant-design/icons';
import '../auth.scss';
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Api from "../../../api.js";
import {jwtDecode} from 'jwt-decode';

const {Title} = Typography;

const LoginModal = (props) => {
  const [browserName, setBrowserName] = useState('');
  const [ip, setIp] = useState('');

  useEffect(() => {
    // Получение названия браузера
    const userAgent = navigator.userAgent;
    let name = 'Unknown Browser';
    if (userAgent.includes('Firefox')) {
      name = 'Mozilla Firefox';
    } else if (userAgent.includes('Chrome')) {
      name = 'Google Chrome';
    } else if (userAgent.includes('Safari')) {
      name = 'Safari';
    } else if (userAgent.includes('Opera') || userAgent.includes('OPR')) {
      name = 'Opera';
    } else if (userAgent.includes('MSIE') || userAgent.includes('Trident')) {
      name = 'Internet Explorer';
    }
    setBrowserName(name);

    // Получение IP-адреса
    // fetch('https://api.ipify.org?format=json')
    //   .then(response => response.json())
    //   .then(data => setIp(data.ip))
    //   .catch(error => console.error('Error fetching the IP address:', error));
  }, []);

  console.log(`IP IS: ${ip}`)
  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await Api.Login.login({
        email: values.username,
        password: values.password,
      })
      // const response = await axios.post('http://localhost:5000/api/login', {
      //   email: values.username,
      //   password: values.password,
      // });

      // Если запрос успешен
      message.success("Успех!");
      // localStorage.setItem('token', response.data.token);
      // await Api.updateToken();
      // console.log(`DATA IS ${response.data}`);
      // console.log(token);

      // Декодирование токена
      const decodedToken = jwtDecode(response.data.token);
      console.log(`Decoded Token: `, decodedToken);
      console.log(`USER_ID = ${decodedToken.user_id}`);

      const login_info = await Api.LoginInfo.create_info({
        user_id: decodedToken.user_id,
        browser: browserName,
        ip: null
      });

      await Api.Notifications.create({
        user_id: decodedToken.user_id,
        type: "Login",
        parent_id: login_info.data.id,
      })
      navigate("/profile");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        message.error('Неправильное имя пользователя или пароль');
      } else {
        message.error('Произошла ошибка');
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Modal
      {...props}
      closeIcon={<CloseOutlined />}
      title={null} // Очищаем title, чтобы использовать картинку
      footer={null}
    >
      <div className="custom-header">
        <XOutlined className="modal-icon" />
      </div>
      {props.children}
      <div className="login-box">
        <div className="login-box__login-text">
          <Title>
            Вход в X
          </Title>
        </div>
        <div className="login-box__google-login">
          <Button shape={"round"} block={true} size={"large"} variant="filled" icon={<GoogleIcon/>}>
            Вход через аккаунт Google
          </Button>
        </div>
        <div className="login-box__apple-login">
          <Button shape={"round"} size={"large"} block={true} variant="filled" icon={<AppleIcon/>}>
            Войти с учетной записью Apple
          </Button>
        </div>
        <div className="login-box__divider">
          <Divider>
            или
          </Divider>
        </div>
        <div className="login-box__input">
          <Form
            name="login"
            initialValues={{
              remember: true,
            }}
            style={{
              maxWidth: 360,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
              ]}
            >
              <Input size="large" prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input size="large" prefix={<LockOutlined />} type="password" placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Flex justify="space-between" align="center">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <a href="">Forgot password</a>
              </Flex>
            </Form.Item>

            <Form.Item>
              <Button block type="primary" htmlType="submit">
                Log in
              </Button>
              or <a href="">Register now!</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;
