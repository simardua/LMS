import axios from "axios"
axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

export const REGISTER_REQUEST = "REGISTER_REQUEST"
export const REGISTER_SUCCESS = "REGISTER_SUCCESS"
export const REGISTER_FAIL = "REGISTER_FAIL"

export const registerAction = (data) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST })
    try {
        const response = await axios.post("http://localhost:5000/api/user/register", data)
        if (response.data.success) {
            dispatch({ type: REGISTER_SUCCESS, payload: response.data })
        }
    } catch (error) {
        dispatch({ type: REGISTER_FAIL, payload: error.response.data.error })
    }
}


export const LOGIN_REQUEST = "LOGIN_REQUEST"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_FAIL = "LOGIN_FAIL"


export const loginAction = (data) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST })
    try {
        const response = await axios.post("http://localhost:5000/api/user/login", data)
        if (response.data.success) {
            dispatch({ type: LOGIN_SUCCESS, payload: response.data })
            localStorage.setItem("user",JSON.stringify(response.data))
        }
        console.log(response)
        return response;
    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.error })
    }
}

export const SIGNOUT_REQUEST = "SIGNOUT_REQUEST"
export const SIGNOUT_SUCCESS = "SIGNOUT_SUCCESS"
export const SIGNOUT_FAIL = "SIGNOUT_FAIL"

export const signoutAction = () => async (dispatch) => {
    dispatch({ type: SIGNOUT_REQUEST })
    try {
        localStorage.clear()
        const response = await axios.post("http://localhost:5000/api/user/signout");
        console.log(response)
    } catch (error) {
        dispatch({ type: SIGNOUT_FAIL, payload: error.response.data.error })
    }
}


export const FETCH_ALL_USERS_REQUEST = "FETCH_ALL_USERS_REQUEST"
export const FETCH_ALL_USERS_SUCCESS = "FETCH_ALL_USERS_SUCCESS"
export const FETCH_ALL_USERS_FAIL = "FETCH_ALL_USERS_FAIL"

export const fetchUsersAction = () => async (dispatch) => {
    dispatch({ type: FETCH_ALL_USERS_REQUEST });
    try {
        const response = await axios.get("/api/user/users");
        dispatch({ type: FETCH_ALL_USERS_SUCCESS, payload: response.data });
        // return response.data;
    } catch (error) {
        dispatch({ type: FETCH_ALL_USERS_FAIL, payload: error.response.data.error });
        throw error.response.data;
    }
};

export const FETCH_USER_REQUEST = "FETCH_USER_REQUEST"
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS"
export const FETCH_USER_FAIL = "FETCH_USER_FAIL"

export const userAction=(userId)=>async(dispatch)=>{
    dispatch({type: FETCH_USER_REQUEST});
    try {
        const response = await axios.get(`/api/user/${userId}`);
        dispatch({ type: FETCH_USER_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_USER_FAIL, payload: error.response.data.error });
        throw error.response.data;
    }
}

export const DELETE_USER_REQUEST = "DELETE_USER_REQUEST"
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS"
export const DELETE_USER_FAIL = "DELETE_USER_FAIL"

export const deleteUserAction=(userId)=>async(dispatch)=>{
    dispatch({type: DELETE_USER_REQUEST});
    try {
        const response= await axios.delete(`/api/user/${userId}/delete`);
        dispatch({type:DELETE_USER_SUCCESS, payload: response.data});
    } catch (error) {
        dispatch({type:DELETE_USER_FAIL, payload: error.response.data.error})
    }
}


export const SEARCH_USER_REQUEST="SEARCH_USER_REQUEST"
export const SEARCH_USER_SUCCESS = "SEARCH_USER_SUCCESS"
export const SEARCH_USER_FAIL = "SEARCH_USER_FAIL"

export const searchUserAction = (input)=>async(dispatch)=>{
    dispatch({type: SEARCH_USER_REQUEST});
    try {
        const res = await axios.get(`http://localhost:5000/api/user/?search=${input}`)
        dispatch({ type: SEARCH_USER_SUCCESS, payload: res.data.users });
    } catch (error) {
        dispatch({type: SEARCH_USER_FAIL, payload: error.res.data.error})
    }
}
