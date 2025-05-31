import { createSlice } from "@reduxjs/toolkit";

const initialSlice={
    userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialSlice,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem("userInfo", JSON.stringify(action.payload));

            const expirationTime=new Date().getTime()+1000*60*60*24*7;
            localStorage.setItem("expirationTime", expirationTime);
        },

        logout: (state) => {
            state.userInfo = null;
            localStorage.removeItem("userInfo");
            localStorage.removeItem("expirationTime");
        }
    }
});

export const {setCredentials, logout} = authSlice.actions;
export default authSlice.reducer;