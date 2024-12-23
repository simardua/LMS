import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { searchUserAction } from '../../redux/action/userAction';
import axios from 'axios';
import UserBadge from '../miscellenious/UserBadge';
import UploadWidget from '../miscellenious/UploadWidget';
import { message } from 'antd';
import Loader from '../miscellenious/Loader';
import './createCourse.css'


const CreateCourse = () => {
    const [coursecode, setCoursecode] = useState('')
    const [coursename, setCoursename] = useState('')
    const [instructors, setInstructors] = useState('')
    const [students, setStudents] = useState('')
    const [courseImage, setCourseImage] = useState('')
    const [searchedinstructors, setSearchedinstructors] = useState([])
    const [searchedstudents, setSearchedstudents] = useState([])
    const [selectedStudents, setSelectedStudents] = useState([])
    const [selectedInstructors, setSelectedInstructors] = useState([])
    const [loading, setloading] = useState(false)

    useEffect(() => {
        const userSearch = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/user/?search=${instructors}`);
                const instructorSearchResults = response.data.users;
                setSearchedinstructors(instructorSearchResults.slice(0, 3));
            } catch (error) {
                console.error('Error fetching searched users:', error);
                setSearchedinstructors([]);
            }
        };
        userSearch();
    }, [instructors]);

    useEffect(() => {
        const userSearch = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/user/?search=${students}`);
                const studentSearchResults = response.data.users;
                setSearchedstudents(studentSearchResults.slice(0, 3));
            } catch (error) {
                console.error('Error fetching searched users:', error);
                setSearchedstudents([]);
            }
        };
        userSearch();
    }, [students]);

    const handleAddInstructor = (data) => {
        if (selectedInstructors.includes(data)) {
            message.warning("already exist")
        } else {
            setSelectedInstructors([...selectedInstructors, data])
        }
    }

    const handleAddStudent = (data) => {
        if (selectedStudents.includes(data)) {
            message.warning("already exist")
        } else {
            setSelectedStudents([...selectedStudents, data])
        }
    }

    const handleDeleteInstructors = (user) => {
        setSelectedInstructors(selectedInstructors.filter((sel) => sel._id !== user._id))
    }

    const handleDeleteStudents = (user) => {
        setSelectedStudents(selectedStudents.filter((sel) => sel._id !== user._id))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setloading(true)
        const res = await axios.post("http://localhost:5000/api/course/create-course", { coursecode: coursecode, coursename: coursename, courseImage: courseImage, instructors: selectedInstructors, studentsEnrolled: selectedStudents })

        setloading(false)
        if (res.data.success) {
            message.success("Course Created Successfully")
        } else {
            message.error(res.data.message)
        }
    }

    const media_url = (data) => {
        setCourseImage(data)
    }

    return (
        <>
            {loading ? <><Loader /></> : <>

                <div className="createcourse-container">
                    <div>
                    <h3>Create a new course</h3>
                    </div>
                    
                    <div>
                        <form className='createcourse-form p-2'>
                            <label>Course Code:</label>
                            <input type='text' value={coursecode} onChange={(e) => setCoursecode(e.target.value)} />

                            <label>Course Name:</label>
                            <input type='text' value={coursename} onChange={(e) => setCoursename(e.target.value)} />
                            <div className="upload-widget-container">
                                <label>Course Image:</label>
                                <p>{courseImage}</p>
                                <UploadWidget func={media_url} />
                            </div>
                            <label>Instructors:</label>
                            <input type='text' value={instructors} onChange={(e) => setInstructors(e.target.value)} />
                            <div className='d-flex flex-wrap w-auto'>
                                {selectedInstructors.length > 0 ? <>
                                    {selectedInstructors.map((u) => (
                                        <UserBadge key={u._id} user={u.email} handleDelete={() => handleDeleteInstructors(u)} />
                                    ))}

                                </> : <></>}

                            </div>

                            <div>
                                {instructors !== '' ? <>
                                    {searchedinstructors && searchedinstructors.length > 0 && searchedinstructors.map((e) => (
                                        <div key={e._id} className="user-badge-container" style={{ border: "1px solid black", maxWidth: "70%", padding: "5px", margin: "5px" }}>
                                            <button type='button' style={{ width: "100%", padding: "0px", height: "auto", paddingTop: "5px" }} onClick={() => handleAddInstructor(e)}>
                                                <div >
                                                    <p>{e.firstname} {e.lastname}</p>
                                                    <p>{e.email}</p>
                                                </div>
                                            </button>
                                        </div>
                                    ))}
                                </> : <></>}
                            </div>

                            <label>Students:</label>
                            <input type='text' value={students} onChange={(e) => setStudents(e.target.value)} />
                            <div className='d-flex flex-wrap'>
                                {selectedStudents.length > 0 ? <>
                                    {selectedStudents.map((u) => (
                                        <UserBadge key={u._id} user={u.email} handleDelete={() => handleDeleteStudents(u)} />
                                    ))}

                                </> : <></>}

                            </div>
                            <div>
                                {students !== '' ? <>
                                    {searchedstudents && searchedstudents.length > 0 && searchedstudents.map((e) => (
                                        <div key={e._id} className="user-badge-container" style={{ border: "1px solid black", maxWidth: "70%", padding: "5px", margin: "5px" }}>
                                            <button type='button' style={{ width: "100%", padding: "0px", height: "auto", paddingTop: "5px" }} onClick={() => handleAddStudent(e)}>
                                                <div >
                                                    <p>{e.firstname} {e.lastname}</p>
                                                    <p>{e.email}</p>
                                                </div>
                                            </button>
                                        </div>
                                    ))}
                                </> : <></>}
                            </div>
                            <br />

                            <button type='button' onClick={handleSubmit} >Create</button>
                        </form>
                    </div>
                </div>
            </>}

        </>
    )
}

export default CreateCourse;
