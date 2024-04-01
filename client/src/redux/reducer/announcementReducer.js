import { FETCH_ANNOUNCEMENTS_FAIL, FETCH_ANNOUNCEMENTS_REQUEST, FETCH_ANNOUNCEMENTS_SUCCESS } from "../action/announcementAction"

const initialAnnouncementState={
    announcements: [],
    error: "",
    success: "",
    isLoading: "",
}

export const announcementReducer=(state=initialAnnouncementState, action)=>{
    switch (action.type) {
        case FETCH_ANNOUNCEMENTS_REQUEST:
            return { ...state, isLoading: true }
        case FETCH_ANNOUNCEMENTS_SUCCESS:
            return { ...state, isLoading: false, announcements: action.payload, success: "Announcements Fetched" }
        case FETCH_ANNOUNCEMENTS_FAIL:
            return { ...state, isLoading: false, success: "Error Fetching Announcements" }
        default:
            return state
}
}