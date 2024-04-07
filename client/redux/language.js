import {createSlice} from '@reduxjs/toolkit'
const initialState = {isEnglish: true}
const languageSlice = createSlice({
    name: "language",
    initialState,
    reducers: {
        changeLanguage: (state, action)=>{
        state.isEnglish = action.payload
    }
  }
})
export const {changeLanguage} = languageSlice.actions;
export default languageSlice.reducer