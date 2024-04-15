import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginAction } from '../redux/action/userAction';
import { Toaster, toast } from 'sonner';
import './login.css'

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    // const success = useSelector((state) => state.user.success);
    // const error = useSelector((state) => state.user.error);

    const handleSubmit = async (e) => {
        e.preventDefault();
            try {
                const res = await dispatch(loginAction({ email: email, password: password }));
                if (res.data.success) {
                    localStorage.setItem('user', JSON.stringify(res.data.user));
                    toast.success('Login successful!');
                    navigate('/');
                }
            } catch (err) {
                toast.error('Invalid credentials. Please try again.');
            }
        
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
      if(localStorage.getItem('user')){
        navigate('/')
      }
    }, [])
    
    return (
        <>
            <Toaster richColors position='bottom-right' />
            <div className="login-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <div className="password-input">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <i className={showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'} onClick={togglePasswordVisibility} />
                            
                        </div>
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </>
    );
};

export default Login;
