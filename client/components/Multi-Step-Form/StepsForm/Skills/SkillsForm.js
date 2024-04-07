
import React, { useState, useEffect } from 'react'
import NavButtons from '../../NavButtons'
import {useForm} from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux';
import { changeStep } from '@/redux/step'
import styles from '../steps.module.css'
import AddSkill from './AddSkill';
import {deleteSkillsData, getSkillsData } from '@/redux/multiStepForm';
import UpdateSkill from './UpdateSkill';
const SkillsForm = () =>{

    const currentStep = useSelector((state)=> state.step.currentStep);
    const skillData = useSelector((state)=> state.CVBuilder.skillData)
    const [indexValue, setIndexValue] = useState(0);
    const [skillModalOpen, setSkillModalOpen] = useState(false)
    const [updateModalOpen, setUpdateModalOpen] = useState(false)
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();
    //fetching language data
    useEffect(() => {
        fetch('http://localhost:5000/fetch-skill-data')
          .then((res) => {
            return res.json();
          })
          .then((data) => {
           dispatch( getSkillsData(data))
          });
      }, []);
    //handle delete language
    const handleDelete = (id, userId)=>{
        console.log(id)
        fetch('http://localhost:5000/delete-skill-data',{
          method: "delete",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({id: id, userId: userId})
        })
        .then(res =>{
          dispatch(deleteSkillsData({id, userId}))
        
        })
      }

    const onSubmit = () =>{
        dispatch(changeStep( currentStep + 1))
    }
    return(
        <section className={styles.formContainer}>
           <form onSubmit={handleSubmit(onSubmit)}>
             <table className={styles.table} >
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Skills</th>
                        <th>Profile Summary</th>
                        <th style={{textAlign: 'center'}}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {skillData.map((skill, index)=> {
                    return <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{skill.skills}</td>
                        <td>{skill.profileSummary}</td>
                        <td  className={styles.actionIcons} style={{textAlign: 'center'}} >
                      
                      <i className={`${styles.editButton} bx bx-edit`} style={{color:'green'}} onClick={()=>{setUpdateModalOpen(true), setIndexValue(index) }}></i>
                 
                      <i className={`${styles.deleteButton} bx bx-trash`} style={{color: 'red'}} onClick={()=>{handleDelete(skill.id, skill.userId)}}></i>
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
                        <td colSpan={4} className={styles.tdButton}><button type='button' onClick={()=>{setSkillModalOpen(true)}}  className={styles.addButton}><i className='bx bx-plus'></i>Add Skills</button></td>
                    </tr>
                </tbody>
             </table>
           <NavButtons />
           </form>

           {skillModalOpen && <AddSkill closeModal={setSkillModalOpen} />}
           {updateModalOpen && <UpdateSkill closeModal={setUpdateModalOpen} skillData={skillData} indexValue={indexValue}/>}
        </section>
    )
}
export default SkillsForm;
