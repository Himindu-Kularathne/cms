// import React from 'react';
import { Form, Input, Button } from 'antd';
import { MailOutlined, LockOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';


const UserForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
   //call api to save user data
   
   fetch('http://localhost:3001/api/users', {
         method: 'POST',
         headers: {
               'Content-Type': 'application/json',
         },
         body: JSON.stringify(values),
      })
      .then((response) => response.json())
      .then((data) => {
         console.log('Success:', data);
      })
      .catch((error) => {
         console.error('Error:', error);
      });
  };

  const validatePassword = (_, value) => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
    if (value && !passwordRegex.test(value)) {
      return Promise.reject(new Error('Password must contain at least 8 characters, including digits and symbols.'));
    }
    return Promise.resolve();
  };

  const validateConfirmPassword = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('The two passwords do not match!'));
    },
  });

  return (
    <Form
      form={form}
      name="userForm"
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: 'Please enter your name!' }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Enter your name" />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: 'Please enter your email!' },
          { type: 'email', message: 'Please enter a valid email!' },
        ]}
      >
        <Input prefix={<MailOutlined />} placeholder="Enter your email" />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone"
        rules={[
          { required: true, message: 'Please enter your phone number!' },
          { pattern: /^[0-9]+$/, message: 'Phone number must only contain digits!' },
        ]}
      >
        <Input prefix={<PhoneOutlined />} placeholder="Enter your phone number" />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          { required: true, message: 'Please enter your password!' },
          { validator: validatePassword },
        ]}
        hasFeedback
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Enter your password" />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        label="Confirm Password"
        dependencies={['password']}
        rules={[
          { required: true, message: 'Please confirm your password!' },
          validateConfirmPassword,
        ]}
        hasFeedback
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Confirm your password" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserForm;
