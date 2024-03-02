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
                    <Link to="/admin/create-course">Create a new course</Link>
                </div>
                <div>
                    <Link to="/admin/manage-courses">Manage Courses</Link>
                </div>

            </div>
        </>
    )
}

export default AdminScreen