import React, { useEffect, useState } from 'react';
import { Card, List, Button, Modal, Row, Col, Typography, Form, message, Select } from 'antd';
import CreateGroupForm from '../Components/GroupCreationForm';
import { DefaultLayout } from '../layouts/Default';

const { Title } = Typography;
const { Option } = Select;

// const initialContacts = [
//   { id: 1, name: 'John Doe', phone: '123-456-7890' },
//   { id: 2, name: 'Jane Doe', phone: '098-765-4321' },
//   { id: 3, name: 'Alice Smith', phone: '111-222-3333' },
//   { id: 4, name: 'Bob Johnson', phone: '444-555-6666' },
// ];




// const initialGroups = [
//   {
//     id: 1,
//     name: 'Family',
//     contacts: [initialContacts[0], initialContacts[1]],
//   },
//   {
//     id: 2,
//     name: 'Friends',
//     contacts: [initialContacts[2], initialContacts[3]],
//   },
// ];

const ContactGroups = () => {
  const [contactGroups, setContactGroups] = useState();
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCreateGroupModalVisible, setIsCreateGroupModalVisible] = useState(false);
  const [form] = Form.useForm();

  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: '', phone: '' });
  const [existingContacts] = useState(initialContacts);

  //fetch groups from backend
  const handledFetchContacts = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/contacts', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      console.log('Contacts fetched:', data);
      setContactGroups(data.contacts);
    } catch (error) {
      console.error('Contacts fetch failed:', error);
    }
  };

  useEffect(() => {
    handledFetchContacts();
  }, []);

  const showContacts = (group) => {
    setSelectedGroup(group);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showCreateGroupModal = () => {
    setIsCreateGroupModalVisible(true);
  };

  const handleCreateGroupCancel = () => {
    setIsCreateGroupModalVisible(false);
    form.resetFields();
    setContacts([]);
  };

  const handleCreateGroup = (values) => {
    const newGroup = {
      id: contactGroups.length + 1,
      name: values.groupName,
      contacts: contacts,
    };
    setContactGroups([...contactGroups, newGroup]);
    message.success(`Group "${values.groupName}" created successfully!`);
    setIsCreateGroupModalVisible(false);
    form.resetFields();
    setContacts([]);
  };

  const handleAddExistingContact = (value) => {
    const contactToAdd = existingContacts.find(contact => contact.id === value);
    if (contactToAdd && !contacts.some(contact => contact.id === contactToAdd.id)) {
      setContacts([...contacts, contactToAdd]);
    }
  };

  const handleAddNewContact = () => {
    if (newContact.name && newContact.phone) {
      const newContactWithId = { ...newContact, id: contacts.length + existingContacts.length + 1 };
      setContacts([...contacts, newContactWithId]);
      setNewContact({ name: '', phone: '' });
    } else {
      message.error('Please enter both contact name and phone number');
    }
  };

  return (
    <DefaultLayout>
    <div style={{ padding: '40px' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '40px' }}>
        Contact Groups
      </Title>
      <Button type="primary" onClick={showCreateGroupModal} style={{ marginBottom: '20px' }}>
        Create New Group
      </Button>
      <Row gutter={[16, 16]}>
        {contactGroups.map((group) => (
          <Col xs={24} sm={12} md={8} lg={6} key={group.id}>
            <Card
              hoverable
              title={group.name}
              bordered={false}
              actions={[<Button type="primary" onClick={() => showContacts(group)}>View Contacts</Button>]}
              style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
            >
              <p style={{ marginBottom: 0 }}>Number of contacts: {group.contacts.length}</p>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal
        title={`Contacts in ${selectedGroup?.name}`}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="close" onClick={handleCancel}>
            Close
          </Button>,
        ]}
      >
        <List
          dataSource={selectedGroup?.contacts}
          renderItem={(contact) => (
            <List.Item>
              <Typography.Text>{contact.name}</Typography.Text>
              <Typography.Text type="secondary">{contact.phone}</Typography.Text>
            </List.Item>
          )}
        />
      </Modal>
      
      <CreateGroupForm
        visible={isCreateGroupModalVisible}
        onCancel={handleCreateGroupCancel}
        onCreate={handleCreateGroup}
        form={form}
        contacts={contacts}
        onAddExistingContact={handleAddExistingContact}
        onAddNewContact={handleAddNewContact}
        newContact={newContact}
        setNewContact={setNewContact}
        existingContacts={existingContacts}
      />
    </div>
    </DefaultLayout>
  );
};

export default ContactGroups;
