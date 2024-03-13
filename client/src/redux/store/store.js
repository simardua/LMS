import { configureStore } from "@reduxjs/toolkit"
import { fetchUserReducer, fetchUserSearch, userReducer } from "../reducer/userReducer"
import { courseReducer, courseSearchReducer } from "../reducer/courseReducer"

const mystore= configureStore({
    reducer:{
        user: userReducer,
        allUser: fetchUserReducer,
        searchedUser: fetchUserSearch,
        courses: courseReducer,
        searchedCourse: courseSearchReducer,
    }
})

export default mystore