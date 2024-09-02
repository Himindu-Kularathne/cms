import { useContext } from "react";
import { Avatar, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { UserContext } from "../context/UserContext";

const UserModelContent = () => {
  const { Title, Paragraph } = Typography;
  const { user } = useContext(UserContext);
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
  return (
    <div style={{ textAlign: "center" }}>
      <Avatar
        size={64}
        style={{ backgroundColor: "blue", marginBottom: 16 }}
        icon={<UserOutlined />}
      />
      <Title level={4}>{user.name}</Title>
      <Paragraph>Email: {user.email}</Paragraph>
      <Paragraph>Phone: {user.phone}</Paragraph>
    </div>
  );
};

export default UserModelContent;
