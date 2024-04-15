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
    const [errors, setErrors] = useState({});
    const success = useSelector((state) => state.user.success);
    const error = useSelector((state) => state.user.error);

    const validateForm = () => {
        let errors = {};
        let isValid = true;

        if (!email.trim()) {
            errors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email is invalid';
            isValid = false;
        }

        if (!password.trim()) {
            errors.password = 'Password is required';
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
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
            <Toaster position='top-center' />
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
                        {errors.email && <span className="error">{errors.email}</span>}
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
                        {errors.password && <span className="error">{errors.password}</span>}
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </>
    );
};

export default Login;
