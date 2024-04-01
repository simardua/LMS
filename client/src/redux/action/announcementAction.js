import axios from "axios"

export const FETCH_ANNOUNCEMENTS_REQUEST = "FETCH_ANNOUNCEMENTS_REQUEST"
export const FETCH_ANNOUNCEMENTS_SUCCESS = "FETCH_ANNOUNCEMENTS_SUCCESS"
export const FETCH_ANNOUNCEMENTS_FAIL = "FETCH_ANNOUNCEMENTS_FAIL"

export const fetchAnnouncements = async(dispatch)=>{
    dispatch({type: FETCH_ANNOUNCEMENTS_REQUEST})
    try {
        const res = await axios.get("http://localhost:5000/api/announcement/fetch")
        dispatch({type: FETCH_ANNOUNCEMENTS_SUCCESS, payload: res.data})
    } catch (error) {
        dispatch({type: FETCH_ANNOUNCEMENTS_FAIL, payload: error.res.data.error})
    }
}