'use client'
import React from 'react'
import styles from './page.module.css'
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

const Login = ()=>{
    const [signupOpen, setSignupOPen] = useState(false);
    const isEnglish = useSelector((state)=>state.language.isEnglish)
    const loading =  useSelector((state)=>state.login.loading)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const validationSchema = yup.object().shape({
        email: yup.string().required("Enter your email"),
        password: yup.string().required("Enter your password")
    
    })
     //linking the validation schema with the form data throuhg resolver
     const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(validationSchema)
    });
    
    //login checker
const onSubmit= (data)=>{
    dispatch(loginStart())
    axios.defaults.withCredentials = true
    axios.post(process.env.NEXT_PUBLIC_SERVER_ADDRESS+'/auth', data)
    .then(res=>{
        if(res.data.login){
            localStorage.setItem('userFirstName', res.data.userFirstName)
            localStorage.setItem('userMiddleName', res.data.userMiddleName)
            localStorage.setItem('userId', res.data.userId)
            dispatch(loginSuccess())
            window.location.href = "/job-seekers"
        }
        else{
            dispatch(loginFailure())
            setError("Invalid user name or password, try again")
        }
    })
}
   
    return(
        <section className={styles.container}>
            <div className={styles.card}>
                <div className={styles.logo}>
                    <img src='wenchijobs-nav-logo.png' />
                </div>
                <div className={styles.header}>
                        Login
                    
                </div>
                <p className={styles.errorHeader}>{error}</p> 
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.formContainer}>
                        <label htmlFor='email' className={styles.formControl}>Email:</label>
                        <input type='text'  {...register('email')} className={styles.formControl}  id='email' placeholder='Enter your email' />
                        
                        <label htmlFor='email' className={styles.formControl}>Password:</label>
                        <input type='password' {...register('password')} className={styles.formControl}  placeholder='Enter your password' />
                        
                    </div>
                    <Link href="/forget-password" className={styles.forgetPassword}>{isEnglish ? "Forget Password?" : "Passwordii dagatanii?"}</Link>
                 <input type='submit' value={loading ? "Verifying.." : "Login"} name='submit' className={styles.btnLogin} /> 
                   
                    <input type='button' value={isEnglish ? 'Create Account' : "Haaraa Galmaa'ii"} name='submit' className={styles.btnSignup} onClick={()=>setSignupOPen(true)}/>
                </form>
                
            </div>
            {signupOpen && <Signup closeModal={setSignupOPen}/>}
        
        </section>
    )
}
export default Login;