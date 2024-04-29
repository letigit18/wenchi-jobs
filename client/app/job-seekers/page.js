"use client"
import axios from 'axios';
import styles from './seekers.module.css'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginFailure, loginStart, loginSuccess } from '@/redux/login';
function getUserName(){
    if (typeof window !== 'undefined') {
        // Perform localStorage action
        let user = localStorage.getItem('userFirstName')
        if(user){
            return user
        }
        else{
            return;
        }
       
      }
     
}
const JobSeekersHome = ()=>{
//const [user, setUser] = useState(getUserName())
const [userFirstName, setUserFirstName] = useState('')
const [userId, setUserId] = useState('')
const [userMiddleName, setUserMiddleName] = useState('')
const dispatch = useDispatch()
useEffect(()=>{
    dispatch(loginStart())
    axios.defaults.withCredentials = true
    axios.get("http://localhost:5000/job-seekers-home")
    .then((res)=>{
        console.log(res)
        if(res.data.valid)
        {
                dispatch(loginSuccess())
                setUserFirstName(res.data.userFirstName)
                setUserMiddleName(res.data.userMiddleName)
                setUserId(res.data.userId)
                
        }
        else{
            dispatch(loginFailure())
            window.location.href = "/auth"
        }
    })
}, [])

    return(
        <div>
         <h1>Welcome {userFirstName} {userMiddleName}</h1>
 
        
        </div>
    )
}
export default JobSeekersHome;