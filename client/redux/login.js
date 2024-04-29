import {createSlice} from '@reduxjs/toolkit'
const initialState = {isLogin: null, loading: null}
const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        loginStart: (state, action)=>{
        state.isLogin = false,
        state.loading = true
    },
    loginSuccess: (state, action)=>{
         state.isLogin = true,
         state.loading = false
    },
    loginFailure: (state, action)=>{
        state.isLogin = false,
        state.loading = false
    },
  }
})
export const {loginStart, loginFailure, loginSuccess} = loginSlice.actions;
export default loginSlice.reducer