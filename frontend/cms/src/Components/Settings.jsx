import React from 'react';
import { Form, Input, Switch, Button, Select } from 'antd';
import { DefaultLayout } from '../layouts/Default';

const { Option } = Select;

const Settings = () => {
  const handleFinish = (values) => {
    console.log('Settings updated:', values);
  };

  return (
   <DefaultLayout >
    <div style={{ padding: '20px', width: '80%', margin: 'auto' }}>
     
      <Form
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{
          notifications: true,
          theme: 'light',
        }}
      >
        {/* Name Setting */}
        <Form.Item
          label="Display Name"
          name="displayName"
          rules={[{ required: true, message: 'Please enter your display name!' }]}
        >
          <Input placeholder="Enter your display name" />
        </Form.Item>

        {/* Email Setting */}
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please enter your email!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        {/* Theme Setting */}
        <Form.Item label="Theme" name="theme">
          <Select>
            <Option value="light">Light</Option>
            <Option value="dark">Dark</Option>
          </Select>
        </Form.Item>

        {/* Notifications Setting */}
        <Form.Item
          label="Enable Notifications"
          name="notifications"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        {/* Password Setting */}
        <Form.Item
          label="Change Password"
          name="password"
          rules={[
            { required: true, message: 'Please enter your password!' },
            { min: 6, message: 'Password must be at least 6 characters!' },
          ]}
        >
          <Input.Password placeholder="Enter new password" />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Settings
          </Button>
        </Form.Item>
      </Form>
    </div>
      </DefaultLayout>
  );
};

export default Settings;
