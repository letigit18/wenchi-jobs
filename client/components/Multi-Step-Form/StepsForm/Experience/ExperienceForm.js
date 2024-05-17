import React from 'react'
import {useForm} from 'react-hook-form'
import NavButtons from '../../NavButtons'
import TextInput from '@/components/FormInputs/TextInput';
import { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { changeStep } from '@/redux/step';
import styles from '../steps.module.css'
import ExperienceModal from './ExperienceModal';
import UpdateModal from './UpdateModal';
import moment from 'moment'
import Link from 'next/link';
import { deleteEducationalFormData, deleteExperienceData, getEducationalData, getExperienceData } from '@/redux/multiStepForm';
function getUserId(){
  if (typeof window !== 'undefined') {
      // Perform localStorage action
      let userId = window.localStorage.getItem('userId')
      if(userId){
          return userId
      }
      else{
          return;
      }
     
    }
   
}
const EducationForm = () =>{
    const [experienceModalOpen, setExperienceModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [indexValue, setIndexValue] = useState(0);
    const [userId, setUserId] = useState(getUserId())
    const dispatch = useDispatch();
    const currentStep = useSelector((state)=> state.step.currentStep);
    const experienceData = useSelector((state)=>state.CVBuilder.experienceData);
    const {register, handleSubmit} = useForm();

    const onSubmit = (data)=>{
        if(experienceData.length >= 0){
        dispatch(changeStep(currentStep + 1))
        }
       
    }

 useEffect(() => {
  fetch(process.env.NEXT_PUBLIC_SERVER_ADDRESS+'/fetch-experience-data/'+userId)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
     dispatch(getExperienceData(data))
    });
}, []);

    //function that deletes the educational data
    const handleDelete = (id, userId)=>{
      console.log(id)
      fetch(process.env.NEXT_PUBLIC_SERVER_ADDRESS+'/delete-experience-data',{
        method: "delete",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({id: id, userId: userId})
      })
      .then(res =>{
        dispatch(deleteExperienceData({id, userId}))
      
      })
    }
    return(
        <section className={styles.formContainer}>
             <form onSubmit={handleSubmit(onSubmit)}>
                <table className={styles.table}>
                 <thead>
                  <tr>
                    <th>No. </th>
                    <th>Job Title </th>
                    <th>Employer</th>
                    <th>Job Responsibility</th>
                    <th>Start date</th>
                    <th>End date </th>
                    <th>Actions </th>
                  </tr>
                 </thead>
                 <tbody>
               
                {experienceData?.map((formData, index)=>{
                 return <tr key={index}>
                      <td>
                          {index+1}
                      </td>
                      <td>
                        {formData.jobTitle}
                      </td>
                      <td>
                        {formData.employerName}
                      </td>
                      <td dangerouslySetInnerHTML={{__html: formData.jobResponsibility}} className={styles.tdScroll}>
                      
                        
                      </td>
                      <td>
                      {`${moment(formData.startDate).format('YYYY-MM-DD')}`} 
                      </td>
                      <td>
                      {`${moment(formData.endDate).format('YYYY-MM-DD')}`} 
                      </td>
                      <td className={styles.actionIcons}>
                      
                         <i className={`${styles.editButton} bx bx-edit`} style={{color:'green'}} onClick={()=>{setUpdateModalOpen(true), setIndexValue(index) }}></i>
                    
                         <i className={`${styles.deleteButton} bx bx-trash`} style={{color: 'red'}} onClick={()=>{handleDelete(formData.id, formData.userId)}}></i>
                         <span className={styles.editTooltip}>
                          Update
                         </span>
                         <span className={styles.deleteTooltip}>
                          Delete
                         </span>
                      </td>
                  </tr>
})}
                  <tr>
                      
                      <td colSpan={8} className={styles.tdButton}><button type='button' onClick={()=>{setExperienceModalOpen(true)}}  className={styles.addButton}><i className='bx bx-plus'></i>Add Experience</button></td>
                  </tr>
                  
                 </tbody>
                </table>
            
                <NavButtons />
           </form>
           {experienceModalOpen && <ExperienceModal closeModal={setExperienceModalOpen}/>}
           {updateModalOpen && <UpdateModal closeModal={setUpdateModalOpen} experienceData={experienceData} indexValue={indexValue}/>}
        </section>
    )
}
export default EducationForm;
