
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