import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import axios from 'axios';
import firebase from 'firebase/compat/app';
import "firebase/compat/storage"
import { useSelector } from 'react-redux';

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
                { userId: user?._id, file: submissionFile, comments: comments });
            console.log(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    const createAttendance = async (data) => {
        const response = await axios.post(`http://localhost:5000/api/attendance/${courseId}/create-attendance`, data)
    }




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
                                    <DateTimePicker
                                        name="startTime"
                                        onChange={setStartTime}
                                        value={startTime}
                                    />

                                </label>
                                <label>
                                    Deadline:
                                    <DateTimePicker name='deadLine' onChange={setDeadLine} value={deadLine} />
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
            <div class="modal fade" id="createAttendenceModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Create a new Attendence</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <DateTimePicker onChange={setAttendance} value={attendance} />
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onClick={() => createAttendance({ instructorId: localUser._id, date: attendance })}>Create</button>
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
                            <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion body.</div>
                            </div>
                        </div>
                        {events.length > 0 && (
                            events.map((item) => {
                                return (
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="flush-headingTwo">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                                {item?.eventName}
                                            </button>
                                        </h2>
                                        <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                                            <div className="accordion-body">
                                                <div><p>{item?.eventDescription}</p></div>

                                                <h6><b>Created on:</b> {item?.startTime}</h6>
                                                <h6><b>Deadline:</b> {item?.deadLine}</h6>



                                                <div>
                                                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#submissionModal">
                                                        Add Submission
                                                    </button>
                                                    <p>No submissions yet.</p>
                                                    {/* Modal */}
                                                    <div className="modal fade" id="submissionModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                                                        id="file"
                                                                        style={{ display: 'none' }}
                                                                        onChange={handleFileUpload}
                                                                    />
                                                                    <p>
                                                                        <label htmlFor="file">Select a document</label>
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
                                                                    <button type="button" className="btn btn-primary" onClick={() => updatePost(item?._id)} >Save changes</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

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