import React, { useState, useContext } from "react";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { MenuButtonContext, selectedKey, setSelectedKey } from "../context/MenuButtonContext";

const items = [
  {
    key: "1",
    icon: <PieChartOutlined />,
    label: "Dashboard",
  },
  {
    key: "2",
    icon: <DesktopOutlined />,
    label: "AllContacts",
  },
  {
    key: "3",
    icon: <ContainerOutlined />,
    label: "Add New Contact",
  },
  {
    key: "4",
    icon: <AppstoreOutlined />,
    label: "Settings",
  },
  {
    key: "5",
    icon: <MailOutlined />,
    label: "Logout",
  },
];

const MenuPage = () => {
  const { collapsed, selectedKey , setSelectedKey } = useContext(MenuButtonContext);
  

  // Function to handle menu item click
  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
    console.log("Clicked: ", e);
  };

  return (
    <div
      style={{
        width: 256,
      }}
    >
      <Menu
        selectedKeys={[selectedKey]} 
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
        items={items}
        onClick={handleMenuClick} 
      />
    </div>
  );
};

export default MenuPage;
