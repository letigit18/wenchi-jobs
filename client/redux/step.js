import { createSlice } from "@reduxjs/toolkit";
const initialState = {currentStep: 1}
const stepSlice = createSlice(
    {
        name: "step",
        initialState,
        reducers: {
            changeStep: (state, action)=>{
                state.currentStep = action.payload
            },
        },


    }
)
export const {changeStep} = stepSlice.actions;
export default stepSlice.reducer;