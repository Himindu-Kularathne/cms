import React, { useEffect, useState } from 'react';
import { Space, Table, Tag, Modal, Form, message } from 'antd';
import { DefaultLayout } from '../layouts/Default';
import ContactForm from '../components/ContactForm'; 

const { Column, ColumnGroup } = Table;

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentContact, setCurrentContact] = useState(null);
  const [form] = Form.useForm();

  const [messageApi, contextHolder] = message.useMessage();

  const fetchContacts = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/contacts', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      console.log('Contacts fetched:', data);
      setContacts(data.contacts);
    } catch (error) {
      console.error('Contacts fetch failed:', error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/api/contacts/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        fetchContacts();
        messageApi.open({
          type: 'success',
          content: 'Contact is deleted successfully',
        });
      })
      .catch((error) => {
        console.error('Contact delete failed:', error);
      });
  };

  const handleEdit = (contact) => {
    setCurrentContact(contact);
    setIsModalVisible(true);
    form.setFieldsValue(contact); 
  };

  const handleSendMail = (mail) => {
    window.open(`mailto:${mail}`);
  };

  const handleFormSubmit = (values) => {
    console.log('Form submitted:', values);
    setIsModalVisible(false);
  };

  return (
    <DefaultLayout>
      {contextHolder}
      <Table dataSource={contacts}>
        <ColumnGroup title="Name">
          <Column title="First Name" dataIndex="first_name" key="first_name" />
          <Column title="Last Name" dataIndex="last_name" key="lastName" />
        </ColumnGroup>
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Address" dataIndex="address" key="address" />
        <Column
  title="Tags"
  dataIndex="tags"
  key="tags"
  render={(tags) => (
    <>
      {tags?.map((tag) => {
        if (tag) {  // Check if tag is not null or undefined
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        }
        return null; // Return null if tag is null or undefined
      })}
    </>
  )}
/>

        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <a onClick={() => handleEdit(record)}>Edit</a>
              <a onClick={() => handleSendMail(record.email)}>Send Mail</a>
              <a onClick={() => handleDelete(record.id)}>Delete</a>
            </Space>
          )}
        />
      </Table>

      <Modal
        title="Edit Contact"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <ContactForm form={form} onFinish={handleFormSubmit} initialValues={currentContact} />
      </Modal>
    </DefaultLayout>
  );
};

export default Contacts;
