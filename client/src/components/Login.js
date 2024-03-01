import React, { useState } from 'react'
import "./login.css"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginAction } from '../redux/action/userAction';

const Login = () => {

    const dispatch= useDispatch()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    // const user = useSelector((state) => state.user.user)
    
    const handleSubmit = async(e) => {
        e.preventDefault()
        const res = await dispatch(loginAction({ email: email, password: password }));
        console.log(res)
        if (res.data.success) {
            localStorage.setItem('user', JSON.stringify(res.data.user))
            navigate('/')
        }
    };

    return (
        <div className="login-container">
            <form className="login-form">
                <h2>Login</h2>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button onClick={handleSubmit}>Login</button>
            </form>
        </div>
    );
};


export default Login