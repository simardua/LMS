import axios from "axios"
axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;


export const FETCH_ALL_COURSES_REQUEST="FETCH_ALL_COURSES_REQUEST"
export const FETCH_ALL_COURSES_SUCCESS = "FETCH_ALL_COURSES_SUCCESS"
export const FETCH_ALL_COURSES_FAIL = "FETCH_ALL_COURSES_FAIL"

export const fetchAllCoursesAction = async(dispatch)=>{
    dispatch({type: FETCH_ALL_COURSES_REQUEST})
    try {
        const res = await axios.get("http://localhost:5000/api/course/")
        dispatch({type: FETCH_ALL_COURSES_SUCCESS, payload: res.data})
    } catch (error) {
        dispatch({type: FETCH_ALL_COURSES_FAIL, payload: error.res.data.error})
    }
}