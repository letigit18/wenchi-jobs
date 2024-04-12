"use client"
import React, { useContext, useEffect, useState } from 'react'
import styles from '../steps.module.css'
import Link  from 'next/link';
import {useFieldArray, useForm} from 'react-hook-form'
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'
import { useSelector, useDispatch} from 'react-redux';
import { updateEducationalData, } from '@/redux/multiStepForm';
import { redirect } from 'next/navigation';
const UpdateModal = ({closeModal, educationData, indexValue})=>{
    const date = new Date();
    date.toDateString();
    const isEnglish = useSelector((state)=>state.language.isEnglish)
    const [universityName, setUniversityName] = useState(educationData[indexValue].collegeName)
    const dispatch = useDispatch()
    //setting up the validation schema
    const validationSchema = yup.object().shape({
        educationalLevel: yup.string().required("Educational level required"),
        collegeName: yup.string().required("School name required"),
        category: yup.string().required("Education category required"),
        showOther: yup.boolean(),
        other: yup.string()
              .when("showOther", {
                is: (value) => value === true,
                then: (schema) => schema.required("Enter university name") 
              }),
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
    const {register,reset, watch, setValue, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(validationSchema),
       
    });
    //setting the value of the showOther hidden input value
   
   
    //the function that handles the onsubmit form data 
    const onSubmit = (data) =>{
       const response = fetch('http://localhost:5000/update-education-data', {
            method: "put",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({id: data.id, userId: data.userId, educationalLevel: data.educationalLevel, other: data.other, collegeName: data.collegeName, category: data.category, department: data.department, startDate: data.startDate, endDate: data.endDate, cgpa: data.cgpa})
        })
        .then(response =>{
            console.log(data)
        dispatch(updateEducationalData({id: data.id, userId: data.userId, educationalLevel: data.educationalLevel, other: data.other, collegeName: data.collegeName, category: data.category, department: data.department, startDate: data.startDate, endDate: data.endDate, cgpa: data.cgpa}))
        closeModal(false)
        })
    }
    return(
        
            <div className={styles.card}>
              
                <div className={styles.header}>
                     <h3>Update Education</h3>
                     
                     <div className={styles.close} onClick={()=>closeModal(false)}>X</div>
                     <div className={styles.closeToolTip}>
                        Close
                     </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <input type="hidden" {...register("userId")} value={educationData[indexValue].userId} />
                    <input type='hidden' {...register("id")} value={educationData[indexValue].id}/>
                    <div className={styles.inputBox}>
                        <label>Educational Level</label>
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
                        <select  {...register("collegeName")}  value={universityName} onChange={e => setUniversityName(e.target.value)} className= {errors.collegeName? styles.inputError : ""}  required>
                            <option value=''>Select</option>
                            <option value="Adama Science and Technology University">Adama Science and Technology university</option>
                            <option value="Addis Ababa Science and Technology University">Addis Ababa Science and Technology University</option>
                            <option value="Addis Ababa University">Addis Ababa University</option>
                            <option value="Addis College">Addis College</option>
                            <option value="Adigrat University">Adigrat University</option>
                            <option value="Admas University College">Admas University College</option>
                            <option value="Ambo University">Ambo University</option>
                            <option value="Arba Minch University">Arba Minch University</option>
                            <option value="Arsi University">Arsi University</option>
                            <option value="Axum University">Axum University</option>
                            <option value="Bahir Dar University">Bahir Dar University</option>
                            <option value="Bule Hora University">Bule Hora University</option>
                            <option value="Dandii Boruu College">Dandii Boruu College</option>
                            <option value="Debre Berhan University">Debre Berhan University</option>
                            <option value="Debre Markos University">Debre Markos University</option>
                            <option value="Defence University">Defence University</option>
                            <option value="Dembi Dolo University">Dembi Dolo University</option>
                            <option value="Dilla University">Dilla University</option>
                            <option value="Dire Dawa University">Dire Dawa University</option>
                            <option value="Ethiopian Civil Service University">Ethiopian Civil Service University</option>
                            <option value="Haramaya University">Haramaya University</option>
                            <option value="Hawassa University">Hawassa University</option>
                            <option value="Infolink University College">Infolink University College</option>
                            <option value="Jijiga University">Jijiga University</option>
                            <option value="Jimma University">Jimma University</option>
                            <option value="Jinka University">Jinka University</option>
                            <option value="Madda Walabu University">Madda Walabu University</option>
                            <option value="Mekelle University">Mekelle University</option>
                            <option value="Mizan-Tepi University">Mizan-Tepi University</option>
                            <option value="New Generation University College">New Generation University College</option>
                            <option value="Rift Valley University">Rift Valley University</option>
                            <option value="Samara University">Samara University</option>
                            <option value="St. Mary's University">St. Mary's University</option>
                            <option value="St. Paul's Hospital Millennium Medical College">St. Paul's Hospital Millennium Medical College</option>
                            <option value="Unity University">Unity University</option>
                            <option value="University of Gondar">University of Gondar</option>
                            <option value="Wachemo University">Wachemo University</option>
                            <option value="Wolaita Sodo University">Wolaita Sodo University</option>
                            <option value="Wolkite University">Wolkite University</option>
                            <option value="Wollega University">Wollega University</option>
                            <option value="Wollo University">Wollo University</option>
                            <option value="other">other</option>                                              
                       </select>
                        <p className={styles.errorLabel}>{errors.collegeName?.message}</p>
                        {universityName == 'other' && <input type='text' defaultValue={educationData[indexValue].other} {...register("other")} />}
                        <p className={styles.errorLabel}>{errors.other?.message}</p>
                    </div>
                    <div className={styles.inputBox}>
                        <label>Education category</label>
                        <select  {...register("category")} defaultValue={educationData[indexValue].category}  className= {errors.category? styles.inputError : ""}  required>
                            <option value=''>Select</option>
                            <option value="Accounting and Finance">Accounting and Finance</option>
                            <option value='Agricultural Science'>Agricultural Science</option>
                            <option value="Art and Design">Art and Design</option>
                            <option value="Automotive and Machinery">Automotive and Machinery</option>
                            <option value="Banking and Insurance">Banking and Insurance</option>
                            <option value="Economics">Economics</option>
                            <option value="Engineering">Engineering</option>
                            <option value="Health Science">Health Science</option>
                            <option value="Hotel and Hospitality">Hotel and Hospitality</option>
                            <option value="Information Technology">Informatics</option>
                            <option value="Legal">Legal studies</option>
                            <option value="Logistics and Transportation">Logistics and Transportation</option>
                            <option value="Management and Business Administration">Management and Business Administration</option>
                            <option value="Media and Journalism">Media and Journalism</option>
                            <option value="Music and Theatrical Art">Music and Theatrical Art</option>
                            <option value="Natural Science">Natural Science</option>
                            <option value="Project Management">Project Management</option>
                            <option value="Purchasing and Procurement">Purchasing and Procurement</option>
                            <option value="Sales and Marketing">Sales and Marketing</option>
                            <option value="Security">Security</option>
                            
                        </select>
                        <p className={styles.errorLabel}>{errors.category?.message}</p>
                    </div>
                    <div className={styles.inputBox}>
                        <label>Department</label>
                        <input type='text'   {...register("department")} defaultValue={educationData[indexValue].department} className= {errors.department ? styles.inputError : ""} required/>
                         
                        <p className={styles.errorLabel}>{errors.department?.message}</p>
                    </div>
                    <div className={styles.inputBoxRow}>
                        <div className={styles.col}>
                            <label>Start date</label>
                            <input type='date'  {...register("startDate")} defaultValue={`${moment(educationData[indexValue].startDate).format('YYYY-MM-DD')}`}className= {errors.startDate ? styles.inputError : ""} required />

                            <p className={styles.errorLabel}>{errors.startDate?.message}</p>
                        </div>
                        <div className={styles.col}>
                            <label>End date</label>
                            <input type='date'  {...register("endDate")} defaultValue={`${moment(educationData[indexValue].startDate).format('YYYY-MM-DD')}`} className= {errors.endDate ? styles.inputError : ""} required/>
                            <p className={styles.errorLabel}>{errors.endDate?.message}</p>
                        </div>
                        
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