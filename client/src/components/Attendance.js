import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const Attendance = () => {
    const params = useParams();
    const [dates, setDates] = useState([]);
    const [accountType, setAccountType] = useState('');
    const [attendance, setAttendance] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));

    const { courseId } = params;

    useEffect(() => {
        if (user) {
            setAccountType(user?.accountType);
        }
    }, [user]);

    const userAttendance = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/api/attendance/get-student-attendance/${courseId}`, { studentId: user?._id });
            console.log(response.data.attendance);
            setAttendance(response.data.attendance);
        } catch (error) {
            console.log(error.message);
        }
    };

    const getDates = async () => {
        try {
            const res = await axios.post(`http://localhost:5000/api/attendance/get-attendance/${courseId}`);
            if (res.data.success) {
                setDates(res.data.attendance);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        if (accountType === "Instructor" || accountType === "Admin") {
            getDates();
        } else {
            userAttendance();
        }
    }, [accountType, courseId]);

    return (
        <>
            {accountType === "Instructor" || accountType === "Admin" ? (
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dates.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <Link to={`/userAttendance/${params.courseId}/${item?._id}`}>
                                            {item?.date}
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div>
                        <table style={{ border: "1px solid black", borderCollapse: "collapse" }}>
                        <thead>
                            <tr>
                                    <th style={{ border: "1px solid black", padding: "8px" }}>Date</th>
                                    <th style={{ border: "1px solid black", padding: "8px" }}>Attendance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendance.map((item, index) => (
                                <tr key={index}>
                                    <td style={{ border: "1px solid black", padding: "8px"}}>{item?.date}</td>
                                    <td style={{ border: "1px solid black", padding: "8px"}}>{item?.isPresent ? "Present" : "Absent"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default Attendance;
