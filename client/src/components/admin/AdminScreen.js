import React from 'react'
import "./adminScreen.css"
import { Link } from 'react-router-dom'

const AdminScreen = () => {
    return (
        <>
            <div id='main-admin'>
                <div>
                    <Link to="/admin/createuser">Create a new user</Link>
                </div>
                <div>
                    <Link to="/admin/manageusers">Manage Users</Link>
                </div>
                <div>
                    <Link to="">Manage Courses</Link>
                </div>

            </div>
        </>
    )
}

export default AdminScreen