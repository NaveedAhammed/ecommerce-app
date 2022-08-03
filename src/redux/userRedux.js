import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: null
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        loginFailure: (state, action) => {
            state.isFetching = false;
            state.error = action.payload.message;
        },
        registerStart: (state) => {
            state.isFetching = true
        },
        registerSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload
        },
        registerFaliure: (state, action) => {
            state.isFetching = false;
            state.error = action.payload.message;
        },
        setUser: (state, action) => {
            state.currentUser = action.payload
        }
    }
});

export const { loginStart, loginSuccess, loginFailure, registerStart, registerSuccess, registerFaliure, setUser } = userSlice.actions;

export default userSlice.reducer;