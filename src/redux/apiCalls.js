import { loginFailure, loginStart, loginSuccess, registerFaliure, registerStart, registerSuccess } from "./userRedux";
import { publicRequest } from '../requestMethods'

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user);
        localStorage.setItem("user", JSON.stringify(res?.data));
        dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(loginFailure({ message: err.response.data }));
    }
};

export const register = async (dispatch, user) => {
    dispatch(registerStart());
    try {
        const res = await publicRequest.post("/auth/register", user);
        localStorage.setItem("user", JSON.stringify(res?.data));
        dispatch(registerSuccess(res.data));
    } catch (err) {
        console.log(err);
        dispatch(registerFaliure({ message: err.response.data }));
    }
}