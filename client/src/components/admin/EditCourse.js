import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { searchUserAction } from '../../redux/action/userAction';
import axios from 'axios';
import UserBadge from '../miscellenious/UserBadge';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCourse } from '../../redux/action/courseAction';
import UploadWidget from '../miscellenious/UploadWidget';


const EditCourse = () => {
    const navigate = useNavigate()
    const { courseId } = useParams();
    const dispatch = useDispatch()

    const course = useSelector((state)=>state.courses.courses).course
    const [coursecode, setCoursecode] = useState('')
    const [coursename, setCoursename] = useState('')
    const [instructors, setInstructors] = useState('')
    const [students, setStudents] = useState('')
    const [courseImage, setCourseImage] = useState('')
    const [searchedinstructors, setSearchedinstructors] = useState([])
    const [searchedstudents, setSearchedstudents] = useState([])
    const [selectedStudents, setSelectedStudents] = useState([])
    const [selectedInstructors, setSelectedInstructors] = useState([])


    useEffect(() => {
      dispatch(fetchCourse(courseId))
    }, [])
    // console.log(course)

    const memoizedCourse = useMemo(()=>course,[course])

    useEffect(() => {
      if(memoizedCourse){
          setCoursecode(memoizedCourse.coursecode)
          setCoursename(memoizedCourse.coursename)
          setSelectedInstructors(memoizedCourse.instructors)
          setSelectedStudents(memoizedCourse.studentsEnrolled)
          setCourseImage(memoizedCourse.courseImage)
      }
    }, [memoizedCourse])
    
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
                // console.log("search", searchedstudents)
            } catch (error) {
                console.error('Error fetching searched users:', error);
                setSearchedstudents([]);
            }
        };
        userSearch();
    }, [students]);

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

    const editRequest=async(data)=>{
        const res =await axios.put(`http://localhost:5000/api/course/${courseId}/edit`, data)
        console.log(res)
    }

    const handleDeleteCourse =async()=>{
        await axios.delete(`http://localhost:5000/api/course/${courseId}`)
        navigate('/admin/manage-courses')
    }
    const media_url = (data) => {
        setCourseImage(data)
        console.log(data)
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

                        <div>
                            <label>Image:</label>
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
                        
                    </form>
                    <div className='d-flex justify-content-around'>
                        <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#ConfirmDelete">Delete Course</button>
                        <button className='btn btn-primary' onClick={() => navigate("/admin/manage-courses")}>Cancel</button>
                        <button className='btn btn-primary' onClick={() => editRequest({ coursecode: coursecode, coursename: coursename, courseImage: courseImage,  instructors: selectedInstructors, studentsEnrolled: selectedStudents })}>Save Changes</button>

                        <div class="modal fade" id="ConfirmDelete" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Delete Course?</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        Are you sure to delete {memoizedCourse?.coursecode} {memoizedCourse?.coursename} course?
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-primary" onClick={handleDeleteCourse} data-bs-dismiss="modal">Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default EditCourse