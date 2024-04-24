import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const Attendance = () => {
    const params = useParams();
    const [dates, setDates] = useState([]);
    const [accountType, setAccountType] = useState('');
    const [attendance, setAttendance] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));

    // const [presentNumber, setPresentNumber] = useState(0)
    // const [absentNumber, setAbsentNumber] = useState(0)
    // const [attendancePercentage, setattendancePercentage] = useState(0)
    const { courseId } = params;

    useEffect(() => {
        if (user) {
            setAccountType(user?.accountType);
        }
    }, [user]);

  

//     const attendencePercentage = () => {
//         attendance?.forEach(courseAttendance => {
//             // Iterate over attendance for each course
//             courseAttendance?.forEach(attendance => {
//                 // Check if attendance is present or absent
//                 if (attendance.isPresent) {
//                     setPresentNumber(presentNumber + 1);
//                 } else {
//                     setAbsentNumber(absentNumber + 1);
//                 }
//             });
//         });

//         const totalClasses = attendance.reduce((acc, courseAttendance) => {
//             return acc + courseAttendance.length;
//         }, 0);

//         const percent = (presentNumber / totalClasses) * 100;
//         setattendancePercentage(percent);
//     }

// useEffect(() => {
//     attendencePercentage(); // Call the function after setting the attendance state
// }, [attendance]);
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
        return date.toLocaleString("en-US",options); // Adjust options as needed for format
    };

    const getDates = async () => {
        try {
            const res = await axios.post(`http://localhost:5000/api/attendance/get-attendance/${courseId}`);
            if (res.data.success) {
                const localDates = res.data.attendance.map(item => ({ ...item, date: getLocalDateString(item.date) }));
                setDates(localDates);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const userAttendance = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/api/attendance/get-student-attendance/${courseId}`, { studentId: user?._id });
            const localAttendance = response.data.attendance.map(item => ({ ...item, date: getLocalDateString(item.date) }));
            setAttendance(localAttendance);
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
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <table style={{ borderCollapse: 'collapse', width: '70%' }}>
                        <thead>
                            <tr>
                                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dates.map((item, index) => (
                                <tr key={index}>
                                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
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
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <table style={{ borderCollapse: 'collapse', width: '70%' }}>
                        <thead>
                            <tr>
                                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>Date</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>Attendance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendance.map((item, index) => (
                                <tr key={index}>
                                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{item?.date}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{item?.isPresent ? "Present" : "Absent"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* {attendencePercentage} */}
                </div>
            )}
        </>
    );
};

export default Attendance;
