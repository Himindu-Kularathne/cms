import React, { useEffect, useState } from 'react';
import { Space, Table, Tag, Modal, Form } from 'antd';
import { DefaultLayout } from '../layouts/Default';
import ContactForm from '../components/ContactForm'; 

const { Column, ColumnGroup } = Table;

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentContact, setCurrentContact] = useState(null);
  const [form] = Form.useForm();

  const fetchContacts = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/contacts', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
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
      })
      .catch((error) => {
        console.error('Contact delete failed:', error);
      });
  };

  const handleEdit = (contact) => {
    setCurrentContact(contact);
    setIsModalVisible(true);
    form.setFieldsValue(contact); // Set form values with current contact data
  };

  const handleSendMail = (mail) => {
    window.open(`mailto:${mail}`);
  };

  const handleFormSubmit = (values) => {
    console.log('Form submitted:', values);
    // Handle form submission logic here
    setIsModalVisible(false);
  };

  return (
    <DefaultLayout>
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
              {tags.map((tag) => {
                let color = tag.length > 5 ? 'geekblue' : 'green';
                if (tag === 'loser') {
                  color = 'volcano';
                }
                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
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
