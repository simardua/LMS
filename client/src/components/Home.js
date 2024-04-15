import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import "./home.css"
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllCoursesAction } from '../redux/action/courseAction'
import { fetchAnnouncements } from '../redux/action/announcementAction'

const Home = () => {
    const dispatch = useDispatch()
    const allCourses = useSelector((state) => state.courses.courses)
    const announcements = useSelector((state) => state.fetchAnnouncements.announcements).announcements
    useEffect(() => {
        dispatch(fetchAllCoursesAction)
        dispatch(fetchAnnouncements)
    }, [])
    const courses = allCourses.courses
    console.log(announcements)
    return (
        <>
            <div id='outer-main'>
                <div className='main'>
                    <div className='heading'>
                        <h1>Courses</h1>
                    </div>

                    <div className='d-flex flex-wrap' id='course-div' >
                        {courses && courses.length > 0 && courses.map((e) => (
                            <div className="card" style={{ width: '18rem', height: '250px' }} key={e._id}>
                                <div id='course-info' style={{ backgroundImage: `url(${e.courseImage})`, objectFit:"contain" }}>
                                    <p>Teacher: {e.instructors.length > 0 ? <>{e.instructors[0].firstname}</>:<></>} </p>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{e.coursecode} {e.coursename}</h5>
                                    <Link to={`/${e._id}/course`} className="btn" id='course-btn'>Course</Link>
                                </div>
                            </div>
                        ))}

                    </div>

                </div>

                <div>
                    <div id='announcements'>
                        <h4>Announcements</h4>

                        <ul>
                            {announcements && announcements.map((e) => {
                                return <li key={e._id}><p><i style={{ color: "gray", fontSize: "12px" }}>{e.createdAt}</i> {e.announcement}</p></li>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home