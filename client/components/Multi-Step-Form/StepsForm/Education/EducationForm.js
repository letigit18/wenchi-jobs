import React from 'react'
import {useForm} from 'react-hook-form'
import NavButtons from '../../NavButtons'
import TextInput from '@/components/FormInputs/TextInput';
import { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { changeStep } from '@/redux/step';
import styles from '../steps.module.css'
import EducationModal from './EducationModal';
import UpdateModal from './UpdateModal';
import moment from 'moment'
import Link from 'next/link';
import { deleteEducationalFormData, getEducationalData } from '@/redux/multiStepForm';
const EducationForm = () =>{
    const [educationModalOpen, setEducationModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [indexValue, setIndexValue] = useState(0);

    const dispatch = useDispatch();
    const currentStep = useSelector((state)=> state.step.currentStep);
    const educationalFormData = useSelector((state)=>state.CVBuilder.educationalFormData);
    const {register, handleSubmit} = useForm();
    useEffect(() => {
      fetch('http://localhost:5000/fetch-educational-data')
        .then((res) => {
          return res.json();
        })
        .then((data) => {
         dispatch(getEducationalData(data))
        });
    }, []);
    
    const onSubmit = (data)=>{
        if(educationalFormData.length > 0){
        dispatch(changeStep(currentStep + 1))
        }
       
    }
    //function that deletes the educational data
    const handleDelete = (id, userId)=>{
      fetch('http://localhost:5000/delete-education-data',{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({id: id, userId: userId})
      })
      .then(res =>{
        dispatch(deleteEducationalFormData({id}))
      })
    }
    return(
        <section className={styles.formContainer}>
             <form onSubmit={handleSubmit(onSubmit)}>
                <table className={styles.table}>
                 <thead>
                  <tr>
                    <th>No. </th>
                    <th>Level of Education</th>
                    <th>University(College) name</th>
                    <th>Department</th>
                    <th>CGPA</th>
                    <th>Start date</th>
                    <th>End date </th>
                    <th>Actions </th>
                  </tr>
                 </thead>
                 <tbody>
               
                { educationalFormData?.map((formData, index)=>{
                 return <tr key={index}>
                      <td>
                          {index+1}
                      </td>
                      <td>
                        {formData.educationalLevel}
                      </td>
                      <td>
                        {formData.collegeName === "other" ? formData.other : formData.collegeName}
                      </td>
                      <td>
                        {formData.department}
                      
                      </td>
                      <td>
                        {formData.cgpa}
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
                      
                      <td colSpan={8} className={styles.tdButton}><button type='button' onClick={()=>{setEducationModalOpen(true)}}  className={styles.addButton}><i className='bx bx-plus'></i>Add Education</button></td>
                  </tr>
                  
                 </tbody>
                </table>
            
                <NavButtons />
           </form>
           {educationModalOpen && <EducationModal closeModal={setEducationModalOpen}/>}
           {updateModalOpen && <UpdateModal closeModal={setUpdateModalOpen} educationData={educationalFormData} indexValue={indexValue}/>}
        </section>
    )
}
export default EducationForm;
