import { DELETE_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, FETCH_ALL_USERS_FAIL, FETCH_ALL_USERS_REQUEST, FETCH_ALL_USERS_SUCCESS, FETCH_USER_FAIL, FETCH_USER_REQUEST, FETCH_USER_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS, SIGNOUT_REQUEST, SIGNOUT_SUCCESS } from "../action/userAction"

const initialUserState = {
    user: [],
    error: "",
    success: "",
    isLoading: "",
}

export const userReducer = (state = initialUserState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
            return { ...state, isLoading: true }
        case REGISTER_SUCCESS:
            return { ...state, isLoading: false, user: action.payload, success:"User Registered Successfully"}
        case REGISTER_FAIL:
            return { ...state, isLoading: false, error: action.payload }
        case LOGIN_REQUEST:
            return { ...state, isLoading: true }
        case LOGIN_SUCCESS:
            return { ...state, isLoading: false, user: action.payload, success: "User login successful" }
        case LOGIN_FAIL:
            return { ...state, isLoading: false, error: action.payload }
        case SIGNOUT_REQUEST:
            return { ...state, isLoading: true }
        case SIGNOUT_SUCCESS:
            return { ...state, isLoading: false, user: {} }
        case FETCH_USER_REQUEST:
            return{...state, isLoading:true}
        case FETCH_USER_SUCCESS:
            return{...state, isLoading:false, user: action.payload, success:"User fetched successful"}
        case FETCH_USER_FAIL:
            return{...state, isLoading:false, error: action.payload.error}

        case DELETE_USER_REQUEST:
            return { ...state, isLoading: true }
        case DELETE_USER_SUCCESS:
            return { ...state, isLoading: false, user: action.payload, success: "User deleted successful" }
        case DELETE_USER_FAIL:
            return { ...state, isLoading: false, error: action.payload.error }

        default:
            return state
    }
}


const initialAllUserState={
    users:[],
    isLoading: "",
    error: "",
    success: "",
}

export const fetchUserReducer=(state=initialAllUserState, action)=>{
    switch (action.type) {
        case FETCH_ALL_USERS_REQUEST:
            return {...state, isLoading: true}
        case FETCH_ALL_USERS_SUCCESS:
            return {...state, isLoading: false, users: action.payload, success:"Users Fetched Successfully"}
        case FETCH_ALL_USERS_FAIL:
            return {...state, isLoading: false, error: action.payload}
        default:
            return state
    }
}