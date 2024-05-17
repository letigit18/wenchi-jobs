
import React, { useState, useEffect } from 'react'
import NavButtons from '../../NavButtons'
import {useForm} from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux';
import { changeStep } from '@/redux/step'
import styles from '../steps.module.css'
import AddSkill from './AddSkill';
import {deleteSkillsData, getSkillsData } from '@/redux/multiStepForm';
import UpdateSkill from './UpdateSkill';
import axios from 'axios';
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
const SkillsForm = () =>{

    const currentStep = useSelector((state)=> state.step.currentStep);
    const skillData = useSelector((state)=> state.CVBuilder.skillData)
    const [userId, setUserId] = useState(getUserId())
    const [indexValue, setIndexValue] = useState(0);
    const [skillModalOpen, setSkillModalOpen] = useState(false)
    const [updateModalOpen, setUpdateModalOpen] = useState(false)
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();
    
    //fetching language data
    useEffect(() => {
      async function fetchPersonalData(){
        await axios.get(process.env.NEXT_PUBLIC_SERVER_ADDRESS+'/fetch-skill-data/'+userId)
        .then((res)=>{
          dispatch(getSkillsData(res.data))
        })
        
        .catch(err=>console.log(err))
      }
      fetchPersonalData()
    }, []);
    //handle delete language
    const handleDelete = (id, userId)=>{
        fetch(process.env.NEXT_PUBLIC_SERVER_ADDRESS+'/delete-skill-data',{
          method: "delete",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({id: id, userId: userId})
        })
        .then(res =>{
          dispatch(deleteSkillsData({id, userId}))
        
        })
      }
 // formatting the skill data
 const formatSkill = (skill)=>{
  if(skill.length <=5){
    return(
      skill.map((s, i)=>{
        return <ul key={i}>
            <li style={{textIndent: '-3px'}}>{s}</li>
        </ul>
      })
    )
  }
  else{
    return (
      skill.map((s, i)=>{
        return <span>{`${s}, `}</span>
      })
    )
  }
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
                        
                        <th style={{paddingLeft: '10px'}}>Skills</th>
                        <th>Profile Summary</th>
                        <th style={{textAlign: 'center'}} stye={{width: '140px'}}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                  
               {skillData?.map((skill, index)=>{
                     return <tr>
                        
                        <td style={{paddingLeft: '30px'}}>{formatSkill(skill.skills.split(","))}</td>
                        <td style={{textAlign: "left"}}>{skill.profileSummary}</td>
                        <td  className={styles.actionIcons} style={{textAlign: 'center', width: '100px'}} >
                      
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
                      {skillData?.length === 0 &&  <td colSpan={3} className={styles.tdButton}><button type='button' onClick={()=>{setSkillModalOpen(true)}}  className={styles.addButton}><i className='bx bx-plus'></i>Add Skills</button></td> }
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
