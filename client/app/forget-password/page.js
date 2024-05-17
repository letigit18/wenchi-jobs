'use client'
import React from 'react'
import styles from './forget.module.css'
import Link  from 'next/link';
import Signup from '@/components/Signup/page';
import { useState, useEffect} from 'react';
import {useForm} from 'react-hook-form'
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { loginFailure, loginStart, loginSuccess } from '@/redux/login';
import { Emilys_Candy } from 'next/font/google';

const ForgetPassword = ()=>{
    const [signupOpen, setSignupOPen] = useState(false);
    const isEnglish = useSelector((state)=>state.language.isEnglish)
    const loading =  useSelector((state)=>state.login.loading)
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const validationSchema = yup.object().shape({
        email: yup.string().required("Enter your email")
               .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email address"),
       
    
    })
     //linking the validation schema with the form data throuhg resolver
     const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(validationSchema)
    });
    
    //login checker
const onSubmit= (data)=>{
   fetch(process.env.NEXT_PUBLIC_SERVER_ADDRESS+'/send-email', {
    method: 'post',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
   })
   .then((res)=>{
      if(!res.ok){
        throw new error('Network error')
      }
      return res.json()
   })
   .then((data)=>{
      if(data.message == "Success"){
      setMessage("We have sent you an email with verification code, if you can't find your email check in the spam list")
      }
      if(data.message == "Not found"){
        setError("Error: No user found by this email")
      }
      if(data.message == "Error"){
        setError("Error: Can't send an email to this email ")
        }
   })
   .catch(error=>{
    console.error('Error in fetching data')
   })
}
   
    return(
        <section className={styles.container}>
            <div className={styles.card}>
                <div className={styles.logo}>
                    <img src='wenchijobs-nav-logo.png' />
                </div>
                <div className={styles.header}>
                        {isEnglish ? 'Find your Account' : 'Galmee kessan barbaadaa'}
                    
                </div>
                <p className={styles.errorHeader}>{error}</p> 
                <p className={styles.notification}>{message}</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.formContainer}>
                        <label htmlFor='email' className={styles.formControl}>Email:</label>
                        <input type='text'  {...register('email')} className={styles.formControl}  id='email' placeholder='Enter your email' />
                        <p className={styles.error}>{errors.email?.message}</p>
                                   
                    </div>

                 <input type='submit' value={isEnglish ? "Search" : "Barbaadii"} name='submit' className={styles.btnLogin} /> 
                   
                   
                </form>
                
            </div>
            {signupOpen && <Signup closeModal={setSignupOPen}/>}
        
        </section>
    )
}
export default ForgetPassword;