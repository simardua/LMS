import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { userAction } from '../../redux/action/userAction';
import { fetchCourse } from '../../redux/action/courseAction';

const CourseAccessRoute = (props) => {

  const dispatch = useDispatch()
  const {courseId} = useParams()
  const user = useSelector((state) => state.user.user).user
  const course = useSelector((state)=>state.courses.courses.course)
  const { Component } = props
  let userId = JSON.parse(localStorage.getItem('user'))._id;
  const [courseEnrolled, setCourseEnrolled] = useState(false)


  useEffect(() => {
    dispatch(userAction(userId))
    dispatch(fetchCourse(courseId))
  }, [dispatch])

  useEffect(() => {
    if (user && courseId && course) {
      const isEnrolled = user?.courses.some(course => course._id === courseId);
      const isAdmin = user?.accountType === "Admin";
      const isInstructor = course?.instructors.some(instructor => {
        return instructor._id === user?._id;
      });

      if (isEnrolled || isAdmin || isInstructor) {
        setCourseEnrolled(true);
      }
    }
  }, [user, courseId, course]);

  
  return (
    <>
      {!courseEnrolled ? <>
      <div style={{display:"flex", justifyContent:"center", justifyItems:"center", marginTop:"100px"}}>
        <h4>You are not enrolled in this course.</h4>
      </div>
      </>:<><Component/></>}
    </>
  )
}

export default CourseAccessRoute