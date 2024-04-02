import { configureStore } from "@reduxjs/toolkit"
import { fetchUserReducer, fetchUserSearch, userReducer } from "../reducer/userReducer"
import { courseReducer, courseSearchReducer } from "../reducer/courseReducer"
import { announcementReducer} from "../reducer/announcementReducer"

const mystore= configureStore({
    reducer:{
        user: userReducer,
        allUser: fetchUserReducer,
        searchedUser: fetchUserSearch,
        courses: courseReducer,
        searchedCourse: courseSearchReducer,
        fetchAnnouncements: announcementReducer
    }
})

export default mystore