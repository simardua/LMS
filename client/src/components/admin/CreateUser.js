import React, { useEffect, useState } from 'react'
import "./createUser.css"
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { registerAction } from '../../redux/action/userAction';
import UserBadge from '../miscellenious/UserBadge';
import { searchCourse } from '../../redux/action/courseAction';
import { message } from 'antd';
import Loader from '../miscellenious/Loader';

const CreateUser = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [branch, setBranch] = useState('');
    const [accountType, setAccountType]= useState('')
    const dispatch= useDispatch()
    const [courses, setCourses]= useState('')
    const [selectedCourses, setSelectedCourses]=useState([])
    const [searchedCourses, setSearchedCourses]=useState([])
    const [loading, setloading] = useState(false)
    const success= useSelector((state)=>state.user.success)
    const error = useSelector((state)=>state.user.error)

    const coursesSearch=useSelector((state)=>state.searchedCourse.courses).courses

    useEffect(() => {
        const search =() => {
            dispatch(searchCourse(courses));
            setSearchedCourses(coursesSearch?.slice(0,3));
        };
        search();
    }, [courses]);
   

    const handleSubmit = async(e) => {
        if(password==confirmPassword){
            setloading(true)
            await dispatch(registerAction({ firstname: firstName, lastname: lastName, email: email, password: password, accountType: accountType, branch: branch, courses:selectedCourses }))
            if (success) {
                message.success(success)
            } else {
                message.error(error)
            }
            setloading(false)
        }
    };

    const handleDeleteCourse=(course)=>{
        const updatedCourses = selectedCourses.filter((c) => c._id !== course._id);
        setSelectedCourses(updatedCourses);
    }

    const handleAddCourse = (course) => {
        if (selectedCourses.includes(course)) {
            message.warning("already added")
        } else {
            setSelectedCourses([...selectedCourses, course]);
        }
    }

  return (
    <>
          {loading ? <>
          <Loader/>
          </> : <> 
          <div className="signup-container">
              <form className="signup-form">
                  <h2>Create a user</h2>

                  <label>First Name:</label>
                  <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                  />

                  <label>Last Name:</label>
                  <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                  />

                  <label>Email:</label>
                  <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                  />

                  <label>Password:</label>
                  <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                  />

                  <label>Confirm Password:</label>
                  <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                  />

                  <label>Account Type:</label>
                  <select
                      value={accountType}
                      onChange={(e) => setAccountType(e.target.value)}
                      required
                  >
                      <option value="" disabled>Select Account Type</option>
                      <option value="Admin">Admin</option>
                      <option value="Instructor">Instructor</option>
                      <option value="Student">Student</option>
                  </select>

                  <label>Branch:</label>
                  <select
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                      required
                  >
                      <option value="" disabled>Select Branch</option>
                      <option value="computer-science">Computer Science</option>
                      <option value="electrical-engineering">Electrical Engineering</option>
                      <option value="mechanical-engineering">Mechanical Engineering</option>
                  </select>

                  <label>Courses:</label>
                  <input type='text' value={courses} onChange={(e) => setCourses(e.target.value)} />
                  <div className='d-flex flex-wrap'>
                      {selectedCourses.length > 0 ? <>
                          {selectedCourses.map((u) => (
                              <UserBadge key={u._id} user={u.coursename} handleDelete={() => handleDeleteCourse(u)}/>
                          ))}

                      </> : <></>}

                  </div>
                  <div>
                      {courses !== '' ? <>
                          {searchedCourses && searchedCourses.length > 0 && searchedCourses.map((e) => (
                              <div key={e._id} style={{ border: "1px solid black", maxWidth: "70%", padding: "5px", margin: "5px" }}>
                                  <button type='button' style={{ width: "100%", padding: "0px", height: "auto", paddingTop:"5px" }} onClick={() => handleAddCourse(e)}>
                                      <div >
                                          <p>{e.coursecode} {e.coursename}</p>
                                      </div>
                                  </button>
                              </div>
                          ))}
                      </> : <></>}
                  </div>

                  <button onClick={handleSubmit} type="submit">Signup</button>
              </form>
          </div>
          </>}
         
          
    </>
  )
}

export default CreateUser