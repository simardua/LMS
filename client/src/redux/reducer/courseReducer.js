import { FETCH_ALL_COURSES_FAIL, FETCH_ALL_COURSES_REQUEST, FETCH_ALL_COURSES_SUCCESS } from "../action/courseAction"

const initialCourseState={
    courses:[{}],
    error: "",
    success:'',
    isLoading: "",
}

export const courseReducer=(state=initialCourseState,action)=>{
    switch (action.type) {
        case FETCH_ALL_COURSES_REQUEST:
            return {...state, isLoading:false}
        case FETCH_ALL_COURSES_SUCCESS:
            return {...state, isLoading: false, courses:action.payload, success:"Courses Fetched"}
        case FETCH_ALL_COURSES_FAIL:
            return{...state, isLoading: false, success:"Error Fetching Courses"}
        default:
            return state
    }
}