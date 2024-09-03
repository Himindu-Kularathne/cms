import { useState ,useContext, useEffect} from 'react';
import '../styles/Login.css';
import { Modal, Form, Input, Button, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import UserForm from '../Components/UserForm';
import { UserContext } from '../context/UserContext';
function LoginPage() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const { setUser } = useContext(UserContext);
    const [messageApi, contextHolder] = message.useMessage();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    // const handledFetchUser = async () => {
    //     try {
    //         const response = await fetch('http://localhost:3001/api/users/me', {
    //             method: 'GET',
    //             headers: {
    //                 Authorization: `Bearer ${localStorage.getItem('token')}`,
    //             },
    //         });
    //         const data = await response.json();
    //         console.log('User fetched:', data);
    //         setUser(data);
    //     } catch (error) {
    //         console.error('User fetch failed:', error);
    //     }
    // };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setUser({token : token});
        }
    }, []);
    

    const handleLogin = async (values) => {
         console.log('Received values:', values);
         
        
        try {
            const response = await fetch('http://localhost:3001/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: values.email,
                    password: values.password,
                }),
            });
            const data = await response.json();
            console.log('Login successful:', data);
            
            localStorage.setItem('token', data.token);

            // handledFetchUser();

            //need to change the user up to this logic
            setUser(data);
            
          
        } catch (error) {
            console.error('Login failed:', error);
           
        }
    };

    return (
        <div className="login-container">
             {contextHolder}
            <div className="login-box">
                <div className="login-left">
                    <h2>LOGIN</h2>
                    <p>How to get started lorem ipsum dolor at?</p>
                    <Form
                        form={form}
                        name="loginForm"
                        onFinish={handleLogin}
                        layout="vertical"
                        className="login-form"
                    >
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Please enter your username!' }]}
                        >
                            <Input prefix={<MailOutlined />} placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please enter your password!' }]}
                        >
                            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-button">
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                    <Button type="link" onClick={showModal} className="signup-button">
                        Sign Up
                    </Button>
                </div>
                <div className="login-right">
                    <img
                        src="https://static.vecteezy.com/system/resources/previews/012/958/769/original/3d-alarm-clock-icon-purple-modern-watch-at-10-10-floating-isolated-on-transparent-time-management-time-keeping-concept-cartoon-icon-minimal-smooth-3d-rendering-png.png"
                        alt="Login Illustration"
                        className="login-image"
                    />
                </div>
            </div>

            <Modal
                title="Sign Up"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <UserForm />
            </Modal>
        </div>
    );
}

export default LoginPage;
