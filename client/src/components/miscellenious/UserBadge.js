import React from 'react'

const UserBadge = ({user, handleDelete}) => {
    return (
        <div >
            <span class="badge bg-primary" style={{ width: "auto", height:"40px", margin:"5px" }}>{user}<button style={{backgroundColor:"transparent", width:"fit-content"}} onClick={handleDelete}>x</button></span>
        </div>
    )
}

export default UserBadge
