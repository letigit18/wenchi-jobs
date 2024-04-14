"use client"
import React, {useRef, useState} from 'react'
import styles from './skill.module.css'
import Link  from 'next/link';
import {useForm} from 'react-hook-form'
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'
import { useSelector, useDispatch} from 'react-redux';
import { updateSkillsData } from '@/redux/multiStepForm';

const UpdateSkill= ({closeModal, skillData, indexValue})=>{

    const isEnglish = useSelector((state)=>state.language.isEnglish)
    const [openInputField, setOpenInputField] = useState(false);
    let skillArray = skillData[indexValue].skills.split(",");
    const [skillTag, setSkillTag] = useState(skillArray)
    const inputRef = useRef(null)
    const dispatch = useDispatch()
    //setting up the validation schema
    
    const validationSchema = yup.object().shape({     
        profileSummary: yup.string().required("Profile summary required")
                        .min(50, 'Please Enter informative profile summary')
                        .max(500, "Your summary should not exceed 500 characters"),
       
    })
    //linking the validation schema with the form data throuhg resolver
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(validationSchema),
       
    });
       //handle skills key down event handler function
       const handleKeyDown = (e) =>{
        if(e.key !== 'Enter') return
        const value = e.target.value;
        if(!value.trim()) return
        setSkillTag([...skillTag, value])
        e.target.value = ''
        
    }
    //handle clear 
    const handleClear = (index)=>{
        setSkillTag(skillTag.filter((skill, i)=> i !== index ))
    }
    const getRegId = () =>{
        if(languageData.length == 0){
            regId = 1;
            return regId;
        }
        else{
            return parseInt(languageData[languageData.length - 1].id) + 1;
        }
    }
    const preventEnterKeySubmission = (e)=>{
        if(e.key === 'Enter'){
            e.preventDefault()
        }
    }
  
    //the function that handles the onsubmit form data 
    const onSubmit = (data, e) =>{
        e.preventDefault()
        const response = fetch('http://localhost:5000/update-skill-data', {
            method: "put",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({id: data.id, userId: data.userId, skills: skillTag.join(), profileSummary: data.profileSummary})
        })
        .then(response => {
        
            dispatch(updateSkillsData({id: data.id, userId: data.userId, skills: skillTag.join(), profileSummary: data.profileSummary}))
        closeModal(false)
        
        
        })
        
    }
 
    return(
        
            <div className={styles.skillCard} >
              
                <div className={styles.header}>
                     <h3>Update Language Data </h3>
                     
                     <div className={styles.close} onClick={()=>closeModal(false)}>X</div>
                     <div className={styles.closeToolTip}>
                        Close
                     </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} onKeyPress={preventEnterKeySubmission} noValidate>
                   <input type='hidden' value={skillData[indexValue].id} {...register("id")} />
                   <input type='hidden' value={skillData[indexValue].userId} {...register("userId")} />
                   <label>Skills</label>
                   <div className={styles.skillContainer} >
                       {skillTag.map((s, index)=>(
                                <div className={styles.skillItem} key={index}>
                                  <span className={styles.skillName}>{s}</span>
                                  <span onClick={()=>handleClear(index)} className={styles.close}>&times;</span>
                                                  
                                </div>
                          ))}
                        <input ref={inputRef} type='text' onKeyDown={handleKeyDown}  className={styles.skillInput} placeholder='Enter your skill & hit enter' autoFocus={true}/>
                        
                    </div>
                   
                    <div className={styles.inputBox}>
                        <label htmlFor='profileSummary'>Profile Summary</label>
                        <textarea rows={8} placeholder='enter profile summary ' defaultValue={skillData[indexValue].profileSummary}{...register("profileSummary")} className= {errors.profileSummary ? styles.inputError : ""} autoFocus={false} >

                        </textarea>         
                        
                        <p className={styles.errorLabel}>{errors.profileSummary?.message}</p>
                    </div>
                   
                    
                                   
                    <input type='submit' value="Update" name='submit' className={styles.btnLogin} style={{marginTop: '25px'}}/>
                   
                   
                   
                </form>
            </div>
        
     
    )
}
export default UpdateSkill;