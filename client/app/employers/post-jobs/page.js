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
                <h3>Register Job</h3>
                <div className={styles.formContainer}>
                    <div className={styles.inputBox}>
                      <label>Job Title</label>
                      <input type='text' {...register("jobTitle")} className={styles.formControl} />
                    </div>
                    <div className={styles.inputBox}>
                      <label>Maqaa hojii</label>
                      <input type='text' {...register("jobTitleOro")} className={styles.formControl} />
                    </div>
                    <div className={styles.inputBox}>
                      <label>Job category</label>
                      <select {...register("jobCategory")}>
                        <option>select</option>
                      </select>
                    </div>
                    <div className={styles.inputBox}>
                      <label>Gosa hojii</label>
                      <select {...register("jobCategoryOro")}>
                        <option>slect</option>
                      </select>
                    </div>
                </div>
            </form>
          </div>
        </section>
    )
}
export default PostJobs;