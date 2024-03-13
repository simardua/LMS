import React, { useEffect, useState } from 'react'
import './profile.css'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userAction } from '../redux/action/userAction';

const Profile = () => {

    const id = JSON.parse(localStorage.getItem('user'))._id
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.user)
    useEffect(() => {
        dispatch(userAction(id))
    }, [])

    const initialFormData = {
        firstName: '',
        lastName: '',
        email: '',
        branch: ''
    };


    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.user?.firstname,
                lastName: user.user?.lastname,
                email: user.user?.email,
                branch: user.user?.branch
            })
        }
    }
        , [user])


    return (
        <>
            <div>
                <div id='outer'>
                    <div id='left'>
                        <div id='picture'>
                            <img src='https://unsplash.com/photos/woman-with-dslr-camera-e616t35Vbeg' style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </div>

                        <div id='name'>
                            <h1>{user.user?.firstname} {user.user?.lastname}</h1>
                            <p id='designation'>{user.user?.accountType}</p>
                        </div>

                    </div>

                    <div id='center'>
                        <form style={{ width: "100%" }}>

                            <label>
                                First Name:
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.firstName}
                                    disabled
                                />
                            </label>
                            <br />
                            <label>
                                Last Name:
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.lastName}
                                    disabled
                                />
                            </label>
                            <br />

                            <label>
                                Email:
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    disabled
                                />
                            </label>
                            <br />
                            <label>
                                Branch:
                                <input
                                    type="text"
                                    name="branch"
                                    value={formData.branch}
                                    disabled
                                />
                            </label>

                            <Link>Change Password</Link>
                        </form>

                    </div>

                </div>
            </div>
        </>
    )
}

export default Profile