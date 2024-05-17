import {createSlice} from '@reduxjs/toolkit'
const initialState = {isLogin: null, loading: null, imageData: {}}
const employersSlice = createSlice({
    name: "employers",
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
    getImageData: (state, action)=>{
        state.imageData = {companyId: action.payload.companyId, companyLogo: action.payload.companyLogo}
    },
    updateImageData: (state, action)=>{
       state.imageData.companyId = action.payload.companyId;
       state.imageData.companyLogo = action.payload.companyLogo
        
    },

  }
})
export const {loginStart, loginFailure, loginSuccess, getImageData, updateImageData} = employersSlice.actions;
export default employersSlice.reducer