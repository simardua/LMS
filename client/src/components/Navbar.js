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
  const [property, setProperty] = useState('')
  const [searchedCourse, setSearchedCourse] = useState([])

  
  let handleSignout = () => {
    navigate('/')
    dispatch(signoutAction())
    user = null
  }

  useEffect(() => {
    const courseSearch = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/course/?search=${search}`);
        const courseSearchResults = response.data.courses.slice(0,3);
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
          <Link className="navbar-brand text-light" to="/"><img style={{height:"45px", marginLeft:"10px"}} src="/logo.png"/></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link text-light" aria-current="page" to="/">Home</Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link text-light" to="#">Dashboard</Link>
              </li> */}
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
      {search &&
      <div style={{ position: 'fixed', width: '450px', height: 'auto', right: "20px", background: "white", padding: "5px", marginLeft: "10px"}}>
        {search !== "" ?
          <div className="courses-div" style={{ padding: "15px", width: "100%", border: "1px solid #ccc", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {searchedCourse.length > 0 ? (
                searchedCourse.map(course => (
                  <li key={course._id} style={{ marginBottom: "10px", borderBottom: "1px solid #eee", transition: "background-color 0.3s" }}>
                    <Link to={`./${course._id}/course`} style={{ display: "flex", alignItems: "center", textDecoration: "none", color: "#333", ":hover": { backgroundColor: "#66317d" } }}>
                      <div style={{ flex: "1" }}>
                        <h5 style={{ margin: 0 }}>{course.coursecode} {course.coursename}</h5>
                      </div>
                      <div style={{ height: "50px", width: "85px", backgroundImage: `url(${course.courseImage})`, backgroundSize: "cover", marginLeft: "10px" }}>
                      </div>
                    </Link>
                  </li>
                ))
              ) : (
                <li>No course found</li>
              )}
            </ul>
          </div>
          : null}
      </div>
            }



    </>
  )
}

export default Navbar
