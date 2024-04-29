import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async(userCredentials)=>{
    const request =  await axios.post('http://localhost:5000/auth', userCredentials)
    const response = await request.data.userFirstName
    localStorage.setItem('user', response)
    return response
  }
)
const authSlice = createSlice(
    {
        name: 'auth',
        initialState: {
            loading: false,
            user: null,
            error: null,
        },
        extraReducers: (builder)=>{
          builder
          .addCase(loginUser.pending, (state)=>{
            state.loading = true,
            state.user = null,
            state.error = null
          })
          .addCase(loginUser.fulfilled, (state, action)=>{
            state.loading = false,
            state.user = action.payload,
            state.error = null
          })
          .addCase(loginUser.rejected, (state, action)=>{
            state.login = false
            state.user = null
            console.log(action.error.message)
            if(action.error.message === 'Request failed with status code 401'){
              state.error = 'Access denied'

            }
            else{
              state.error = action.error.message
            }
          })
        }
    }
)
export default authSlice.reducer;