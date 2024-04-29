
"use client"
import React, {useEffect} from 'react'
import styles from './cv-builder.module.css'
import { stepsData } from './topics'
import StepForm from '@/components/Multi-Step-Form/StepFormContainer'
import { useSelector, useDispatch } from 'react-redux'
import { getExperienceData, getImageData, getPersonalData } from '@/redux/multiStepForm'
import axios from 'axios'
const CVBuilder = () =>{
 const currentStep = useSelector((state)=> state.step.currentStep);
 const isEnglish = useSelector((state)=>state.language.isEnglish)
 const dispatch = useDispatch()
//check logged in users
// useEffect(()=>{
//   dispatch(loginStart())
//   axios.defaults.withCredentials = true
//   axios.get("http://localhost:5000/job-seekers-home")
//   .then((res)=>{
//      dispatch(loginStart())
//       if(res.data.valid)
//       {
//               dispatch(loginSuccess())
//                localStorage.setItem("userFirstName", res.data.userFirstName)
//                localStorage.setItem("userMiddleName", res.data.userMiddleName)
//                localStorage.setItem("userId", res.data.userId)

//       }
//       else{
//           dispatch(loginFailure())
//           window.location.href = "/auth"
//       }
//   })
// }, [])

    return(
        <section className={styles.container}>
          <div className={styles.card}>
            <div className={styles.stepsContainer}>
                {stepsData.map((step, id) =>(
                  
                        <div className={styles.step}>
                          <span className={step.id !== currentStep ? styles.circle : `${styles.circle} ${styles.active}`}>{step.id < currentStep ? <i className='bx bx-check'></i> : step.id}</span>
                          {isEnglish ? <h3 key={id}>{step.title}</h3> : <h3 key={id}>{step.titleOro}</h3>}
                          
                        </div>
                  
                ))
              
                }
              
                  {/** progress line */}
              </div>
              <div className={styles.formContainer}>
                  <StepForm />
              </div>
             
              
          </div>
        </section>
    )
}
export default CVBuilder;