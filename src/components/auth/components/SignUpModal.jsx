import {DatePicker, Button, Form, Input, message, Modal, Typography} from "antd";
import {CloseOutlined, XOutlined} from "@ant-design/icons";
import "../auth.scss";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Api from "../../../api.js";

const {Title, Paragraph} = Typography;

const SignUpModal = (props) => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await Api.Login.sign_up({
        email: values.email,
        password: values.password,
        first_name: values.first_name,
        last_name: values.last_name,
        user_name: values.first_name + '_' + values.last_name,
      })

      // Если запрос успешен
      message.success("Секунду...");
      try {
        const response = await Api.Login.login({
          email: values.email,
          password: values.password,
        })

        // Если запрос успешен
        message.success("Успех!");
        // localStorage.setItem('token', response.data.token);
        // await Api.updateToken();
        navigate("/profile");
      } catch (error) {
        if (error.response && error.response.status === 400) {
          message.error('Неправильное имя пользователя или пароль');
        } else {
          message.error('Произошла ошибка');
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        message.error('Пользователь с такой почтой уже существует (ノ_<、)');
      } else {
        message.error('Произошла ошибка');
      }
    }
  };

  return (
    <Modal
      {...props}
      width={600}
      closeIcon={<CloseOutlined />}
      title={null} // Очищаем title, чтобы использовать картинку
      footer={null}
    >
      <div className="custom-header">
        <XOutlined className="modal-icon" />
      </div>
      <div className="sign-up-box">
        <div className="sign-up-box__text">
          <Title level={2}>
            Создайте учетную запись
          </Title>
        </div>
        <div className="sign-up-box__form">
          <Form
            name="sign-up"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="first_name"
              rules={[
                {
                  required: true,
                  message: 'Пожалуйста, введите ваше имя!',
                },
              ]}
            >
              <Input size="large" placeholder="Имя" showCount maxLength={50}/>
            </Form.Item>
            <Form.Item
              name="last_name"
              rules={[
                {
                  required: true,
                  message: 'Пожалуйста, введите вашу фамилию!',
                },
              ]}
            >
              <Input size="large" placeholder="Фамилия" showCount maxLength={50}/>
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Пожалуйста, введите правильный email!',
                  type: "email"
                },
              ]}
            >
              <Input size="large" placeholder="Почта" maxLength={50}/>
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Пожалуйста, введите пароль!',
                },
              ]}
            >
              <Input size="large" type="password" placeholder="Пароль" maxLength={64}/>
            </Form.Item>
            <div className="sign-up-box__date-text">
              <Title level={5}>Дата рождения</Title>
              <Paragraph>
                Эта информация не будет общедоступной. Подтвердите свой возраст,
                даже если эта учетная запись предназначена для компании, домашнего животного и т. д.
              </Paragraph>
            </div>
            <Form.Item
              name="birthdate"
              rules={[
                {
                  required: true,
                  message: 'Пожалуйста, выберите дату рождения!',
                },
              ]}
            >
              <DatePicker size="large" style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item>
              <Button block  size="large" type="primary" htmlType="submit">
                Создать учетную запись
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Modal>
  );
}

export default SignUpModal;
