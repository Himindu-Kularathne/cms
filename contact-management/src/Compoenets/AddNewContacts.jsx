
import { Form, Input, Button, Select, InputNumber } from "antd";
import { DefaultLayout } from "../layouts/Default";

const { Option } = Select;

const AddContactForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Form Values: ", values);
    // Here you can handle form submission, e.g., send the data to an API or update state
  };

  return (
   <DefaultLayout >
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      style={{width: "80%", margin: "0 auto", padding: 24, background: "#fff", borderRadius: 8 }}
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
        name="age"
        label="Age"
        rules={[{ required: true, message: "Please enter your age" }]}
      >
        <InputNumber min={1} max={100} style={{ width: "100%" }} placeholder="Age" />
      </Form.Item>

      <Form.Item
        name="address"
        label="Address"
        rules={[{ required: true, message: "Please enter your address" }]}
      >
        <Input placeholder="Address" />
      </Form.Item>

      <Form.Item
        name="tags"
        label="Tags"
        rules={[{ required: true, message: "Please select a tag" }]}
      >
        <Select placeholder="Select a tag">
          <Option value="nice">Nice</Option>
          <Option value="developer">Developer</Option>
          <Option value="looser">Looser</Option>
          <Option value="cool">Cool</Option>
          <Option value="love">Love</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="phoneNumber"
        label="Phone Number"
        rules={[
          { required: true, message: "Please enter your phone number" },
          { pattern: /^\d{10}$/, message: "Please enter a valid phone number" }
        ]}
      >
        <Input placeholder="Phone Number" />
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

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Add Contact
        </Button>
      </Form.Item>
    </Form>
      </DefaultLayout>
  );
};

export default AddContactForm;
