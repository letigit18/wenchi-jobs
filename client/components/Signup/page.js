import React, { useContext, useState } from 'react'
import styles from './signup.module.css'
import Link  from 'next/link';
import {useForm} from 'react-hook-form'
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux';
import language from '@/redux/language';
const Signup = ({closeModal})=>{
    const [message, setMessage] = useState("")
    const dispatch = useDispatch();
    const isEnglish = useSelector((state)=> state.language.isEnglish)
    //setting up the validation schema
    const validationSchema = yup.object().shape({
        firstName: yup.string().required("First name is required").matches(/^[a-zA-Z]+$/, "Invalid first name"),
        middleName: yup.string("please input valid middle name").required("Middle name is required"),
        email: yup.string().matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email address").required("Email address is required"),
        password: yup.string().required("Password is required").min(5, "Password must be minimum of 5 characters").max(20, "Password should not exceed 20 characters"),
        confirmPassword: yup.string().required("Confirm password required").oneOf([yup.ref("password"), null], "Pasword don't match!")
    })
    //linking the validation schema with the form data throuhg resolver
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(validationSchema)
    });

    //the function that handles the onsubmit form data 
    const onSubmit = (data) =>{
        setMessage(data.firstName)
    }
    return(
        
            <div className={styles.card}>
              
                <div className={styles.header}>
                     <h3>{isEnglish ? 'Signup' : `Galmaa'ii`} {message && `Welcome ${message}`}</h3>
                     
                     <div className={styles.close} onClick={()=>closeModal(false)}>X</div>
                     <div className={styles.closeToolTip}>
                        {isEnglish ? 'Close' : 'Cufi'}
                     </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                   <p className={styles.caution}>{isEnglish ? '' : <i className='bx bx-alarm-exclamation'></i>}{isEnglish ? '' : `Odeeffanoo armaan gadii yeroo guuttan qube Engiliffatiin ta'uu hin dagatinaa`}</p>
                 
                    <div className={styles.inputBox}>
                        <input type='text'  {...register("firstName")} className= {errors.firstName ? styles.inputError : ""} required/>
                        <span>{isEnglish ? 'First name' : `Maqaa`}</span>
                        <p className={styles.errorLabel}>{errors.firstName?.message}</p>
                    </div>
                    <div className={styles.inputBox}>
                        <input type='text'   {...register("middleName")} className= {errors.middleName ? styles.inputError : ""} required/>
                        <span>{isEnglish ? 'Middle name' : `Maqaa Abbaa`}</span>
                        <p className={styles.errorLabel}>{errors.middleName?.message}</p>
                    </div>
                  
                    <div className={styles.inputBox}>
                        <input type='text'  {...register("email")} className= {errors.email ? styles.inputError : ""} required />
                        <span>{isEnglish ? 'Email' : `Email`}</span>
                        <p className={styles.errorLabel}>{errors.email?.message}</p>
                    </div>
                    
                    <div className={styles.inputBox}>
                        <input type='password'  {...register("password")} className= {errors.password ? styles.inputError : ""} required/>
                        <span>{isEnglish ? 'Password' : `Jecha Iccitii(password)`}</span>
                        <p className={styles.errorLabel}>{errors.password?.message}</p>
                    </div>
                    <div className={styles.inputBox}>
                        <input type='password'  {...register("confirmPassword")} className= {errors.confirmPassword ? styles.inputError : ""} required/>
                        <span>{isEnglish ? 'Confirm password' : `Passwordii mirkaneessaa`}</span>
                        <p className={styles.errorLabel}>{errors.confirmPassword?.message}</p>
                    </div>
                                   
                    <input type='submit' value={isEnglish ? 'Register' : 'Galmeessii '} name='submit' className={styles.btnLogin} />
                   
                   
                   
                </form>
            </div>
        
     
    )
}
export default Signup;