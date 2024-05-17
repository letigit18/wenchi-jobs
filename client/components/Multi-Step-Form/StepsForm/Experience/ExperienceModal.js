"use client"
import React, {useEffect, useMemo, useState} from 'react'
import styles from '../steps.module.css'
import Link  from 'next/link';
import {useForm} from 'react-hook-form'
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'
import { useSelector, useDispatch} from 'react-redux';
import { addEducationalFormData, addExperienceData, getExperienceData, setFormData } from '@/redux/multiStepForm';
import { redirect } from 'next/navigation';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic'
function getUserId(){
    if (typeof window !== 'undefined') {
        // Perform localStorage action
        let userId = window.localStorage.getItem('userId')
        if(userId){
            return userId
        }
        else{
            return;
        }
       
      }
     
}
const EducationModal = ({closeModal})=>{
    //react quill input
    const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }),[]);
    
    const date = new Date();
    date.toDateString();
    const isEnglish = useSelector((state)=>state.language.isEnglish)
    const experienceData = useSelector((state)=>state.CVBuilder.experienceData);
    let regId;
    const [userId, setUserId] = useState(getUserId())
    const dispatch = useDispatch()
    //setting up the validation schema
    const validationSchema = yup.object().shape({
        jobTitle: yup.string().required("Job title required"),
        employerName: yup.string().required("Employer name required"),
        jobResponsibility: yup.string(),
        startDate: yup.date()
                   .typeError("Invalid date")
                   .required("Start date required")
                   .max(yup.ref("endDate"), "Start date shoudn't come after end date"),
        endDate: yup.date()
                   .typeError("Invalid date ")
                   .max(date, "Invalid date, future date not allowed")
                   .min(yup.ref("startDate"), "End date shouldn't come before start date"),
       
                    
    })
    //linking the validation schema with the form data throuhg resolver
    const {register, setValue, watch, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(validationSchema),
       
    });
    //react quill handling functions
    useEffect(() => {
        register("jobResponsibility");
      }, [register]);
    
      const onEditorStateChange = (editorState) => {
        setValue("jobResponsibility", editorState);
      };
      //function that sets id
      const getRegId = () =>{
        if(experienceData.length == 0){
            regId = 1;
            return regId;
        }
        else{
            return parseInt(experienceData[experienceData.length - 1].id) + 1;
        }
    }
    //the function that handles the onsubmit form data 
    const onSubmit = (data) =>{
        fetch(process.env.NEXT_PUBLIC_SERVER_ADDRESS+'/create-experience-data', {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
        .then(response => {
        dispatch(addExperienceData({userId: data.userId, jobTitle: data.jobTitle, employerName: data.employerName, jobResponsibility: data.jobResponsibility, startDate: data.startDate, endDate: data.endDate}))
       
        closeModal(false)
        })
    }
    //react quill watch
    const editorContent = watch("jobResponsibility");
    return(
        
            <div className={styles.card}>
              
                <div className={styles.header}>
                     <h3>Add Job Experience</h3>
                     
                     <div className={styles.close} onClick={()=>closeModal(false)}>X</div>
                     <div className={styles.closeToolTip}>
                        Close
                     </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                   <input type='hidden' value={userId} {...register("userId")} />
                   <div className={styles.inputBox}>
                        <label htmlFor='jobTitle'>Job Title</label>
                        <input type='text' id="jobTitle"  {...register("jobTitle")} className= {errors.jobTitle ? styles.inputError : ""} required/>
                        
                        <p className={styles.errorLabel}>{errors.jobTitle?.message}</p>
                    </div>
                    <div className={styles.inputBox}>
                        <label htmlFor='employerName'>Employer</label>
                        <input type='text' id="employerName"  {...register("employerName")} className= {errors.employerName ? styles.inputError : ""} required/>
                         
                        <p className={styles.errorLabel}>{errors.employerName?.message}</p>
                    </div>
                    <div className={styles.inputBoxQuill}>
                        <label htmlFor='jobResponsibility'>Job Responsibility</label>
                        
                        <ReactQuill style={{height: '100px'}} theme="snow" id="jobResponsibility" placeholder='Enter your main responsibility in the form of list not more than 5 lines' value={editorContent} onChange={onEditorStateChange} className= {errors.jobResponsibility ? styles.inputError : ""} />
                        <p className={styles.errorLabel}>{errors.jobResponsibility?.message}</p>
                    </div>
                    <div className={styles.inputBox}>
                        <label>Start date</label>
                        <input type='date'  {...register("startDate")} className= {errors.startDate ? styles.inputError : ""} required />

                        <p className={styles.errorLabel}>{errors.startDate?.message}</p>
                    </div>
                    
                    <div className={styles.inputBox}>
                        <label>End date</label>
                        <input type='date'  {...register("endDate")} className= {errors.endDate ? styles.inputError : ""} required/>
                    
                        <p className={styles.errorLabel}>{errors.endDate?.message}</p>
                    </div>
                    
                                   
                    <input type='submit' value="Register" name='submit' className={styles.btnLogin} />
                   
                   
                   
                </form>
            </div>
        
     
    )
}
export default EducationModal;