import React, { useState } from 'react'
import './profile.css'
import { Link } from 'react-router-dom';

const Profile = () => {

    const initialFormData = {
        firstName: '',
        lastName:'',
        email: '',
        branch: ''
    };

    const [formData, setFormData] = useState(initialFormData);


    return (
        <>
            <div>
                <div id='outer'>
                    <div id='left'>
                        <div id='picture'>
                            <img src='https://unsplash.com/photos/woman-with-dslr-camera-e616t35Vbeg' style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </div>

                        <div id='name'>
                            <h1>Name</h1>
                            <p id='designation'>designation</p>
                        </div>

                    </div>

                    <div id='center'>
                        <form style={{ width: "100%" }}>

                            <label>
                                First Name:
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    disabled
                                />
                            </label>
                            <br />
                            <label>
                                Last Name:
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
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