import React, { useContext } from 'react';   
import { Avatar, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { UserProvider } from '../context/UserContext';

const UserModelContent = () => {
   const { Title, Paragraph } = Typography
   const { user } = useContext(UserProvider);
   return(
   <div style={{ textAlign: 'center' }}>
          <Avatar
            size={64}
            style={{ backgroundColor: 'blue', marginBottom: 16 }}
            icon={<UserOutlined />}
          />
          <Title level={4}>{user.name}</Title>
          <Paragraph>Email: {user.email}</Paragraph>
          <Paragraph>Phone: {user.phone}</Paragraph>
   </div>)
};

export default UserModelContent;