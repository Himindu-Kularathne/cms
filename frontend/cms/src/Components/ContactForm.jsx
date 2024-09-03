import { Form, Input, Select, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import '../styles/ContactGroups.css';

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
        name="first_name"
        label="First Name"
        rules={[{ required: true, message: "Please enter your first name" }]}
      >
        <Input placeholder="First Name" />
      </Form.Item>

      <Form.Item
        name="last_name"
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

      <Form.List name="phones">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name]}
                  fieldKey={[fieldKey]}
                  rules={[{ required: true, message: 'Please enter a phone number' }]}
                >
                  <Input placeholder="Phone Number" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add Phone Number
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

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
