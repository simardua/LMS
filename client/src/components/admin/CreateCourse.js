import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { searchUserAction } from '../../redux/action/userAction';
import axios from 'axios';
import UserBadge from '../miscellenious/UserBadge';


const CreateCourse = () => {
    // const dispatch = useDispatch()
    // const searchedUser = useSelector((state) => state.searchedUser.user)
    // const loading = useSelector((state) => state.searchedUser.loading)
    const [coursecode, setCoursecode] = useState('')
    const [coursename, setCoursename] = useState('')
    const [instructors, setInstructors] = useState('')
    const [students, setStudents] = useState('')
    const [searchedinstructors, setSearchedinstructors] = useState([])
    const [searchedstudents, setSearchedstudents] = useState([])
    const [selectedStudents, setSelectedStudents] = useState([])
    const [selectedInstructors, setSelectedInstructors] = useState([])

    useEffect(() => {
        const userSearch = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/user/?search=${instructors}`);
                const instructorSearchResults = response.data.users;
                setSearchedinstructors(instructorSearchResults.slice(0, 3));
                console.log("search", searchedinstructors)
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
                console.log("search", searchedstudents)
            } catch (error) {
                console.error('Error fetching searched users:', error);
                setSearchedstudents([]);
            }
        };
        userSearch();
    }, [students]);


    // useEffect(() => {
    //     const res = dispatch(searchUserAction(instructors))
    //     // setSearchedinstructors(res)
    //     console.log("redux",res)
    // }, [instructors])

    const handleAddInstructor = (data) => {
        if (selectedInstructors.includes(data)) {
            console.log("already exist")
        } else {
            setSelectedInstructors([...selectedInstructors, data])
            console.log(selectedInstructors)
        }
    }

    const handleAddStudent = (data) => {
        if (selectedStudents.includes(data)) {
            console.log("already exist")
        } else {
            setSelectedStudents([...selectedStudents, data])
            console.log(selectedStudents)
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
        const res = await axios.post("http://localhost:5000/api/course/create-course", { coursecode: coursecode, coursename: coursename, instructors: selectedInstructors, studentsEnrolled: selectedStudents })
        console.log(res)
    }
    return (
        <>
            <div>
                <h3>Create a new course</h3>
                <div>
                    <form className='p-2'>
                        <label>Course Code:</label>
                        <input type='text' value={coursecode} onChange={(e) => setCoursecode(e.target.value)} />

                        <label>Course Name:</label>
                        <input type='text' value={coursename} onChange={(e) => setCoursename(e.target.value)} />

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
                                    <div key={e._id} style={{ border: "1px solid black", maxWidth: "20%", padding: "5px", margin: "5px" }}>
                                        <button type='button' style={{ width: "100%", padding: "0px", height: "auto" }} onClick={() => handleAddInstructor(e)}>
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
                                    <div key={e._id} style={{ border: "1px solid black", maxWidth: "20%", padding: "5px", margin: "5px" }}>
                                        <button type='button' style={{ width: "100%", padding: "0px", height: "auto" }} onClick={() => handleAddStudent(e)}>
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
        </>
    )
}

export default CreateCourse