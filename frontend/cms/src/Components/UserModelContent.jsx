import { useContext, useEffect } from "react";
import { Avatar, Typography, Button, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { UserContext } from "../context/UserContext";
import { set } from "mongoose";


const UserModelContent = () => {
  const { Title, Paragraph } = Typography;
  const { user, setUser } = useContext(UserContext);
  const [messageApi, ContextHolder] = message.useMessage();
  

  console.log(user);

  const handledFetchUser = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/users", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      console.log("User fetched:", data);
      setUser(data);
    } catch (error) {
      console.error("User fetch failed:", error);
    }
  };

  useEffect(() => {
    handledFetchUser();
  }, []);

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem("token");
    setUser(null);
    alert("Logged out successfully");
    
  };

  return (
    <div style={{ textAlign: "center" }}>
      {ContextHolder}
      <Avatar
        size={64}
        style={{ backgroundColor: "blue", marginBottom: 16 }}
        icon={<UserOutlined />}
      />
      <Title level={4}>{user?.name || "Loading..."}</Title>
      <Paragraph>Email: {user?.email || "Loading..."}</Paragraph>
      <Paragraph>Phone: {user?.phone || "Loading..."}</Paragraph>

      <Button type="primary" danger onClick={handleLogout} style={{ marginTop: 16 }}>
        Logout
      </Button>
    </div>
  );
};

export default UserModelContent;
