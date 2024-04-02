import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import "./home.css"
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllCoursesAction } from '../redux/action/courseAction'
import { fetchAnnouncements } from '../redux/action/announcementAction'

const Home = () => {
    const dispatch = useDispatch()
    const allCourses = useSelector((state) => state.courses.courses)
    const announcements = useSelector((state)=>state.fetchAnnouncements.announcements).announcements
    useEffect(() => {
        dispatch(fetchAllCoursesAction)
        dispatch(fetchAnnouncements)
    }, [])
    const courses = allCourses.courses
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
                                <div id='course-info'>
                                    <p>Teacher: {e.instructors[0].firstname}</p>
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
                        <p>The href attribute requires a valid value to be accessible. Provide a valid, navigable address as the href value. The href attribute requires a valid value to be accessible. Provide a valid, navigable address as the href value. If you cannot provide a valid href, but still need the element to resemble a link, use a button and change it with appropriate styles. Learn more: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/anchor-is-valid.md  jsx-a11y/anchor-is-valid
                            Line 33:17:  The href attribute requires a valid value to be accessible. Provide a valid, navigable address as the href value. If you cannot provide a valid href, but still need the element to resemble a link, use a button and change it with appropriate styles.</p>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Home