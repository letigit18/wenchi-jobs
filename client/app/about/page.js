"use client"
import React, { useContext } from 'react'
import styles from './about.module.css'
import Link from 'next/link'
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSelector, useDispatch} from 'react-redux'
const About = ()=>{
   const dispatch = useDispatch();
   const isEnglish = useSelector((state)=> state.language.isEnglish)
   const validationSchema = yup.object().shape(
    {
      email: yup.string().required("Email address is required").matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email address"),
      subject: yup.string().required("Subject is required"),
      userMessage: yup.string().required("Please input your message").min(3, "Please provide valid message").max(2000, "please write your message with less than 2000 characters")
    }
   )
   const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(validationSchema)
   });
   const onSubmit = (data) =>{

   }
    return(
        <section className={styles.container} id="about">
            <div className={styles.card}>
                <div className={styles.aboutContainer}>
                    <div className={styles.header}>
                      {isEnglish ? 'About us' : `Waa'ee kenya`}
                    </div>
                    <div className={styles.body}>
                      {isEnglish ? 
                      `
                      Wenchijobs.com is the platform that connects job seekers and employers that are found in Ethiopia. The website is built with the intention of connecting the right talents to the posted jobs and realize reliable recruitment process. This website allows the job seekers to build professional CV by using our CV Builder, view and apply for jobs, filter jobs based on custom criteria and being notified on the progress of the job application.
                      Besides, the website enables employers to post their job, to search for potential job seekers, to shortlist the job seekers based on custom criteria and to notify the job seekers on the progress of the job application.
                      Accordingly this website simplifies the routine and tedious tasks of Employers and support them to hire the right talent for their job. <br />
                      For more information you can contact us by the following contact information: 
                      `
                      : ` Wenchijobs.com waltajjii hojii barbaaddotaa fi hojjechiistota Itoophiyaa keessatti argaman walitti hidhudha. Weebsaayitiin kun dandeettii sirrii hojiiwwan maxxanfaman waliin walqabsiisuu fi adeemsa qacarrii amanamaa dhugoomsuu yaadamee kan ijaaramedha. Weebsaayitiin kun hojii barbaaddonni CV ogeessaa ijaaruun CV Builder keenya fayyadamuun, hojii ilaaluu fi iyyachuu, ulaagaa amala irratti hundaa’uun hojii calaluu ​​fi adeemsa iyyata hojii irratti beeksisuu ni dandeessisa.`}
                    </div>
                </div>
                <div className={styles.contactContainer}>
                     <div className={styles.header}>
                        {isEnglish ? 'Contact us' : `nu qunnamaa`}
                    </div>
                    <div className={styles.socialContainer}>
                      <div className={styles.left}> 
                        <h3>Follow us:</h3>
                        <Link href="#"><i className='bx bxl-facebook-circle' style={{color: '#316FF6'}}></i></Link>
                        <i className='bx bxl-linkedin-square' style={{color: '#0077b5 '}} ></i>
                        <i className='bx bxl-telegram' style={{color: '#0088cc'}}></i>
                      </div>
                      <div className={styles.right}> 
                         <h3>Email:</h3> <Link href="#">mail@wenchijobs.com</Link>
                      </div>
                    
                    </div>
                    <div className={styles.formContainer}>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <label className={styles.formControl} htmlFor='email'>
                            Email
                        </label>
                        <input type='text' className={errors.email ? `${styles.inputFieldError} ${styles.formControl} `: `${styles.formControl} `} placeholder='Enter your valid email' id="email" {...register("email")} />
                        <p className={styles.inputError}>{errors.email?.message}</p>
                        <label className={styles.formControl} htmlFor='subject'>
                            Subject
                        </label>
                        <input type='text'  className={errors.subject ? `${styles.inputFieldError} ${styles.formControl} `: `${styles.formControl} `} placeholder='Enter your subject' id="subject" {...register("subject")} />
                        <p  className={styles.inputError}>{errors.subject?.message}</p>
                        <label className={styles.formControl} htmlFor='message'>
                            Message
                        </label>
                        <textarea rows="5" cols="10" className={errors.userMessage ? `${styles.inputFieldError} ${styles.formControl} `: `${styles.formControl} `}placeholder='Enter your message here.' {...register("userMessage")}></textarea>
                        <p className={styles.inputError}>{errors.userMessage?.message}</p>
                        <input type='submit' value="Send" className={styles.btnDark} />
                      </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default About;