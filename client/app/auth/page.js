'use client'
import React from 'react'
import styles from './page.module.css'
import Link  from 'next/link';
import Signup from '@/components/Signup/page';
import { useState } from 'react';
const Login = ()=>{
    const [signupOpen, setSignupOPen] = useState(false);
    return(
        <section className={styles.container}>
            <div className={styles.card}>
                <div className={styles.logo}>
                    <img src='wenchijobs-nav-logo.png' />
                </div>
                <div className={styles.header}>
                        Login
                </div>
                <form>
                    <label htmlFor='email' className={styles.formControl}>Email:</label>
                    <input type='email' className={styles.formControl} name='email' id='email' placeholder='Enter your email' />
                    <label htmlFor='email' className={styles.formControl}>Password:</label>
                    <input type='password' className={styles.formControl} name='email' placeholder='Enter your password' />
                    <Link href="#" className={styles.forgetPassword}>Forget Password?</Link>
                    <input type='submit' value='Login' name='submit' className={styles.btnLogin} />
                    <input type='button' value='Create Account' name='submit' className={styles.btnSignup} onClick={()=>setSignupOPen(true)}/>
                </form>
            </div>
            {signupOpen && <Signup closeModal={setSignupOPen}/>}
        
        </section>
    )
}
export default Login;