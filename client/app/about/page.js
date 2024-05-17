"use client"
import React, { useContext, useState } from 'react'
import styles from './about.module.css'
import Link from 'next/link'
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSelector, useDispatch} from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
const About = ()=>{
   const dispatch = useDispatch();
   const isEnglish = useSelector((state)=> state.language.isEnglish)
   const [error, setError] = useState('')
   const validationSchema = yup.object().shape(
    {
      email: yup.string().required("Email address is required").matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email address"),
      subject: yup.string(),
      userMessage: yup.string().required("Please input your message").min(4, "Please provide valid message").max(2000, "please write your message with less than 2000 characters")
    }
   )
   const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(validationSchema)
   });
   const onSubmit = (data) =>{
    fetch(process.env.NEXT_PUBLIC_SERVER_ADDRESS+'/send-feedback', {
    method: 'post',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
   })
   .then((res)=>{
      if(!res.ok){
        throw new error('Network error')
      }
      return res.json()
   })
   .then((data)=>{
      if(data.message == "Success"){
        toast.success("Your message has been sent. Thank you.", {
          position: "top-center"
        })
      }
      if(data.message == "Error"){
        setError("Error: Can't send an email to this email ")
        }
   })
   .catch(error=>{
    console.error('Error in fetching data')
   })

   }
    return(
        <section className={styles.container} id="about">
            <div className={styles.card}>
                <div className={styles.aboutContainer}>
                    <div className={styles.header}>
                    {isEnglish == "English" ? "About us" : isEnglish =="Oromic" ? `Waa'ee Kenya` : "ስለ እኛ"}
                    </div>
                    <div className={styles.body}>
                      {isEnglish == "English" &&
                      (
                      <p>Wenchijobs.com is the platform that connects job seekers and employers that are found in Ethiopia. The website is built with the intention of connecting the right talents to the posted jobs, and realize reliable recruitment process. It has features that allows the job seekers to build professional CV by using our CV Builder, view and apply for jobs, filter jobs based on custom criteria and being notified on the progress of the job application.
                      Besides, the website enables employers to post their job, to search for potential job seekers based on the required skill, to shortlist the job seekers based on custom criteria and to notify the job seekers on the progress of the job application.
                      Accordingly this website simplifies the routine and tedious tasks of Employers and support them to hire the right talent for their job. <br />
                      For more information you can contact us by the following contact information: 
                      </p>)   }
                     {isEnglish == "Oromic" && ` Wenchijobs.com waltajjii hojii barbaaddotaa fi hojjechiistota Itoophiyaa keessatti argaman wal qunnamsiisuu dha. Weebsaayitiin kun dandeettii sirrii hojiiwwan maxxanfaman waliin wal qunnamsiisuu fi adeemsa qacarrii amanamaa ta'e dhugoomsuu yaadamee kan ijaaramedha. Tajaajiloota Wenchijobs.com 'n kennaman keessaa:  hojii barbaaddonni CV qopheessaa kenyaa fayyadamuun CV ogeessaa qopheefachuu, hojii ilaaluu fi kara toora intarneetiittin hojiif iyyachuu, ulaagaa fedhii irratti hundaa’een  hojii calaluu ​​fi adeemsa iyyata hojii irratti beeksisaa argachuu ni dandeessisa.
                    Kana malees, hojjechiistonni hojii isaanii akka maxxansan, dandeetti barbaadamu irratti hundaa’uun namoota hojii barbaaduu danda’an akka argatan, ulaagaalee hojjechiistotaa irratti hundaa’uun hojii barbaaddota akka calalan, hojii barbaaddota dandeetti barbaadamu qaban afferuu  fi adeemsa iyyata hojii hojii barbaaddotaaf akka beeksisan kan dandeessisudha.
                    Haaluma kanaan websaytiin kun hojii idilee fi dadhabsiisaa Hojjechistotaa salphisee dandeettii hojii isaaniif ta’u akka qacaran deeggara. 
                    Odeeffannoo dabalataaf odeeffannoo quunnamtii armaan gadiitiin nu qunnamuu dandeessu:
                     `}
                     {isEnglish != "English" && isEnglish != "Oromic" &&
                     `
                     Wenchijobs.com በኢትዮጵያ የሚገኙ ሥራ ፈላጊዎችን እና አሰሪዎችን የሚያገናኝ ፕላትፎርም ነው። ድህረ ገጹ ትክክለኛ ክህሎቶችን ከተለጠፉት ስራዎች ጋር ለማገናኘት እና ታማኝ የቅጥር ስርአትን ለማሳካት ታልሞ የበለጸገ ነው። በድህረ ገጻችን ከሚሰጡ ኣገልግሎቶች መካካል ስራ ፈላጊዎች የእኛን CV Builder tool በመጠቀም ፕሮፌሽናል ሲቪ ማዘጋጀት፣ ስራዎችን መመልከት እና ለተለጠፉት ስራዎች በኦንላይን ማመልካት፣ በተፈለገዉ መስፈርት መሰረት ስራዎችን መፈለግ እና ባመለከቱት ስራ ላይ የሂደቱ የማሳወቂያ መልክት ማግኘት ያስችላል ።
                     በተጨማሪም ድረ-ገጹ ቀጣሪዎች ሥራቸውን እንዲለጥፉ፣ በሚፈለገው ክህሎት ላይ ተመስርተው ሥራ ፈላጊዎችን እንዲፈልጉ፣ እጩ የስራ አመልካቾች ዝርዝርን በራሳቸዉ መስፈርት መሰረት ማግኘት፤ ተፈላጊ የስራ ፋላጊዎችን ለስራ መጋበዝ እና የሥራ ማመልከቻውን ሂደት ለሥራ ፈላጊዎች ማሳወቅ ያስችላል።
                     በዚህ መሠረት ይህ ድህረ ገጽ የአሰሪዎችን መደበኛ እና አሰልቺ ስራዎችን ቀላል ያደርገዋል እና ለሥራቸው ትክክለኛውን ክህሎት ያላቸዉን ሰራተኞች እንዲቀጥሩ ያስችላቸዋል።
                     ለበለጠ መረጃ በሚከተሉት የማግኚያ መንገዶች ሊያገኙን ይችላሉ፡
                     `
                     
                     }
                    
                       
                      </div>
                </div>
                <div className={styles.contactContainer}>
                     <div className={styles.header}>
                     {isEnglish == "English" ? "Contact us" : isEnglish =="Oromic" ? `Nu Qunnamaa` : "ያግኙን"}
                    </div>
                    <div className={styles.socialContainer}>
                      <div className={styles.left}> 
                        <h3> {isEnglish == "English" ? "Follow us:" : isEnglish =="Oromic" ? `Nu Hordofaa` : "ይከተሉን"}</h3>
                        <Link href="#"><i className='bx bxl-facebook-circle' style={{color: '#316FF6'}}></i></Link>
                        <i className='bx bxl-linkedin-square' style={{color: '#0077b5 '}} ></i>
                        <i className='bx bxl-telegram' style={{color: '#0088cc'}}></i>
                      </div>
                      <div className={styles.right}> 
                         <h3> {isEnglish == "English" ? "Email:" : isEnglish =="Oromic" ? `Imeelii:` : "ኢሜል"}</h3> <Link href="#">info@wenchijobs.com</Link>
                      </div>
                    
                    </div>
                    <div className={styles.formContainer}>
                      <p>{error}</p>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <label className={styles.formControl} htmlFor='email'>
                          {isEnglish == "English" ? "Email:" : isEnglish =="Oromic" ? `Imeelii:` : "ኢሜል"}
                        </label>
                        <input type='text' className={errors.email ? `${styles.inputFieldError} ${styles.formControl} `: `${styles.formControl} `} placeholder='Enter your valid email' id="email" {...register("email")} />
                        <p className={styles.inputError}>{errors.email?.message}</p>
                        <label className={styles.formControl} htmlFor='subject'>
                          {isEnglish == "English" ? "Subject:" : isEnglish =="Oromic" ? `Mata duree Ergiichaa:` : "ርዕሰ ጉዳይ"}
                        </label>
                        <input type='text'  className={errors.subject ? `${styles.inputFieldError} ${styles.formControl} `: `${styles.formControl} `} placeholder='Enter your subject' id="subject" {...register("subject")} />
                        <p  className={styles.inputError}>{errors.subject?.message}</p>
                        <label className={styles.formControl} htmlFor='message'>
                          {isEnglish == "English" ? "Message:" : isEnglish =="Oromic" ? `Ergaa:` : "መልእክት"}
                        </label>
                        <textarea rows="5" cols="10" className={errors.userMessage ? `${styles.inputFieldError} ${styles.formControl} `: `${styles.formControl} `}placeholder='Enter your message here.' {...register("userMessage")}></textarea>
                        <p className={styles.inputError}>{errors.userMessage?.message}</p>
                        <input type='submit' value= {isEnglish == "English" ? "Send" : isEnglish =="Oromic" ? `Ergii` : "ላክ"} className={styles.btnDark} />
                      </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </section>
    )
}
export default About;