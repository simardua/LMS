import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCoursesAction } from '../../redux/action/courseAction';
import { Link } from 'react-router-dom';

const ManageCourses = () => {
  const dispatch= useDispatch()
  const courseData= useSelector((state)=>state.courses.courses)

  useEffect(() => {
    dispatch(fetchAllCoursesAction)
  }, [])

  const courses= courseData.courses
  console.log(courses)
  
  return (
    <>
      {courses && courses.length > 0 && courses.map((e) => (
        <div id='user' key={e._id}>
          <div div='user-name'>
            <h5>{e.coursecode} {e.coursename}</h5>
            <p>{e.instructors[0].firstname}</p>
          </div>
          <div id='user-edit'>
            <Link to={`/admin/manageUsers/${e._id}`}>edit</Link>
          </div>
        </div>
      ))}
    </>
    
  )
}

export default ManageCourses