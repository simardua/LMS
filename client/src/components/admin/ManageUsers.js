import React, { useEffect, useState } from 'react'
import "./manageUsers.css"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersAction } from '../../redux/action/userAction';
import axios from 'axios';
import Loader from '../miscellenious/Loader';


const ManageUsers = () => {
    const dispatch = useDispatch()
    const UsersData = useSelector((state) => state.allUser.users)
    const [search, setSearch] = useState('')
    const [searchedUser, setSearchedUser] = useState([])
    const [loading, setloading] = useState(false)
    useEffect(() => {
        setloading(true)
        dispatch(fetchUsersAction())
        setloading(false)
    }, [])
    console.log(UsersData)
    const users = UsersData.users
    // const users = UsersData ? UsersData.users : [];
    console.log(users);

    // console.log(users)

    useEffect(() => {
        const userSearch = async () => {
            try {
                setloading(true)
                const response = await axios.get(`http://localhost:5000/api/user/?search=${search}`);
                const userSearchResults = response.data.users;
                setSearchedUser(userSearchResults);
                setloading(false)
                console.log("search", searchedUser)
            } catch (error) {
                console.error('Error fetching searched users:', error);
                setSearchedUser([]); // Set to an empty array in case of an error
            }
        };

        userSearch();
    }, [search]);



    return (
        <>
            <div id='main-manage'>
                <div id='search'>
                    <input placeholder='search a user' onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div id='users-list'>
                    {loading ? <>
                        <Loader/>
                    </> : <>
                        {search !== '' ? <> {searchedUser.length < 1 ? <>No User found</> : <>
                            {searchedUser && searchedUser.length > 0 && searchedUser.map((e) => (
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
                        </>

                        }

                    </>}

                </div>
            </div>

        </>
    )
}

export default ManageUsers