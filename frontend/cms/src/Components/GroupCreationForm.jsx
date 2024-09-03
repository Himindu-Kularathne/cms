import React from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';

const { Option } = Select;

const CreateGroupForm = ({
  visible,
  onCancel,
  onCreate,
  form,
  onAddExistingContact,
  existingContacts,
}) => {
  return (
    <Modal
      title="Create New Group"
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={() => {
          const formValues = form.getFieldsValue();
          const result = {
            groupName: formValues.groupName,
            contacts: formValues.contacts,
          };
          console.log(result);
          onCreate(result);
        }}
      >
        <Form.Item
          label="Group Name"
          name="groupName"
          rules={[{ required: true, message: 'Please enter a group name!' }]}
        >
          <Input placeholder="Enter group name" />
        </Form.Item>
        <Form.Item
          label="Add Existing Contacts"
          name="contacts"
          rules={[{ required: true, message: 'Please select at least one contact!' }]}
        >
          <Select
            mode="multiple"
            placeholder="Select contacts to add"
            style={{ width: '100%', marginBottom: '10px' }}
          >
            
            {existingContacts.map((contact) => (
              <Option key={contact.id} value={contact.id}>
                {contact.name} - {contact.phone}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Click to Create Group">
          <Button type="primary" htmlType="submit">
            Create Group
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateGroupForm;
