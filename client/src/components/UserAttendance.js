import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UserAttendance = () => {
    const params = useParams();
    const [data, setData] = useState(null);

    const userAttendance = async () => {
        try {
            const res = await axios.post(`http://localhost:5000/api/attendance/getUsers/${params?.courseId}/${params?.date}`);
            // Sort the data array alphabetically based on students' names
            const sortedData = res.data.data.sort((a, b) => (a.firstname + ' ' + a.lastname).localeCompare(b.firstname + ' ' + b.lastname));
            setData(sortedData);
            console.log(sortedData);
        } catch (error) {
            console.log(error.message);
        }
    };

    const updateAttendance = async (userId, attendanceId, courseId) => {
        try {
            const res = await axios.post(`http://localhost:5000/api/attendance/updateAttendance/${courseId}/${userId}/${attendanceId}`);
            console.log(res.data);
            // Update display data after updating attendance
            userAttendance();
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        userAttendance();
    }, [params.courseId, params.date]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh' }}>
            <table style={{ borderCollapse: 'collapse', width: '70%' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Name</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Date</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Status</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Change</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((stud, index) => (
                        <tr key={index}>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{stud?.firstname} {stud?.lastname}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{stud?.date}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{stud?.isPresent ? "Present" : "Absent"}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                <button onClick={() => updateAttendance(stud?._id, stud?.attendanceId, params?.courseId)}>
                                    Change
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserAttendance;
