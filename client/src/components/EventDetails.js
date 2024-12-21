import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EventDetails = () => {
    const params = useParams();
    const [event, setEvent] = useState(null);
    const [submissions, setSubmissions] = useState([]);
    const [userNames, setUserNames] = useState([]);
    const [marks, setMarks] = useState([]);
    const [startDate,setStartDate]=useState();

    const getEventData = async () => {
        try {
            const { data } = await axios.post(`http://localhost:5000/api/event/getEvent/${params.eventId}`);
            setEvent(data.event);
            const submissionsWithGrades = data.event.submissions.map(submission => {
                return { ...submission, obtainedGrade: null }; // Add obtainedGrade property
            });
            setSubmissions(submissionsWithGrades);
            // console.log(data.event)
            setStartDate(data.event.deadLine)

            // Fetch user data for all submissions
            const userNamesPromises = data.event.submissions.map(submission => getUserData(submission.userId));
            const userNames = await Promise.all(userNamesPromises);
            setUserNames(userNames);

            // Initialize marks state with default values
            const defaultMarks = data.event.submissions.map(submission => submission.obtainedGrade || '');
            setMarks(defaultMarks);
        } catch (error) {
            console.log(error.message);
        }
    };

    const getUserData = async (userId) => {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/user/${userId}`);
            return data.user.firstname;
        } catch (error) {
            console.log(error.message);
            return ''; // Return a default value in case of error
        }
    };

    const handleMarkChange = (index, value) => {
        const updatedMarks = [...marks];
        updatedMarks[index] = value;
        setMarks(updatedMarks);
    };

    const logMarks = () => {
        const updatedSubmissions = submissions.map((submission, index) => {
            return { ...submission, obtainedGrade: marks[index] };
        });
        setSubmissions(updatedSubmissions);

        // Update backend with new obtained grades
        updateObtainedGrades(updatedSubmissions);
        console.log(updatedSubmissions)
    };

    const updateObtainedGrades = async (updatedSubmissions) => {
        try {
            const {data}=await axios.post(`http://localhost:5000/api/event/updateEventSubmissions/${params.eventId}`, { submissions: updatedSubmissions });
            console.log('Obtained grades updated successfully');
            console.log(data)
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        getEventData();
    }, [params.eventId]);

    return (
        <div>
            {event && (
                <div>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">File</th>
                                <th scope="col">Submitted On</th>
                                <th scope="col">Late By</th>
                             
                                <th scope="col">Marks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {submissions.map((item, index) => (
                                <tr key={index}>
                        <td>{userNames[index]}</td>
                        <td><a href={item?.fileUrl} target='_blank' rel='noopener noreferrer'>File</a></td>

                        {
                            (() => {
                            // Parsing the dates
                            const startDateString = new Date(startDate); // Replace startDateString with your actual startDate value
                            const submittedOn = new Date(item.submittedOn);

                            // Check the date and return the appropriate cell
                            if (startDateString >= submittedOn) {
                                return <td style={{ color: 'green' }}>{submittedOn.toLocaleDateString()}</td>;
                            } else {
                                return <td style={{ color: 'red' }}>{submittedOn.toLocaleDateString()}</td>;
                            }
                            })()
                        }

                        {
                            (() => {
                            // Parsing the dates
                            const startDateString = new Date(startDate); // Replace startDateString with your actual startDate value
                            const submittedOn = new Date(item.submittedOn);

                            // Calculating the difference in time
                            const timeDifference = submittedOn - startDateString;

                            // Converting time difference from milliseconds to days
                            const dayDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

                            // Displaying the difference in days
                            if (dayDifference >= 0) {
                                return <td style={{ color: 'red' }}>{dayDifference} days</td>;
                            } else {
                                return <td style={{ color: 'green' }}>0 days</td>;
                            }
                            })()
                        }

                        <td>
                            <input
                            type="number"
                            value={marks[index]}
                            onChange={(e) => handleMarkChange(index, e.target.value)}
                            />
                        </td>
                        </tr>

                              
                            ))}
                        </tbody>
                    </table>
                    <button onClick={logMarks}>Log Marks</button>
                </div>
            )}
        </div>
    );
};

export default EventDetails;
