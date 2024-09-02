// src/components/ContactForm.js

import { Form, Input, Select, Button } from 'antd';

const { Option } = Select;

const ContactForm = ({ form, onFinish, initialValues }) => {
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={initialValues}
      style={{ width: "100%" }}
    >
      <Form.Item
        name="firstName"
        label="First Name"
        rules={[{ required: true, message: "Please enter your first name" }]}
      >
        <Input placeholder="First Name" />
      </Form.Item>

      <Form.Item
        name="lastName"
        label="Last Name"
        rules={[{ required: true, message: "Please enter your last name" }]}
      >
        <Input placeholder="Last Name" />
      </Form.Item>

      <Form.Item
        name="address"
        label="Address"
        rules={[{ required: true, message: "Please enter your address" }]}
      >
        <Input placeholder="Address" />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: "Please enter your email" },
          { type: "email", message: "Please enter a valid email" },
        ]}
      >
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item
        name="tags"
        label="Tags"
        rules={[{ required: true, message: "Please select a tag" }]}
      >
        <Select mode="multiple" placeholder="Select tags">
          <Option value="nice">Nice</Option>
          <Option value="developer">Developer</Option>
          <Option value="cool">Cool</Option>
          <Option value="love">Love</Option>
          <Option value="loser">Loser</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ContactForm;
