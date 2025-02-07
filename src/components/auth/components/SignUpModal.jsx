import {DatePicker, Button, Form, Input, message, Modal, Typography} from "antd";
import {CloseOutlined, XOutlined} from "@ant-design/icons";
import "../auth.scss";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const {Title, Paragraph} = Typography;

const SignUpModal = (props) => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await axios.post('http://localhost:5000/api/sign_up/', {
        email: values.email,
        password: values.password,
        first_name: values.first_name,
        last_name: values.last_name,
        user_name: values.first_name + '_' + values.last_name,
      });

      // Если запрос успешен
      message.success("Секунду...");
      try {
        const response = await axios.post('http://localhost:5000/api/login', {
          email: values.email,
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
        <Form
          name="sign-up"
          initialValues={{
            remember: true,
          }}
          style={{
            maxWidth: 360,
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
            <Input placeholder="Имя" showCount maxLength={50}/>
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
            <Input placeholder="Фамилия" showCount maxLength={50}/>
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите ваш email!',
              },
            ]}
          >
            <Input placeholder="Почта" maxLength={50}/>
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
            <Input type="password" placeholder="Пароль" maxLength={64}/>
          </Form.Item>
          <div style={{ marginBottom: '8px' }}>
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
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Отправить
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}

export default SignUpModal;
