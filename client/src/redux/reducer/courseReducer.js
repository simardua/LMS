import { FETCH_ALL_COURSES_FAIL, FETCH_ALL_COURSES_REQUEST, FETCH_ALL_COURSES_SUCCESS, FETCH_COURSE_FAIL, FETCH_COURSE_REQUEST, FETCH_COURSE_SUCCESS, SEARCH_COURSE_FAIL, SEARCH_COURSE_REQUEST, SEARCH_COURSE_SUCCESS } from "../action/courseAction"
import { FETCH_USER_REQUEST } from "../action/userAction"

const initialCourseState={
    courses:[],
    error: "",
    success:'',
    isLoading: "",
}

export const courseReducer=(state=initialCourseState,action)=>{
    switch (action.type) {
        case FETCH_ALL_COURSES_REQUEST:
            return {...state, isLoading:true}
        case FETCH_ALL_COURSES_SUCCESS:
            return {...state, isLoading: false, courses:action.payload, success:"Courses Fetched"}
        case FETCH_ALL_COURSES_FAIL:
            return{...state, isLoading: false, success:"Error Fetching Courses"}
        case FETCH_COURSE_REQUEST:
            return{...state, isLoading: true}
        case FETCH_COURSE_SUCCESS:
            return{...state, isLoading: false, courses: action.payload, success:"Course fetched"}
        case FETCH_COURSE_FAIL:
            return { ...state, isLoading: false, success: "Error Fetching Course" }
        default:
            return state
    }
}

const initialSearchState={
    courses:[],
    isLoading:'',
    success:'',
    error:''
}

export const courseSearchReducer=(state=initialSearchState, action)=>{
    switch (action.type) {
        case SEARCH_COURSE_REQUEST:
            return { ...state, isLoading: true }
        case SEARCH_COURSE_SUCCESS:
            return { ...state, isLoading: false, courses: action.payload, success: "Course searched" }
        case SEARCH_COURSE_FAIL:
            return { ...state, isLoading: false, success: "Error searching Course" }
        default:
            return state
    }
}