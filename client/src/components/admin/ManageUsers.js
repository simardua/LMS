import React, { useEffect } from 'react'
import "./manageUsers.css"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersAction } from '../../redux/action/userAction';


const ManageUsers = () => {
    const dispatch = useDispatch()
    const UsersData = useSelector((state) => state.allUser.users)
    const loading = useSelector((state) => state.allUser.loading)
    useEffect(() => {
        dispatch(fetchUsersAction())
    }, [])
    console.log(UsersData)
    const users = UsersData.users
    console.log(users)

    return (
        <>
            <div id='main-manage'>
                <div id='search'>
                    <input placeholder='search a user' />
                </div>
                <div id='users-list'>
                    {loading ? <>
                        loading....
                    </> : <>
                        {users && users.length > 0 && users.map((e) => (
                            <div id='user' key={e._id}>
                                <div div='user-name'>
                                    <h5>{e.firstname} {e.lastname}</h5>
                                    <p>{e.email}</p>
                                </div>
                                <div id='user-edit'>
                                    <Link to={`/admin/manageUsers/${e._id}`}>edit</Link>
                                </div>
                            </div>
                        ))}

                    </>}

                </div>
            </div>

        </>
    )
}

export default ManageUsers