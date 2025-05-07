import { type AuthProps } from '@refinedev/antd';
import { Button, Checkbox, Flex, Form, Input } from 'antd';
import { Link } from 'react-router';
import { FinefoodsLogoIcon, FinefoodsLogoText } from '../../components';
import { useLogin } from '@refinedev/core';

const authWrapperProps = {
  style: {
    background:
      "radial-gradient(50% 50% at 50% 50%,rgba(255, 255, 255, 0) 0%,rgba(0, 0, 0, 0.5) 100%),url('images/login-bg.png')",
    backgroundSize: 'cover',
  },
};

const renderAuthContent = (content: React.ReactNode) => {
  return (
    <div
      style={{
        maxWidth: 408,
      }}
    >
      <Link to="/">
        <Flex
          align="center"
          justify="center"
          gap={12}
          style={{
            marginBottom: 16,
          }}
        >
          <FinefoodsLogoIcon
            style={{
              width: 64,
              height: 64,
              color: '#fff',
            }}
          />
          <FinefoodsLogoText
            style={{
              color: '#fff',
              width: '300px',
              height: 'auto',
            }}
          />
        </Flex>
      </Link>
      {content}
    </div>
  );
};

type LoginVariables = {
  email: string;
  password: string;
};

export const AuthPage: React.FC<AuthProps> = ({ type, formProps }) => {
  const { mutate: login } = useLogin<LoginVariables>();
  const onFinish = (values: any) => {
    console.log('Success:', values);
    login({
      email: 'mail@gmail.com',
      password: '234',
    });
  };

  const onFinishFailed = async (errorInfo: any) => {};
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
      }}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{
          minWidth: 600,
          margin: 'auto',
        }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
