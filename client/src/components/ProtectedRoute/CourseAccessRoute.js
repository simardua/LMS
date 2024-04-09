import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { userAction } from '../../redux/action/userAction';

const CourseAccessRoute = (props) => {

  const dispatch = useDispatch()
  const {courseId} = useParams()
  const user = useSelector((state) => state.user.user).user
  const { Component } = props
  let userId = JSON.parse(localStorage.getItem('user'))._id;
  const [courseEnrolled, setCourseEnrolled] = useState(false)

  useEffect(() => {
    dispatch(userAction(userId))
  }, [dispatch])

  useEffect(() => {
    const isEnrolled = user?.courses.some(course => course._id === courseId);
    if (isEnrolled) {
      setCourseEnrolled(true)
    }
  }, [user])
  
  return (
    <>
      {!courseEnrolled ? <>You are not enrolled in this course</>:<><Component/></>}
    </>
  )
}

export default CourseAccessRoute