import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { userAction } from '../redux/action/userAction'
import { useDispatch, useSelector } from 'react-redux'

const MyCourses = () => {
    const id = JSON.parse(localStorage.getItem('user'))._id
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.user)
    useEffect(() => {
        dispatch(userAction(id))
    }, [])
    const myCourses= user.user?.courses
    console.log(myCourses)
    return (
        <>
            <div className='main'>
                <div className='heading'>
                    <h1>My Courses</h1>
                </div>

                <div className='d-flex flex-wrap' id='course-div' >
                    {myCourses && myCourses.length > 0 && myCourses.map((e) => (
                        <div className="card" style={{ width: '18rem', height: '250px' }} key={e._id}>
                            <div id='course-info'>
                                <p>Teacher: {e.instructors[0].firstname}</p>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{e.coursecode} {e.coursename}</h5>
                                <Link to="/course" className="btn" id='course-btn'>Course</Link>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </>
    )
}

export default MyCourses