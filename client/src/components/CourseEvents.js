import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import axios from 'axios';
import firebase from 'firebase/compat/app';
import "firebase/compat/storage"
import { useSelector } from 'react-redux';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Loader from './miscellenious/Loader.js'

const CourseEvents = () => {
    const { courseId } = useParams();
    const user = useSelector((state) => state.user.user)
    const localUser = JSON.parse(localStorage.getItem('user'))
    console.log(localUser.accountType)
    const [attendance, setAttendance] = useState(null);

    const [eventName, setEventName] = useState('')
    const [eventDescription, setEventDescription] = useState('')
    const [startTime, setStartTime] = useState(null)
    const [deadLine, setDeadLine] = useState(null)

    const [submissionFile, setSubmissionFile] = useState('')
    const [comments, setComments] = useState('')
    const [events, setEvents] = useState([])
    const [selectedDocument, setSelectedDocument] = useState()
    const [documentSelected, setDocumentSelected] = useState(false)
    const [singleSubmission, setSingleSubmission] = useState(null)


    // events
    const createEvent = async (e) => {
        e.preventDefault();
        const payload = {
            eventName: eventName,
            eventDescription: eventDescription,
            startTime: startTime,
            deadLine: deadLine
        }
        console.log(payload)

        try {
            const { data } = await axios.post(`http://localhost:5000/api/event/${courseId}/create-event`, payload)
            console.log(data)

        } catch (error) {
            console.log(error.message)
        }
    };

    const fetchEvents = async () => {
        try {
            const { data } = await axios.post(`http://localhost:5000/api/event/${courseId}/get-event`)
            console.log(data)
            setEvents(data.events)
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleFileUpload = async (e) => {
        let uploadfile = e.target.files[0]
        if (!uploadfile || !uploadfile.type.includes('application/pdf') && !uploadfile.type.includes('application/msword') && !uploadfile.type.includes('application/vnd.openxmlformats-officedocument.wordprocessingml.document') && !uploadfile.type.includes('text/plain')) {
            alert(`Not a valid document file. Please select a PDF, DOC, DOCX, or TXT file.`);
            return;
        }
        setSelectedDocument(uploadfile);
        setDocumentSelected(true);
        if (uploadfile) {
            const storageRef = firebase.storage().ref()
            const fileRef = storageRef.child(uploadfile.name)
            fileRef.put(uploadfile).then((snapshot) => {
                snapshot.ref.getDownloadURL().then((downloadurl) => {
                    console.log("filelink", downloadurl)
                    setSubmissionFile(downloadurl)
                })
            })
        }
        else {
            alert("No file selected")
        }
    };

    const updatePost = async (id) => {
        try {
            const res = await axios.post(`http://localhost:5000/api/event/post/${id}`,
                { userId: localUser._id, file: submissionFile, comments: comments });
            console.log(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    const createAttendance = async (data) => {
        const response = await axios.post(`http://localhost:5000/api/attendance/${courseId}/create-attendance`, data)
    }

    const fetchUserSubmission = async (id) => {
        const response = await axios.post(`http://localhost:5000/api/event/user-submission/${id}`, { userId: localUser?._id })
        setSingleSubmission(response.data)
        console.log(singleSubmission)
    }

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
    };
    const getLocalDateString = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString("en-US", options); // Adjust options as needed for format
    };


    useEffect(() => {
        fetchEvents()
    }, [])

    return (
        <>
            {localUser.accountType === 'Admin' || localUser.accountType === 'Instructor' ? (
                <>
                    <button
                        type='button'
                        className='btn bg-transparent'
                        style={{ margin: '5px' }}
                        data-bs-toggle='modal'
                        data-bs-target='#createEventModal'
                    >
                        + create new event
                    </button>

                    <button
                        type='button'
                        className='btn bg-transparent'
                        style={{ margin: '5px' }}
                        data-bs-toggle='modal'
                        data-bs-target='#createAttendenceModal'
                    >
                        + create new attendence
                    </button>
                </>
            ) : (
                <></>
            )}

            <div class="modal fade" id="createEventModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Create a new event</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <label>
                                    Event Name:
                                    <input type="text" name="eventName" value={eventName} onChange={(e) => setEventName(e.target.value)} />
                                </label>
                                <label>
                                    Event Description:
                                    <textarea
                                        name="eventDescription"
                                        style={{ width: "470px", height: "250px" }}
                                        value={eventDescription}
                                        onChange={(e) => setEventDescription(e.target.value)}
                                    />
                                </label>
                                <label>
                                    Start Time:
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DateTimePicker']}>
                                            <DateTimePicker label="Start Time"
                                                value={startTime}
                                                onChange={(newValue) => setStartTime(newValue)} />
                                        </DemoContainer>
                                    </LocalizationProvider>

                                </label>
                                <label>
                                    Deadline:
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DateTimePicker']}>
                                            <DateTimePicker label="Dead Line"
                                                value={deadLine}
                                                onChange={(newValue) => setDeadLine(newValue)} />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </label>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onClick={createEvent}>Create</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="createAttendenceModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Create a new Attendence</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DateTimePicker']}>
                                    <DateTimePicker label="Attendance"
                                        value={attendance}
                                        onChange={(newValue) => setAttendance(newValue)} />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => createAttendance({ instructorId: localUser._id, date: attendance })}>Create</button>
                        </div>
                    </div>
                </div>
            </div>
            <div id='course'>
                <div>
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to={`/${courseId}/course`}>Contents</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link active" to={`/${courseId}/course/events`}>Events</Link>
                        </li>
                    </ul>
                </div>

                <div id='contents'>
                    <div className="accordion accordion-flush" id="accordionFlushExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="flush-headingOne">
                                <Link to={`/attendance/${courseId}`}>
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                        Attendence
                                    </button>
                                </Link>
                            </h2>
                        </div>
                        {events.length > 0 && (
                            events.map((item, index) => {
                                const collapseId = `flush-collapse-${index}`;
                                return (
                                    <div className="accordion-item" key={item._id}>
                                        <h2 className="accordion-header" id="flush-headingTwo">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#${collapseId}`} aria-expanded="false" aria-controls={collapseId} onClick={() => fetchUserSubmission(item?._id)}>
                                                {item?.eventName}
                                            </button>
                                        </h2>
                                        <div id={collapseId} className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                                            <div className="accordion-body">
                                                <div><p>{item?.eventDescription}</p></div>

                                                <h6><b>Created on:</b> {getLocalDateString(item?.startTime)}</h6>
                                                <h6><b>Deadline:</b> {getLocalDateString(item?.deadLine)}</h6>
                                                {singleSubmission && singleSubmission.success ? <>
                                                    <h6><b>Submitted File: </b><Link to={singleSubmission.submission.fileUrl}>file</Link></h6>
                                                    <h6><b>Submitted at: </b>{getLocalDateString(singleSubmission.submission.submittedOn)}</h6>
                                                    <h6><b>Marks: </b>{singleSubmission.submission.obtainedGrade ? <>{singleSubmission.submission.obtainedGrade}</> : <>not graded yet</>}</h6>
                                                    <p>Comments: {singleSubmission.submission.comments}</p>
                                                </> : <>
                                                    {localUser.accountType === 'Admin' || localUser.accountType === 'Instructor' ? <>
                                                        <Link to={`/events/${item?._id}`}>View submissions</Link>
                                                    </> : <>
                                                        <div>
                                                                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#submissionModal-${item._id}`}>
                                                                Add Submission
                                                            </button>
                                                            <p>No submission yet.</p>

                                                            {/* Modal */}
                                                                    <div className="modal fade" id={`submissionModal-${item._id}`} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                                        <div className="modal-dialog">
                                                                            <div className="modal-content">
                                                                                <div className="modal-header">
                                                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Add Submission</h1>
                                                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                                                                </div>
                                                                                <div className="modal-body">

                                                                                    <input
                                                                                        type="file"
                                                                                        accept=".pdf,.doc,.docx,.txt,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                                                                        name="document"
                                                                                        id={`file-${item._id}`}
                                                                                        style={{ display: 'none' }}
                                                                                        onChange={(e) => handleFileUpload(e, item._id)}
                                                                                    />
                                                                                    <p>
                                                                                        <label htmlFor={`file-${item._id}`}>Select a document</label>
                                                                                    </p>
                                                                                    {selectedDocument && <p>Selected document: {selectedDocument.name}</p>}


                                                                                    <label>
                                                                                        Comments:
                                                                                        <textarea
                                                                                            name="comments"
                                                                                            style={{ width: "470px", height: "250px" }}
                                                                                            value={comments}
                                                                                            onChange={(e) => setComments(e.target.value)}
                                                                                        />
                                                                                    </label>

                                                                                </div>
                                                                                <div className="modal-footer">
                                                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                                    <button type="button" className="btn btn-primary" onClick={() => updatePost(item._id)} >Save changes</button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                        </div>

                                                    </>}
                                                </>}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        )}

                    </div>
                </div>
            </div>
        </>
    )
}

export default CourseEvents