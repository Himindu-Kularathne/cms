import { Form, Input, Button, Select, Space } from "antd";
import { DefaultLayout } from "../layouts/Default";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const AddContactForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Form Values: ", values);
    // Handle form submission, e.g., send the data to an API or update state
  };

  return (
    <DefaultLayout>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{
          width: "80%",
          margin: "0 auto",
          padding: 24,
          background: "#fff",
          borderRadius: 8,
        }}
      >
        <Form.List name="contacts">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <div key={key} style={{ borderBottom: "1px solid #e8e8e8", paddingBottom: 16, marginBottom: 16 }}>
                  <Space key={key} style={{ display: "flex", marginBottom: 8 }} align="start">
                    <Form.Item
                      {...restField}
                      name={[name, "firstName"]}
                      fieldKey={[fieldKey, "firstName"]}
                      label="First Name"
                      rules={[{ required: true, message: "Please enter the first name" }]}
                    >
                      <Input placeholder="First Name" />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, "lastName"]}
                      fieldKey={[fieldKey, "lastName"]}
                      label="Last Name"
                      rules={[{ required: true, message: "Please enter the last name" }]}
                    >
                      <Input placeholder="Last Name" />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, "address"]}
                      fieldKey={[fieldKey, "address"]}
                      label="Address"
                      rules={[{ required: true, message: "Please enter the address" }]}
                    >
                      <Input placeholder="Address" />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, "phoneNumber"]}
                      fieldKey={[fieldKey, "phoneNumber"]}
                      label="Phone Number"
                      rules={[
                        { required: true, message: "Please enter the phone number" },
                        { pattern: /^\d{10}$/, message: "Please enter a valid phone number" }
                      ]}
                    >
                      <Input placeholder="Phone Number" />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, "email"]}
                      fieldKey={[fieldKey, "email"]}
                      label="Email"
                      rules={[
                        { required: true, message: "Please enter the email" },
                        { type: "email", message: "Please enter a valid email" },
                      ]}
                    >
                      <Input placeholder="Email" />
                    </Form.Item>

                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>

                  <Form.Item
                    {...restField}
                    name={[name, "tags"]}
                    fieldKey={[fieldKey, "tags"]}
                    label="Tags"
                    rules={[{ required: true, message: "Please select at least one tag" }]}
                  >
                    <Select mode="multiple" placeholder="Select tags">
                      <Option value="nice">Nice</Option>
                      <Option value="developer">Developer</Option>
                      <Option value="looser">Looser</Option>
                      <Option value="cool">Cool</Option>
                      <Option value="love">Love</Option>
                    </Select>
                  </Form.Item>
                </div>
              ))}

              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add Another Contact
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Add Contacts
          </Button>
        </Form.Item>
      </Form>
    </DefaultLayout>
  );
};

export default AddContactForm;
