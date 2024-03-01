import React, { useEffect, useMemo, useState } from 'react'
import "./editUser.css"
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserAction, userAction } from '../../redux/action/userAction';
import axios from 'axios';

const EditUser = () => {
    const navigate= useNavigate()
    const { userId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userAction(userId));
    }, []);

    const user = useSelector((state) => state.user.user)?.user;
    const loading = useSelector((state) => state.user.isLoading);

    // useMemo to memoize user data
    const memoizedUser = useMemo(() => user, [user]);
   
    const editRequest = async (data) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/user/${userId}/edit`, data);
            // Handle success
            console.log(response.data);
        } catch (error) {
            // Handle error
            console.error(error);
        }
    };

        

    const [firstName, setFirstName] = useState(memoizedUser?.firstname || '');
    const [lastName, setLastName] = useState(memoizedUser?.lastname || '');
    const [email, setEmail] = useState(memoizedUser?.email || '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [branch, setBranch] = useState(memoizedUser?.branch || '');

    // Update form fields only when user data is available
    useEffect(() => {
        if (memoizedUser) {
            setFirstName(memoizedUser?.firstname || '');
            setLastName(memoizedUser?.lastname || '');
            setEmail(memoizedUser?.email || '');
            setBranch(memoizedUser?.branch || '');
        }
    }, [memoizedUser]);

    const deleteUser=()=>{
        dispatch(deleteUserAction(userId));
        navigate("/admin/manageusers")
    }

    return (
        <>
            <div>
                {loading ? <>
                    Loading...
                </> : user ? <>
                    <div>
                        <form className='edituser-form'>
                            <label>First Name:</label>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />

                            <label>Last Name:</label>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />

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

                            <label>Confirm Password:</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />

                            <label>Branch:</label>
                            <select
                                value={branch}
                                onChange={(e) => setBranch(e.target.value)}
                                required
                            >
                                <option value="" disabled>Select Branch</option>
                                <option value="computer-science">Computer Science</option>
                                <option value="electrical-engineering">Electrical Engineering</option>
                                <option value="mechanical-engineering">Mechanical Engineering</option>
                            </select>

                        </form>
                    </div>
                </> : <>
                    User not Found
                </>}

                <br />
                <div>
                    <h5>Manage Subjects</h5>

                    <div>

                    </div>
                </div>

                <div className='d-flex justify-content-around'>
                    <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#ConfirmDelete">Delete User</button>
                    <button className='btn btn-primary' onClick={()=>navigate("/admin/manageusers")}>Cancel</button>
                    <button className='btn btn-primary' onClick={()=>editRequest({firstname: firstName, lastname: lastName,email: email, branch: branch})}>Save Changes</button>

                    <div class="modal fade" id="ConfirmDelete" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Delete User?</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    Are you sure to delete {user?.email} user?
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary" onClick={deleteUser} data-bs-dismiss="modal">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default EditUser