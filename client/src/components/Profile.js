import React, { useEffect, useState } from 'react'
import './profile.css'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userAction } from '../redux/action/userAction';
import UploadWidget from './miscellenious/UploadWidget';
import axios from 'axios';

const Profile = () => {

    const id = JSON.parse(localStorage.getItem('user'))._id
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.user)
    useEffect(() => {
        dispatch(userAction(id))
    }, [])
    const [imgUrl, setImgUrl] = useState('')

    const initialFormData = {
        firstName: '',
        lastName: '',
        email: '',
        branch: ''
    };

    const [currentPass, setCurrentPass] = useState('')
    const [newPass, setNewPass] = useState('')
    const [confirmNewPass, setConfirmNewPass] = useState('')

    const img_upload=(data)=>{
        setImgUrl(data)
        console.log("igdsh",data)
    }
    
    const handleupload = async()=>{
        await axios.put(`http://localhost:5000/api/user/edit-picture/${id}`, { Img: imgUrl })
    }

    const deleteImage = async()=>{
        await axios.put(`http://localhost:5000/api/user/edit-picture/${id}`, { Img: null })
    }

    const changePass= async()=>{
        if (newPass===confirmNewPass) {
            await axios.put(`http://localhost:5000/api/user/change-password/${id}`, { currentPass: currentPass, newPass: newPass })   
        }
    }
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
    }, [user])


    return (
        <>
            <div>
                <div id='outer'>
                    <div id='left'>
                        <div id='picture' style={{ position: 'relative' }}>
                            <div style={{ position: 'absolute', top: 0, right: 0 }}>
                                <i className="fa-solid fa-pencil" style={{ cursor: 'pointer' }} data-bs-toggle="modal" data-bs-target="#imageModal"></i>

                                {/* Picture Modal */}
                                <div className="modal fade" id="imageModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Profile Picture</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                            </div>
                                            <div className="modal-body d-flex justify-content-around">
                                                <UploadWidget func={img_upload} /> <button type='button' className='btn btn-danger' onClick={deleteImage}>Delete</button>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="button" className="btn btn-primary" onClick={handleupload}>Save changes</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <img src={user.user?.userImg} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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

                            <Link data-bs-toggle="modal" data-bs-target="#changePasswordModal">Change Password</Link>
                            {/* Change Password Modal */}
                            <div className="modal fade" id="changePasswordModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Change Password</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                        </div>
                                        <div className="modal-body">
                                            <input type='text' placeholder='Current Password' onChange={(e)=>setCurrentPass(e.target.value)}/>
                                            <input type='text' placeholder='New Password' onChange={(e) => setNewPass(e.target.value)} />
                                            <input type='text' placeholder='Confirm New Password' onChange={(e) => setConfirmNewPass(e.target.value)} />
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="button" className="btn btn-primary" onClick={changePass}>Save changes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>

                    </div>

                </div>
                
            </div>
        </>
    )
}

export default Profile