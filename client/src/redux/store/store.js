import { configureStore } from "@reduxjs/toolkit"
import { fetchUserReducer, userReducer } from "../reducer/userReducer"

const mystore= configureStore({
    reducer:{
        user: userReducer,
        allUser: fetchUserReducer
    }
})


export default mystore