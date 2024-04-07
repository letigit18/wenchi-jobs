"use client"
import React, {useEffect, useMemo, useState} from 'react'
import styles from '../steps.module.css'
import Link  from 'next/link';
import {useForm} from 'react-hook-form'
import * as yup from 'yup';
import moment from 'moment';
import {yupResolver} from '@hookform/resolvers/yup'
import { useSelector, useDispatch} from 'react-redux';
import { addEducationalFormData, addExperienceData, setFormData, updateExperienceData } from '@/redux/multiStepForm';
import { redirect } from 'next/navigation';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation';
import { changeStep } from '@/redux/step';
const UpdateModal = ({closeModal, experienceData, indexValue})=>{
    //react quill input
    const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }),[]);
    
    const date = new Date();
    date.toDateString();
    const currentStep = useSelector((state)=> state.step.currentStep);
    const isEnglish = useSelector((state)=>state.language.isEnglish)
    const formData = useSelector((state)=> state.CVBuilder.experienceData)
    const [editorContent, setEditorContent] = useState(experienceData[indexValue].jobResponsibility)
    const dispatch = useDispatch()
    const router = useRouter()
    //setting up the validation schema
    const validationSchema = yup.object().shape({
        jobTitle: yup.string().required("Job title required"),
        employerName: yup.string().required("Employer name required"),
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
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(validationSchema),
       
    });
    
    //the function that handles the onsubmit form data 
    const onSubmit = (data) =>{
     
        const response = fetch('http://localhost:5000/update-experience-data', {
            method: "put",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({id: data.id, userId: data.userId, jobTitle: data.jobTitle, employerName: data.employerName, jobResponsibility: editorContent, startDate: data.startDate, endDate: data.endDate})
        })
        .then(response => {
        
        dispatch(updateExperienceData({id: data.id, userId: data.userId, jobTitle: data.jobTitle, employerName: data.employerName, jobResponsibility: editorContent, startDate: data.startDate, endDate: data.endDate}))
        closeModal(false)
        
        
        })
        
       
    }
    //react quill watch
    

    return(
        
            <div className={styles.card}>
              
                <div className={styles.header}>
                     <h3>Update Job Experience</h3>
                     
                     <div className={styles.close} onClick={()=>closeModal(false)}>X</div>
                     <div className={styles.closeToolTip}>
                        Close
                     </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
         
                   <input type='hidden' {...register("userId")} defaultValue={1} />
                   <input type="hidden" {...register("id")} defaultValue={experienceData[indexValue].id} />
                   <div className={styles.inputBox}>
                        <label htmlFor='jobTitle'>Job Title</label>
                        <input type='text' id="jobTitle"  {...register("jobTitle")} defaultValue={experienceData[indexValue].jobTitle} className= {errors.jobTitle ? styles.inputError : ""} required/>
                        
                        <p className={styles.errorLabel}>{errors.jobTitle?.message}</p>
                    </div>
                    <div className={styles.inputBox}>
                        <label htmlFor='employerName'>Employer</label>
                        <input type='text' id="employerName"  {...register("employerName")} defaultValue={experienceData[indexValue].employerName} className= {errors.employerName ? styles.inputError : ""} required/>
                         
                        <p className={styles.errorLabel}>{errors.employerName?.message}</p>
                    </div>
                    <div className={styles.inputBoxQuill}>
                        <label htmlFor='jobResponsibility'>Job Responsibility</label>
                        
                        <ReactQuill theme="snow" id="jobResponsibility" value={editorContent} onChange={setEditorContent} className= {errors.jobResponsibility ? styles.inputError : ""} />
                        <p className={styles.errorLabel}></p>
                    </div>
                    <div className={styles.inputBox}>
                        <label>Start date</label>
                        <input type='date'  {...register("startDate")} defaultValue={`${moment(experienceData[indexValue].startDate).format('YYYY-MM-DD')}`} className= {errors.startDate ? styles.inputError : ""} required />

                        <p className={styles.errorLabel}>{errors.startDate?.message}</p>
                    </div>
                    
                    <div className={styles.inputBox}>
                        <label>End date</label>
                        <input type='date'  {...register("endDate")} defaultValue={`${moment(experienceData[indexValue].endDate).format('YYYY-MM-DD')}`} className= {errors.endDate ? styles.inputError : ""} required/>
                    
                        <p className={styles.errorLabel}>{errors.endDate?.message}</p>
                    </div>
                    
                                   
                    <input type='submit' value="Update" name='submit' className={styles.btnLogin} />
                   
                   
                   
                </form>
            </div>
        
     
    )
}
export default UpdateModal; 

  