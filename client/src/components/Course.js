import React, { useEffect, useState, useSyncExternalStore } from 'react';
import "./course.css";
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourse } from '../redux/action/courseAction';
import firebase from 'firebase/compat/app';
import "firebase/compat/storage"
import UploadWidget from './miscellenious/UploadWidget';
import {message} from 'antd'
import Loader from './miscellenious/Loader'

const Course = () => {
    const { courseId } = useParams();
    const localUser = JSON.parse(localStorage.getItem('user'));

    const [loading, setloading] = useState(false)

    const dispatch = useDispatch();
    const course = useSelector((state) => state.courses.courses).course;
    useEffect(() => {
        setloading(true)
        dispatch(fetchCourse(courseId));
        setloading(false)
    }, [courseId]);
    const [formData, setFormData] = useState({
        heading: '',
        description: '',
        url: '',
        file: '',
        media: '',
        videoUrl:'',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        let uploadfile = e.target.files[0]
        if (uploadfile) {
            const storageRef = firebase.storage().ref()
            const fileRef = storageRef.child(uploadfile.name)
            fileRef.put(uploadfile).then((snapshot) => {
                snapshot.ref.getDownloadURL().then((downloadurl) => {
                    console.log("filelink", downloadurl)
                    setFormData(({
                        ...formData,
                        file: downloadurl
                    }))
                })
                message.success("upload success")
            })
        }
        else {
            alert("No file selected")
        }
    };

    const [openAccordion, setOpenAccordion] = useState(null);

    const handleAccordionClick = (index) => {
        setOpenAccordion(index === openAccordion ? null : index);
    };

    const handleCreateContent = async (e) => {
        e.preventDefault();
        setloading(true); // Corrected to camelCase for consistency
    
        try {
            await axios.post(`http://localhost:5000/api/content/${courseId}/add-content`, {
                heading: formData.heading,
                description: formData.description,
                URL: formData.url,
                file: formData.file,
                media: formData.media,
                videoUrl: extractVideoId(formData.videoUrl)
            });
    
            setFormData({
                heading: '',
                description: '',
                url: [],
                file: null,
                media: null,
                videoUrl: null
            });
    
        } catch (error) {
            console.error("There was an error creating the content!", error);
            // Optionally, provide user feedback here, such as:
            // alert("Failed to create content. Please try again.");
        } finally {
            setloading(false);
        }
    };
    
    const media_url = (data) => {
        setFormData(({
            ...formData,
            media: data
        }))
        console.log(data)
    }

    function extractVideoId(url) {
        // Regular expression to match YouTube video IDs
        var regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

        // Try to match the URL with the regular expression
        var match = url.match(regExp);

        // If a match is found, return the video ID, otherwise return null
        return match ? match[1] : null;
    }

    return (
        <>
        {loading? <>

        <Loader/>
        </>:<>
                {localUser.accountType === 'Admin' || localUser.accountType === 'Instructor' ? (
                    <>
                        <button
                            type='button'
                            className='btn bg-transparent'
                            style={{ margin: '5px' }}
                            data-bs-toggle='modal'
                            data-bs-target='#addContentModal'
                        >
                            + Add new content
                        </button>
                    </>
                ) : (
                    <></>
                )}
                <div className="modal fade" id="addContentModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Create a new content</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body" style={{ overflowX: "hidden" }}>
                                <form>
                                    <div>
                                        <label htmlFor="heading">Heading:</label>
                                        <input
                                            type="text"
                                            id="heading"
                                            name="heading"
                                            value={formData.heading}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="description">Description:</label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            style={{ width: "470px", height: "250px" }}
                                            value={formData.description}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="url">URL:</label>
                                        <input
                                            type="url"
                                            id="url"
                                            name="url"
                                            value={formData.url}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="file">File:</label>
                                        <input
                                            type="file"
                                            id="file"
                                            name="file"
                                            accept='.pdf'
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="media">media:</label>
                                        {/* <input
                                        type="file"
                                        id="media"
                                        name="media"
                                        accept='.jpg,.jpeg,.png,.mp4'
                                        onChange={handleChange}
                                    /> */}
                                        <p> {formData.media}</p>
                                        <UploadWidget func={media_url} />
                                    </div>
                                    <div>
                                        <label htmlFor='videoUrl'>Video Url:</label>
                                        <input
                                            type="url"
                                            id="videoUrl"
                                            name="videoUrl"
                                            value={formData.videoUrl}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary"  data-bs-dismiss="modal" aria-label="Close" onClick={handleCreateContent}>Create</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div id='course'>
                    <div>
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to={`/${courseId}/course`}>Contents</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={`/${courseId}/course/events`}>Events</Link>
                            </li>
                        </ul>
                    </div>

                    <div id='contents'>
                        {course?.courseContent.map((content, index) => (
                            <div className="accordion accordion-flush" id="accordionFlushExample" key={content._id}>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id={`heading${index}`}>
                                        <button className={`accordion-button ${openAccordion === index ? '' : 'collapsed'}`} type="button" onClick={() => handleAccordionClick(index)} aria-expanded={openAccordion === index} aria-controls={`collapse${index}`}>
                                            <h5>{content.heading}</h5>
                                        </button>
                                    </h2>
                                    <div id={`collapse${index}`} className={`accordion-collapse collapse ${openAccordion === index ? 'show' : ''}`} aria-labelledby={`heading${index}`} data-bs-parent="#accordionFlushExample">
                                        <div className="accordion-body" style={{ padding: "10px", backgroundColor: "#f5f5f5", borderRadius: "5px", marginBottom: "10px" }}>
                                            <p style={{ fontSize: "16px", color: "#333", marginBottom: "10px" }}>{content.description}</p>
                                            <a href={content.URL} style={{ textDecoration: "none", color: "#007bff", display: "block", marginBottom: "5px" }}>{content.URL}</a>
                                            {content.file?.includes('.pdf') ? <a href={content.file} style={{ textDecoration: "none", color: "#007bff", display: "block", marginBottom: "5px" }}>Pdf file</a> : null}
                                            {content.media !== '' ? <img src={content.media} style={{ height: "50px", width: "50px", borderRadius: "5px", marginBottom: "5px" }} /> : null}
                                            {content.videoUrl !== null ? <iframe width="560" height="315" src={`https://www.youtube.com/embed/${content.videoUrl}`} frameborder="0" allowfullscreen style={{ borderRadius: "5px" }}></iframe> : null}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
        </>}
           
        </>
    );
};

export default Course;
