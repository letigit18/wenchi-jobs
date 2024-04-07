"use client"
import React, { useContext, useState } from 'react'
import styles from '../steps.module.css'
import Link  from 'next/link';
import {useForm} from 'react-hook-form'
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'
import { useSelector, useDispatch} from 'react-redux';
import { redirect } from 'next/navigation';
import { updateEducationalFormData } from '@/redux/multiStepForm';
import moment from 'moment';
const UpdateModal = ({closeModal, educationData, indexValue})=>{
    const date = new Date();
    date.toDateString();
    const isEnglish = useSelector((state)=>state.language.isEnglish)
    const formData = useSelector((state)=> state.CVBuilder.educationalFormData)
    const dispatch = useDispatch()
    //setting up the validation schema
    const validationSchema = yup.object().shape({
        educationalLevel: yup.string().required("Educational level required"),
        collegeName: yup.string().required("School name required"),
        department: yup.string().required("Department required"),
        startDate: yup.date()
                   .typeError("Invalid date")
                   .required("Start date required")
                   .max(yup.ref("endDate"), "Start date shoudn't come after end date"),
        endDate: yup.date()
                   .typeError("Invalid date ")
                   .max(date, "Invalid date, future date not allowed")
                   .min(yup.ref("startDate"), "End date shouldn't come before start date"),
        cgpa: yup.number()
                    .typeError("CGPA must be a number")
                    .nullable()
                    .moreThan(0, "CGPA cannot be negative")
                    .lessThan(10, "Invalid CGPA")
                    .transform((_, val) => (val !== "" ? Number(val) : null)),
                    
    })
    //linking the validation schema with the form data throuhg resolver
    const {register,reset, watch, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(validationSchema),
       
    });

    //the function that handles the onsubmit form data 
    const onSubmit = (data) =>{
        fetch('http://localhost:5000/update-education-data', {
            method: 'put',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
        .then(res=>{
            dispatch(updateEducationalFormData({id: data.id, userId: data.userId, educationalLevel: data.educationalLevel, department: data.department, collegeName:data.collegeName, cgpa: data.cgpa, startDate: data.startDate, endDate:data.endDate}))
            console.log(data.userId)
        })
        
        closeModal(false)
    }
    return(
        
            <div className={styles.card}>
              
                <div className={styles.header}>
                     <h3>Update Educational Level</h3>
                     
                     <div className={styles.close} onClick={()=>closeModal(false)}>X</div>
                     <div className={styles.closeToolTip}>
                        Close
                     </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
         
                    <div className={styles.inputBox}>
                        <label>Educational Level</label>
                        <input type='hidden' {...register("userId")} defaultValue={1} />
                        <input type="hidden" {...register("id")} defaultValue={educationData[indexValue].id} />
                        <select  {...register("educationalLevel")} defaultValue={educationData[indexValue].educationalLevel} className= {errors.educationalLevel ? styles.inputError : ""} required>
                                <option></option>
                                <option  value="Level I Diploma">Level I Diploma</option>
                                <option  value="Level II Diploma">Level II Diploma</option>
                                <option  value="Level III Diploma">Level III Diploma</option>
                                <option  value="BSc. Degree">BSc. Degree</option>
                                <option  value="BA. Degree">BA Degree</option>
                                <option  value="Doctor of Medicine">Doctor Of Medicine</option>
                                <option  value="Veterinary">Veterinary Doctor</option>
                                <option  value="MSc.">MSc. Degree</option>
                                <option  value="ML. Degree">Master Of Laws</option>
                                <option  value="MA. Degree">MA Degree</option>
                                <option  value="MBA. Degree">MBA Degree</option>
                                <option  value="MPA. Degree">MPA Degree</option>
                                <option value="PhD">PhD</option>
                                <option value="Professor">Professor</option>
                        </select>
                
                       
                        <p className={styles.errorLabel}>{errors.educationalLevel?.message}</p>
                    </div>
                    <div className={styles.inputBox}>
                      
                        <label>University/College name</label>
                        <input type='text'   {...register("collegeName")} defaultValue={educationData[indexValue].collegeName} className= {errors.collegeName ? styles.inputError : ""} required/>
                        
                        <p className={styles.errorLabel}>{errors.collegeName?.message}</p>
                    </div>
                    <div className={styles.inputBox}>
                        <label>Department</label>
                        <input type='text'   {...register("department")} defaultValue={educationData[indexValue].department}className= {errors.department ? styles.inputError : ""} required/>
                         
                        <p className={styles.errorLabel}>{errors.department?.message}</p>
                    </div>
                    <div className={styles.inputBox}>
                        <label>Start date</label>
                        <input type='date'  {...register("startDate")} defaultValue={`${moment(formData[indexValue].startDate).format('YYYY-MM-DD')}`} className= {errors.startDate ? styles.inputError : ""} required />

                        <p className={styles.errorLabel}>{errors.startDate?.message}</p>
                    </div>
                    
                    <div className={styles.inputBox}>
                        <label>End date</label>
                        <input type='date'  {...register("endDate")} defaultValue={`${moment(formData[indexValue].endDate).format('YYYY-MM-DD')}`} className= {errors.endDate ? styles.inputError : ""} required/>
                    
                        <p className={styles.errorLabel}>{errors.endDate?.message}</p>
                    </div>
                    <div className={styles.inputBox}>
                        <label>CGPA</label>
                        <input type='text'  {...register("cgpa")} defaultValue={educationData[indexValue].cgpa} className= {errors.cgpa ? styles.inputError : ""} />
        
                        <p className={styles.errorLabel}>{errors.cgpa?.message}</p>
                    </div>
                                   
                    <input type='submit' value="Update" name='submit' className={styles.btnLogin} />
                   
                   
                   
                </form>
            </div>
        
     
    )
}
export default UpdateModal;