import {Button, Checkbox, Divider, Flex, Form, Input, message, Modal, Typography} from 'antd';
import {CloseOutlined, LockOutlined, UserOutlined, XOutlined} from '@ant-design/icons';
import '../auth.scss';
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const {Title} = Typography;

const LoginModal = (props) => {
  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email: values.username,
        password: values.password,
      });

      // Если запрос успешен
      message.success("Успех!");
      localStorage.setItem('token', response.data.token);
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
                  message: 'Please input your Username!',
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
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
              <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
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
