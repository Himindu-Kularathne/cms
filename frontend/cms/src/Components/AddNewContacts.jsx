import { Form, Input, Button, Select, Space, Divider } from "antd";
import { DefaultLayout } from "../layouts/Default";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const AddContactForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {

    console.log("Received values:", values);
    //send data to the endpoint
    fetch("http://localhost:3001/api/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Contact added successfully:", data);
        form.resetFields();
      })
      .catch((error) => {
        console.error("Contact add failed:", error);
      });
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
                <div key={key} style={{ paddingBottom: 24 }}>
                  <Divider orientation="left">Contact</Divider>
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Form.Item
                      {...restField}
                      name={[name, "firstName"]}
                      fieldKey={[fieldKey, "firstName"]}
                      label="First Name"
                      rules={[{ required: true, message: "Please enter the first name" }]}
                      style={{ marginBottom: 16 }}
                    >
                      <Input placeholder="First Name" />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, "lastName"]}
                      fieldKey={[fieldKey, "lastName"]}
                      label="Last Name"
                      rules={[{ required: true, message: "Please enter the last name" }]}
                      style={{ marginBottom: 16 }}
                    >
                      <Input placeholder="Last Name" />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, "address"]}
                      fieldKey={[fieldKey, "address"]}
                      label="Address"
                      rules={[{ required: true, message: "Please enter the address" }]}
                      style={{ marginBottom: 16 }}
                    >
                      <Input placeholder="Address" />
                    </Form.Item>

                    <Form.List name={[name, 'phoneNumbers']}>
                      {(phoneFields, { add: addPhone, remove: removePhone }) => (
                        <>
                          {phoneFields.map(({ key: phoneKey, name: phoneName, fieldKey: phoneFieldKey, ...phoneRestField }) => (
                            <div key={phoneKey} style={{ paddingBottom: 16 }}>
                              <Space style={{ width: "100%", marginBottom: 8 }} align="baseline">
                                <Form.Item
                                  {...phoneRestField}
                                  name={[phoneName, 'phoneNumber']}
                                  fieldKey={[phoneFieldKey, 'phoneNumber']}
                                  label="Phone Number"
                                  rules={[
                                    { required: true, message: "Please enter the phone number" },
                                    { pattern: /^\d{10}$/, message: "Please enter a valid phone number" }
                                  ]}
                                >
                                  <Input placeholder="Phone Number" />
                                </Form.Item>

                                <MinusCircleOutlined
                                  onClick={() => removePhone(phoneName)}
                                  style={{ fontSize: 16, color: '#ff4d4f' }}
                                />
                              </Space>
                            </div>
                          ))}

                          <Form.Item>
                            <Button type="dashed" onClick={() => addPhone()} block icon={<PlusOutlined />}>
                              Add Phone Number
                            </Button>
                          </Form.Item>
                        </>
                      )}
                    </Form.List>

                    <Form.Item
                      {...restField}
                      name={[name, "email"]}
                      fieldKey={[fieldKey, "email"]}
                      label="Email"
                      rules={[
                        { required: true, message: "Please enter the email" },
                        { type: "email", message: "Please enter a valid email" },
                      ]}
                      style={{ marginBottom: 16 }}
                    >
                      <Input placeholder="Email" />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, "tags"]}
                      fieldKey={[fieldKey, "tags"]}
                      label="Tags"
                      rules={[{ required: true, message: "Please select at least one tag" }]}
                      style={{ marginBottom: 16 }}
                    >
                      <Select mode="multiple" placeholder="Select tags" style={{ width: '100%' }}>
                        <Option value="nice">Nice</Option>
                        <Option value="developer">Developer</Option>
                        <Option value="looser">Looser</Option>
                        <Option value="cool">Cool</Option>
                        <Option value="love">Love</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item>
                      <MinusCircleOutlined
                        onClick={() => remove(name)}
                        style={{ fontSize: 16, color: '#ff4d4f' }}
                      />
                    </Form.Item>
                  </Space>
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
