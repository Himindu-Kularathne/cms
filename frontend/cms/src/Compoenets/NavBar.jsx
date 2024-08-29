import React, { useState } from 'react';
import { MenuOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, Avatar, Button, Modal, Typography } from 'antd';
import { MenuButtonContext } from '../context/MenuButtonContext';
import UserModelContent from './UserModelContent';

const { Header } = Layout;
const { Title, Paragraph } = Typography;

const Navbar = () => {
  const { toggleCollapsed } = React.useContext(MenuButtonContext);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'white',
          borderBottom: '1px solid #f0f0f0',
        }}
      >
        {/* Left: Menu Button */}
        <Button type="primary" icon={<MenuOutlined />} onClick={toggleCollapsed} />

        {/* Center: Navbar Title or Brand */}
        <div
          style={{
            color: '#007BFF',
            fontFamily: 'Arial, sans-serif',
            fontSize: '24px',
          }}
        >
          Contact Management System
        </div>

        {/* Right: Profile Icon */}
        <Avatar
          style={{ backgroundColor: '#007BFF', cursor: 'pointer' }}
          icon={<UserOutlined />}
          onClick={showModal}
        />
      </Header>

      {/* Profile Modal */}
      <Modal
        title="User Profile"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="close" onClick={handleCancel}>
            Close
          </Button>,
        ]}
      >
        <UserModelContent />
      </Modal>
    </>
  );
};

export default Navbar;
