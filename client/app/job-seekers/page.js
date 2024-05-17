"use client"
import axios from 'axios';
import styles from './seekers.module.css'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginFailure, loginStart, loginSuccess } from '@/redux/login';
import LeftMenu from '@/components/Category/LeftMenu/LeftMenu';
//get userName from local storage
// function getUserName(){
//     if (typeof window !== 'undefined') {
//         // Perform localStorage action
//         let user = localStorage.getItem('userFirstName')
//         if(user){
//             return user
//         }
//         else{
//             return;
//         }
       
//       }
     
// }
// //get userMiddleName from local storage
// function getUserMiddleName(){
//     if (typeof window !== 'undefined') {
//         // Perform localStorage action
//         let user = localStorage.getItem('userMiddleName')
//         if(user){
//             return user
//         }
//         else{
//             return;
//         }
       
//       }
     
// }
//get userName from local storage
// function getUserId(){
//     if (typeof window !== 'undefined') {
//         // Perform localStorage action
//         let user = localStorage.getItem('userId')
//         if(user){
//             return user
//         }
//         else{
//             return;
//         }
       
//       }
     
// }
const JobSeekersHome = ()=>{
//const [user, setUser] = useState(getUserName())
const [userFirstName, setUserFirstName] = useState('')
const [userId, setUserId] = useState('')
const [userMiddleName, setUserMiddleName] = useState('')
const dispatch = useDispatch()
useEffect(()=>{
    dispatch(loginStart())
    axios.defaults.withCredentials = true
    axios.get(process.env.NEXT_PUBLIC_SERVER_ADDRESS+"/job-seekers-home")
    .then((res)=>{
     
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
        <section className={styles.container}>
        {userFirstName !=  '' &&
            <div className={styles.card}>
               <LeftMenu />
               <table>
                 <thead>
                    <tr>
                        <th>No.</th>
                        <th>Job Title</th>
                        <th>Company name</th>
                        <th>Application code</th>
                        
                        <th>Progress</th>
                    </tr>
                 </thead>
                 <tbody>
                    <tr>
                        <td colSpan={5}>There is no job application yet </td>
                    </tr>
                 </tbody>
               </table>
            </div>
}
        </section>
 
        
        
    )
}
export default JobSeekersHome;