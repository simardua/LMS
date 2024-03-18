import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UserAttendance = () => {
    const params = useParams();
    const [data, setData] = useState(null);
    const [students,setStudents]=useState([])
 

    const userAttendance = async () => {
        try {
            const res = await axios.post(`http://localhost:5000/api/attendance/getUsers/${params?.courseId}/${params?.date}`);
            setData(res.data.data); 
            console.log(res.data.data)
        } catch (error) {
            console.log(error.message);
        }
    };


    const updateAttendance = async (userId, attendanceId, courseId) => {
        try {
            const res = await axios.post(`http://localhost:5000/api/attendance/updateAttendance/${courseId}/${userId}/${attendanceId}`);
            console.log(res.data);
        } catch (error) {
            console.log(error.message);
        }
    };
    
    useEffect(() => {
        userAttendance();
        console.log('get')
    }, [params.courseId, params.date]);

    
    return (
        <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Status</th>
              <th>Change</th>
            </tr>
          </thead>
          <tbody>
          {data && data.map((stud, index) => (
            <tr key={index}>
                <td>{stud?.firstname} {stud?.lastname}</td>
                <td>{stud?.date}</td>
                <td>{stud?.isPresent ? "Present" : "Absent"}</td>
                <td>
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
