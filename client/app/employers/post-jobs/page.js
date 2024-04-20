"use client"
import React, {useMemo, useEffect, useState} from 'react'
import styles from './postjobs.module.css'
import {useForm} from 'react-hook-form'
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic'
const PostJobs = ()=>{
  const [jobCategory, setJobCategory] = useState([])
  const [oroForm, setOroForm] = useState(false)
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }),[]);
  const validationSchema = yup.object().shape({})
  const {register, setValue, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(validationSchema),
   
});
//fetching job category from db
useEffect(()=>{
  fetch("http://localhost:5000/fetch-job-category")
  .then((res)=>{
    return res.json()
  })
  .then((data)=>{
    setJobCategory(data)
    console.log(data)
  })
}, [])

    return(
        <section className={styles.container}>
          <div className={styles.card}>
            <form>
                <div className={styles.formContainer}>
                   <h2>Job Registration </h2>
                   <p>
                    <span>All information with * symbol must be filled!</span>
                    <span className={styles.checkbox}>
                      <input type="checkbox" value={oroForm} name="oroForm" onChange={(e)=> setOroForm(!oroForm)}  />
                       Enable Oromiffa Job Post
                    </span>
                  </p>
                   <div className={styles.formContainerEng}>
                         <div className={styles.inputBox}>
                            <label>Job Title*</label>
                            <input type='text' {...register("jobTitle")} className={styles.formControl} />
                          </div>
                    
                          <div className={styles.inputBox}>
                            <label>Job category*</label>
                            <select {...register("jobCategory")} className={styles.formControl}>
                              {jobCategory?.map((category, index)=>{
                              return <option value={category.categoryName}>{category.categoryName}</option>
                              })}
                            </select>
                          </div>
                          <div className={styles.inputBox}>
                            <label>Employement type*</label>
                            <select {...register("jobCategory")} className={styles.formControl}>
                              <option></option>
                              <option value="Contractual">Contractual</option>
                              <option value="Permanent">Permanent</option>
                              <option value="Remote">Remote job</option>
                            </select>
                          </div>
                   </div>
                   <div className={styles.formContainerEng}>
                         <div className={styles.inputBox}>
                            <label>Salary(in number) </label>
                            <input type='text' {...register("salaryInNumber")} className={styles.formControl} />
                          </div>
                    
                          <div className={styles.inputBox}>
                            <label>Salary(in text)</label>
                            <select {...register("salaryInText")} className={styles.formControl}>
                              <option></option>
                              <option value="As per the company scale">As per the company scale</option>
                              <option value="As per the company scale & very attractive">As per the company scale & very attractive</option>
                              <option value="As per the Banks salary scale">As per the Banks salary scale</option>
                              <option value="As per Higher Institution Education salary scale">As per Higher Institution Education salary scale</option>
                              <option value="Negotiable">Negotiable</option>
                            </select>
                          </div>
                          <div className={styles.inputBox}>
                            <label>Job experience(in years)</label>
                            <input type='text' {...register("experience")} className={styles.formControl} />
                          </div>
                   </div>
                   <div className={styles.formContainerEng}>
                         <div className={styles.inputBox}>
                            <label>Required Number </label>
                            <input type='text' {...register("requiredNumber")} className={styles.formControl} />
                          </div>
                    
                          <div className={styles.inputBox}>
                            <label>Closing date(G.C.)</label>
                            <input type='date' className={styles.formControl} {...register("closingDate")} />
                          </div>
                          <div className={styles.inputBox}>
                            <label>Job Location</label>
                            <input type='text' {...register("location")} className={styles.formControl} />
                          </div>
                   </div>
                   <div className={styles.formContainerTextArea}>
                         <div className={styles.inputBoxQuill} style={{width: '100%'}}>
                            <label>Job requirement*</label>
                            <ReactQuill theme="snow" id="jobResponsibility" placeholder='Enter your main responsibility in the form of list not more than 5 lines' className={styles.textArea}  />
                            <p></p>
                         </div>
                        
                   </div>
                   <div className={styles.formContainerTextArea}>
                         <div className={styles.inputBoxQuill}>
                            <label>How to Apply* </label>
                            <ReactQuill theme="snow" id="jobResponsibility" placeholder='Enter your main responsibility in the form of list not more than 5 lines' className={styles.textArea}  />
                            <p></p>
                         </div>
                         <div className={styles.inputBoxQuill}>
                            <label>Job description </label>
                            <ReactQuill theme="snow" id="jobResponsibility" placeholder='Enter your main responsibility in the form of list not more than 5 lines' className={styles.textArea}  />
                            <p></p>
                         </div>
                   </div>
                 
                   <div className={oroForm ? `${styles.buttonContainer} ${styles.active}` : styles.buttonContainer}>
                       <input type="submit" value= "Register job" className={styles.btnSubmit} />
                       <input type='reset' value="Reset" className={styles.btnReset} />
                   </div>
                   
                </div>
                {/** form container for Afan Oromo */}
                <div className={oroForm ? `${styles.formContainerOro} ${styles.active}` : styles.formContainerOro}>
                   <h2>Galmee Hojii </h2>
                   <p><span>Odeeffannoowwan mallattoo * qabaan hundii guutamuu qabu!</span></p>
                   <div className={styles.formContainerEng}>
                         <div className={styles.inputBox}>
                            <label>Maqaa Hojii*</label>
                            <input type='text' {...register("jobTitle")} className={styles.formControl} />
                          </div>
                    
                          <div className={styles.inputBox}>
                            <label>Gosa Hojii*</label>
                            <select {...register("jobCategory")} className={styles.formControl}>
                            {jobCategory?.map((category, index)=>{
                              return <option value={category.categoryOromic}>{category.categoryOromic}</option>
                              })}
                            </select>
                          </div>
                          <div className={styles.inputBox}>
                            <label>Haala Qacarrii*</label>
                            <select {...register("jobCategory")} className={styles.formControl}>
                              <option></option>
                              <option value="Kontiraataan">Kontiraataan</option>
                              <option value="dhaabbataan">dhaabbataan</option>
                              <option value="Riimootiin">Riimootiin</option>
                            </select>
                          </div>
                   </div>
                   <div className={styles.formContainerEng}>
                         <div className={styles.inputBox}>
                            <label>Mindaa</label>
                            <input type='text' {...register("location")} className={styles.formControl} />
                          </div>
                          <div className={styles.inputBox}>
                            <label>Mindaa(in text)</label>
                            <select {...register("salaryInText")} className={styles.formControl}>
                              <option></option>
                              <option value="Akka iskeelii mindaa dhaabbatichaa">Akka iskeelii dhaabbatichaa</option>
                              <option value="Akka iskeelii mindaa dhaabbatichaa fi baayyee hawwataadha">Akka iskeelii dhaabbatichaa fi baayyee hawwataadha</option>
                              <option value="Akka iskeelii mindaa Baankichaatiin">Akka iskeelii mindaa Baankichaatiin</option>
                              <option value="Akka iskeelii mindaa Barnoota Dhaabbata Olaanoo">Akka iskeelii mindaa Barnoota Dhaabbata Olaanoo</option>
                              <option value="Waliigalteen">Waliigalteen</option>
                            </select>
                          </div>
                          <div className={styles.inputBox}>
                            <label>Bakka Hojii</label>
                            <input type='text' {...register("location")} className={styles.formControl} />
                          </div>
                        
                   </div>
                   <div className={styles.formContainerEng}>
                         <div className={styles.inputBox}>
                            <label>Bay'inaa Barbaadamuu  </label>
                            <input type='number' {...register("requiredNumber")} className={styles.formControl} />
                          </div>
                    
                          <div className={styles.inputBox}>
                            <label>Guyyaa cufiinsaa(G.C.)</label>
                            <input type='date' className={styles.formControl} {...register("closingDate")} />
                          </div>
                          <div className={styles.inputBox}>
                            <label>Bakka Hojii</label>
                            <input type='text' {...register("location")} className={styles.formControl} />
                          </div>
                   </div>
                  
                   <div className={styles.formContainerTextArea}>
                         <div className={styles.inputBoxQuill} style={{width: '100%'}}>
                            <label>Ulaagaa Hojii*</label>
                            <ReactQuill theme="snow" id="jobResponsibility" placeholder='Enter your main responsibility in the form of list not more than 5 lines' className={styles.textArea}  />
                            <p></p>
                         </div>
                        
                   </div>
                   <div className={styles.formContainerTextArea}>
                         <div className={styles.inputBoxQuill}>
                            <label>Haala Galmee* </label>
                            <ReactQuill theme="snow" id="jobResponsibility" placeholder='Enter your main responsibility in the form of list not more than 5 lines' className={styles.textArea}  />
                            <p></p>
                         </div>
                         <div className={styles.inputBoxQuill}>
                            <label>Ibsa hojii </label>
                            <ReactQuill theme="snow" id="jobResponsibility" placeholder='Enter your main responsibility in the form of list not more than 5 lines' className={styles.textArea}  />
                            <p></p>
                         </div>
                   </div>
                 
                  
                   
                </div>
               
            </form>
          </div>
        </section>
    )
}
export default PostJobs;