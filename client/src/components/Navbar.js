import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signoutAction } from '../redux/action/userAction'
import { useDispatch } from 'react-redux'
import axios from 'axios'

const Navbar = () => {
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem("user"))
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [searchedCourse, setSearchedCourse] = useState([])
  const [showCourses, setShowCourses] = useState(false); // State to control visibility of courses div

  let handleSignout = () => {
    navigate('/')
    dispatch(signoutAction())
    user = null
  }

  useEffect(() => {
    const courseSearch = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/course/?search=${search}`);
        const courseSearchResults = response.data.courses;
        setSearchedCourse(courseSearchResults);
      } catch (error) {
        console.error('Error fetching searched courses:', error);
        setSearchedCourse([]); // Set to an empty array in case of an error
      }
    };
    courseSearch();
  }, [search]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#66317d" }}>
        <div className="container-fluid">
          <Link className="navbar-brand text-light" to="/">LMS</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link text-light" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="#">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/mycourses">My Courses</Link>
              </li>
              {user?.accountType === "Admin" &&
                <li className="nav-item">
                  <Link className="nav-link text-light" to="/admin">Admin</Link>
                </li>
              }
            </ul>
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={e => setSearch(e.target.value)} />
              <div>
                {user ? (
                  <li className="nav-item dropdown" style={{ listStyle: "none" }}>
                    <button className=" dropdown-toggle btn btn-outline-light" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      {user.firstname}
                    </button>
                    <ul className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown" >
                      <li><Link className="nav-link" to="/profile">Profile</Link></li>
                      <li><a className="dropdown-item" href="#">Another action</a></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><Link className="dropdown-item" onClick={handleSignout}>Sign out</Link></li>
                    </ul>
                  </li>
                ) : (
                  <Link id='login-btn' className="btn btn-outline-light" style={{ marginLeft: "5px" }} to="/login">Login</Link>
                )}
              </div>
            </form>
          </div>
        </div>
      </nav>

      {search !="" && // Render courses div if showCourses is true
        <div className="courses-div">
          <h3>Searched Courses</h3>
          <ul>
            {searchedCourse.map(course => (
              <li key={course.id}>{course.name}</li>
            ))}
          </ul>
        </div>
      }
    </>
  )
}

export default Navbar
