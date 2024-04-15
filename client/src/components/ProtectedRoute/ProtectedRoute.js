import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { userAction } from '../../redux/action/userAction';
import Loader from '../miscellenious/Loader';

const ProtectedRoute = (props) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user).user;
    const loading = useSelector((state) => state.user.isLoading);
    const { Component } = props;
    let userId = JSON.parse(localStorage.getItem('user'))._id;
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(userAction(userId));
    }, [dispatch]);

    useEffect(() => {
        if (user && user.accountType !== "Admin") {
            navigate('/');
        }
    }, [user, navigate]);

    return (
        <>
            {loading ? (
                <Loader/>
            ) : (
                <Component />
            )}
        </>
    );
};

export default ProtectedRoute;
