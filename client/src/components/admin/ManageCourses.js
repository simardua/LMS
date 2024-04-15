import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCoursesAction } from '../../redux/action/courseAction';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ManageCourses = () => {
  const dispatch = useDispatch()
  const courseData = useSelector((state) => state.courses.courses)
  const loading = useSelector((state) => state.courses.isLoading)

  const [search, setSearch] = useState('')
  const [searchedCourse, setSearchedCourse] = useState([])

  useEffect(() => {
    dispatch(fetchAllCoursesAction)
  }, [])

  const courses = courseData.courses
  console.log(courses)

  useEffect(() => {
    const courseSearch = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/course/?search=${search}`);
        const courseSearchResults = response.data.courses;
        setSearchedCourse(courseSearchResults);
        console.log("search", searchedCourse)
      } catch (error) {
        console.error('Error fetching searched courses:', error);
        setSearchedCourse([]); // Set to an empty array in case of an error
      }
    };
    courseSearch();
  }, [search]);

  return (
    <>
      <div id='main-manage'>
        <div id='search'>
          <input placeholder='search courses' onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div id='users-list'>
          {loading ? <>
            loading....
          </> : <>
            {search !== '' ? <> {searchedCourse.length < 1 ? <>No Course found</> : <>
              {searchedCourse && searchedCourse.length > 0 && searchedCourse.map((e) => (
                <div id='user' key={e._id}>
                  <div div='user-name'>
                    <h5>{e.coursecode} {e.coursename}</h5>
                    <p>{e.instructors?.length > 0 ? <>{e.instructors[0].firstname}</>:<></>}</p>
                  </div>
                  <div id='user-edit'>
                    <Link to={`/admin/manage-courses/${e._id}`}>edit</Link>
                  </div>
                </div>
              ))}
            </>}

            </> : <>
              {courses && courses.length > 0 && courses.map((e) => (
                <div id='user' key={e._id}>
                  <div div='user-name'>
                    <h5>{e.coursecode} {e.coursename}</h5>
                    <p>{e.instructors?.length > 0 ? <>{e.instructors[0].firstname}</> : <></>}</p>
                  </div>
                  <div id='user-edit'>
                    <Link to={`/admin/manage-courses/${e._id}`}>edit</Link>
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

export default ManageCourses