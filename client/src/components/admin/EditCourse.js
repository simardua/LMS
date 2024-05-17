import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchUserAction } from '../../redux/action/userAction';
import axios from 'axios';
import UserBadge from '../miscellenious/UserBadge';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCourse } from '../../redux/action/courseAction';
import UploadWidget from '../miscellenious/UploadWidget';
import { message } from 'antd';
import Loader from '../miscellenious/Loader';
import './editCourse.css';

const EditCourse = () => {
    const navigate = useNavigate();
    const { courseId } = useParams();
    const dispatch = useDispatch();

    const course = useSelector((state) => state.courses.courses).course;
    const [coursecode, setCoursecode] = useState('');
    const [coursename, setCoursename] = useState('');
    const [instructors, setInstructors] = useState('');
    const [students, setStudents] = useState('');
    const [courseImage, setCourseImage] = useState('');
    const [searchedinstructors, setSearchedinstructors] = useState([]);
    const [searchedstudents, setSearchedstudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [selectedInstructors, setSelectedInstructors] = useState([]);

    const [loading, setloading] = useState(false);

    useEffect(() => {
        setloading(true);
        dispatch(fetchCourse(courseId));
        setloading(false);
    }, []);

    const memoizedCourse = useMemo(() => course, [course]);

    useEffect(() => {
        if (memoizedCourse) {
            setCoursecode(memoizedCourse.coursecode);
            setCoursename(memoizedCourse.coursename);
            setSelectedInstructors(memoizedCourse.instructors);
            setSelectedStudents(memoizedCourse.studentsEnrolled);
            setCourseImage(memoizedCourse.courseImage);
        }
    }, [memoizedCourse]);

    useEffect(() => {
        const userSearch = async () => {
            try {
                setloading(true);
                const response = await axios.get(`http://localhost:5000/api/user/?search=${instructors}`);
                const instructorSearchResults = response.data.users;
                setSearchedinstructors(instructorSearchResults.slice(0, 3));
                setloading(false);
            } catch (error) {
                console.error('Error fetching searched users:', error);
                message.error("Error searching courses");
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
            console.log(selectedInstructors)
        }
    }

    const handleAddStudent = (data) => {
        if (selectedStudents.includes(data)) {
            message.warning("already exist")
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

    const editRequest = async (data) => {
        setloading(true);
        const res = await axios.put(`http://localhost:5000/api/course/${courseId}/edit`, data);
        console.log(res);
        if (res.data.success) {
            message.success(res.data.success);
        } else {
            message.error(res.data.message);
        }
        setloading(false);
    }

    const handleDeleteCourse = async () => {
        await axios.delete(`http://localhost:5000/api/course/${courseId}`)
        navigate('/admin/manage-courses')
    }
    const media_url = (data) => {
        setCourseImage(data)
        console.log(data)
    }

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className="edit-course-container">
                    <h3>Edit Course</h3>
                    <div>
                        <form className='edit-course-form'>
                            <label>Course Code:</label>
                            <input type='text' value={coursecode} onChange={(e) => setCoursecode(e.target.value)} />

                            <label>Course Name:</label>
                            <input type='text' value={coursename} onChange={(e) => setCoursename(e.target.value)} />

                            <div className='upload-widget-container'>
                                <label>Image:</label>
                                <p>{courseImage}</p>
                                <UploadWidget func={media_url} />
                            </div>

                            <label>Instructors:</label>
                            <input type='text' value={instructors} onChange={(e) => setInstructors(e.target.value)} />
                            <div className='d-flex flex-wrap w-auto'>
                                {selectedInstructors.length > 0 ? (
                                    selectedInstructors.map((u) => (
                                        <UserBadge key={u._id} user={u.email} handleDelete={() => handleDeleteInstructors(u)} />
                                    ))
                                ) : null}
                            </div>

                            <div>
                                {instructors !== '' ? (
                                    searchedinstructors && searchedinstructors.length > 0 ? (
                                        searchedinstructors.map((e) => (
                                            <div key={e._id} className='user-badge-container'>
                                                <button type='button' onClick={() => handleAddInstructor(e)}>
                                                    <div>
                                                        <p>{e.firstname} {e.lastname}</p>
                                                        <p>{e.email}</p>
                                                    </div>
                                                </button>
                                            </div>
                                        ))
                                    ) : null
                                ) : null}
                            </div>

                            <label>Students:</label>
                            <input type='text' value={students} onChange={(e) => setStudents(e.target.value)} />
                            <div className='d-flex flex-wrap'>
                                {selectedStudents.length > 0 ? (
                                    selectedStudents.map((u) => (
                                        <UserBadge key={u._id} user={u.email} handleDelete={() => handleDeleteStudents(u)} />
                                    ))
                                ) : null}
                            </div>

                            <div>
                                {students !== '' ? (
                                    searchedstudents && searchedstudents.length > 0 ? (
                                        searchedstudents.map((e) => (
                                            <div key={e._id} className='user-badge-container'>
                                                <button type='button' onClick={() => handleAddStudent(e)}>
                                                    <div>
                                                        <p>{e.firstname} {e.lastname}</p>
                                                        <p>{e.email}</p>
                                                    </div>
                                                </button>
                                            </div>
                                        ))
                                    ) : null
                                ) : null}
                            </div>

                        </form>

                        <div className='d-flex justify-content-around'>
                            <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#ConfirmDelete">Delete Course</button>
                            <button className='btn btn-primary' onClick={() => navigate("/admin/manage-courses")}>Cancel</button>
                            <button className='btn btn-primary' onClick={() => editRequest({ coursecode: coursecode, coursename: coursename, courseImage: courseImage, instructors: selectedInstructors, studentsEnrolled: selectedStudents })}>Save Changes</button>

                            <div className="modal fade" id="ConfirmDelete" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Delete Course?</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            Are you sure to delete {memoizedCourse?.coursecode} {memoizedCourse?.coursename} course?
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="button" className="btn btn-primary" onClick={handleDeleteCourse} data-bs-dismiss="modal">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default EditCourse;
