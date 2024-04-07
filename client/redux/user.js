import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
    name: "user",
    initialState: {value: {userName: "Tola"}},
    reducers:{
        changeUser: (state, action)=>{
            state.value = action.payload
        },
    },
})
export const {changeUser} = userSlice.actions;
export default userSlice.reducer;