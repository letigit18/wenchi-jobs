
"use client"
import React, {useEffect} from 'react'
import styles from './cv-builder.module.css'
import { stepsData } from './topics'
import StepForm from '@/components/Multi-Step-Form/StepFormContainer'
import { useSelector, useDispatch } from 'react-redux'
import { getExperienceData } from '@/redux/multiStepForm'

const CVBuilder = () =>{
 const currentStep = useSelector((state)=> state.step.currentStep);

    return(
        <section className={styles.container}>
          <div className={styles.card}>
            <div className={styles.stepsContainer}>
                {stepsData.map((step, id) =>(
                  
                        <div className={styles.step}>
                          <span className={step.id !== currentStep ? styles.circle : `${styles.circle} ${styles.active}`}>{step.id < currentStep ? <i className='bx bx-check'></i> : step.id}</span>
                          <h3 key={id}>{step.title}</h3>
                          
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