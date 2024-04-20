"use client"
import React from 'react'
import styles from './postjobs.module.css'
import {useForm} from 'react-hook-form'
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'
const PostJobs = ()=>{
  const validationSchema = yup.object().shape({})
  const {register, setValue, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(validationSchema),
   
});

    return(
        <section className={styles.container}>
          <div className={styles.card}>
            <form>
                <div className={styles.formContainer}>
                   <h2>Post Job </h2>
                   <div className={styles.formContainerEng}>
                         <div className={styles.inputBox}>
                            <label>Job Title*</label>
                            <input type='text' {...register("jobTitle")} className={styles.formControl} />
                          </div>
                    
                          <div className={styles.inputBox}>
                            <label>Job category*</label>
                            <select {...register("jobCategory")} className={styles.formControl}>
                              <option>select</option>
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
                </div>
                {/** form container for Afan Oromo */}
                <div className={styles.formContainer}>
                    <h3>Hojii Maxxansii</h3>
                    <div className={styles.formContainerOro}>
                            <div className={styles.inputBox}>
                              <label>Job Title*</label>
                              <input type='text' {...register("jobTitle")} className={styles.formControl} />
                              <p>error</p>
                            </div>
                            <div className={styles.inputBox}>
                              <label>Maqaa hojii</label>
                              <input type='text' {...register("jobTitleOro")} className={styles.formControl} />
                            </div>
                            <div className={styles.inputBox}>
                              <label>Job category</label>
                              <select {...register("jobCategory")} className={styles.formControl}>
                                <option>select</option>
                              </select>
                            </div>
                            
                    </div>
                </div>
            </form>
          </div>
        </section>
    )
}
export default PostJobs;