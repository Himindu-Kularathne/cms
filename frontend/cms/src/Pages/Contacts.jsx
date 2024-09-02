import { Space, Table, Tag } from 'antd';
import { DefaultLayout } from '../layouts/Default';
import { useEffect, useState } from 'react';

const { Column, ColumnGroup } = Table;

const Contacts = () => {
  const [contacts, setContacts] = useState([]);

  // Fetch data from the backend and display it in the table
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
      console.log('Contacts fetched:', contacts);
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
        console.log('Contact deleted:', data);
        fetchContacts();
      })
      .catch((error) => {
        console.error('Contact delete failed:', error);
      });
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
              <a onClick={() => handleDelete(record.id)}>Delete</a>
            </Space>
          )}
        />
      </Table>
    </DefaultLayout>
  );
};

export default Contacts;
