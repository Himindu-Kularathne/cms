import React from 'react';
import '../styles/Login.css';

function LoginPage() {
    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-left">
                    <h2>LOGIN</h2>
                    <p>How to get started lorem ipsum dolor at?</p>
                    <div className="input-container">
                        <input type="text" placeholder="Username" />
                        <input type="password" placeholder="Password" />
                    </div>
                    <button className="login-button">Login Now</button>
                    {/* <p className="login-with">Login with Others</p>
                    <div className="social-login">
                       
                    </div> */}
                </div>
                <div className="login-right">
                    <img 
                        src="https://static.vecteezy.com/system/resources/previews/012/958/769/original/3d-alarm-clock-icon-purple-modern-watch-at-10-10-floating-isolated-on-transparent-time-management-time-keeping-concept-cartoon-icon-minimal-smooth-3d-rendering-png.png"
                        alt="Login Illustration" 
                        className="login-image"
                    />
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
