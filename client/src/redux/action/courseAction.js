import axios from "axios"
axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;


export const FETCH_ALL_COURSES_REQUEST="FETCH_ALL_COURSES_REQUEST"
export const FETCH_ALL_COURSES_SUCCESS = "FETCH_ALL_COURSES_SUCCESS"
export const FETCH_ALL_COURSES_FAIL = "FETCH_ALL_COURSES_FAIL"

export const fetchAllCoursesAction = async(dispatch)=>{
    dispatch({type: FETCH_ALL_COURSES_REQUEST})
    try {
        const res = await axios.post("http://localhost:5000/api/course/courses")
        dispatch({type: FETCH_ALL_COURSES_SUCCESS, payload: res.data})
    } catch (error) {
        dispatch({type: FETCH_ALL_COURSES_FAIL, payload: error.res.data.error})
    }
}



export const FETCH_COURSE_REQUEST="FETCH_COURSE_REQUEST"
export const FETCH_COURSE_SUCCESS = "FETCH_COURSE_SUCCESS"
export const FETCH_COURSE_FAIL = "FETCH_COURSE_FAIL"
export const fetchCourse=(courseId)=> async(dispatch)=>{
    dispatch({type:FETCH_COURSE_REQUEST})
    try {
        const res = await axios.get(`http://localhost:5000/api/course/${courseId}`)
        dispatch({type:FETCH_COURSE_SUCCESS, payload: res.data})
    } catch (error) {
        dispatch({type: FETCH_COURSE_FAIL, payload: error.res.data.error})
    }   
}


export const SEARCH_COURSE_REQUEST="SEARCH_COURSE_REQUEST"
export const SEARCH_COURSE_SUCCESS="SEARCH_COURSE_SUCCESS"
export const SEARCH_COURSE_FAIL="SEARCH_COURSE_FAIL"
export const searchCourse=(courses)=>async(dispatch)=>{
    dispatch({type:SEARCH_COURSE_REQUEST})
    try {
        const res = await axios.get(`http://localhost:5000/api/course/?search=${courses}`)
        dispatch({type:SEARCH_COURSE_SUCCESS, payload:res.data})
    } catch (error) {
        dispatch({type:SEARCH_COURSE_FAIL, payload:error.res.data.error})
    }
}