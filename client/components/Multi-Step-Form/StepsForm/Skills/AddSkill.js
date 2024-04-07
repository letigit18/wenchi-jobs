"use client"
import React, {useEffect, useState, useRef} from 'react'
import styles from './skill.module.css'
import Link  from 'next/link';
import {useForm} from 'react-hook-form'
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'
import { useSelector, useDispatch} from 'react-redux';
import { addLanguageData, addSkillsData } from '@/redux/multiStepForm';


const AddLanguage = ({closeModal})=>{

    const isEnglish = useSelector((state)=>state.language.isEnglish)
    const skillData = useSelector((state)=> state.CVBuilder.skillData)
    const [skillTag, setSkillTag] = useState([])
    const inputRef = useRef(null)
    let regId; 
    const dispatch = useDispatch()
    //setting up the validation schema
    
    const validationSchema = yup.object().shape({
        skills: yup.string().required("Skills required"),       
        profileSummary: yup.string().required("Profile summary required")
                        .min(50, 'Please Enter informative profile summary')
                        .max(500, "Your summary should not exceed 500 characters"),
       
    })
    //linking the validation schema with the form data throuhg resolver
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(validationSchema),
       
    });
    useEffect(() => {
        if (inputRef.current)
          inputRef.current.focus();
      }, [inputRef.current]);
    
    const getRegId = () =>{
        if(skillData.length == 0){
            regId = 1;
            return regId;
        }
        else{
            return parseInt(skillData[skillData.length - 1].id) + 1;
        }
    }
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
    //the function that handles the onsubmit form data 
    const onSubmit = (data) =>{
        
        fetch('http://localhost:5000/create-skill-data', {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
        .then(response => {
        dispatch(addSkillsData({id: regId, userId: data.userId, skills: data.skills, profileSummary: data.profileSummary}))
       
        closeModal(false)
        })
    }
 
    return(
        
            <div className={styles.skillCard} >
              
                <div className={styles.header}>
                     <h3>Add Skills </h3>
                     
                     <div className={styles.close} onClick={()=>closeModal(false)}>X</div>
                     <div className={styles.closeToolTip}>
                        Close
                     </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                   <input type='hidden' value={getRegId()} {...register("id")} />
                   <input type='hidden' value={1} {...register("userId")} />
                   <label>Skills</label>
                   <div className={styles.skillContainer} >
                       {skillTag.map((s, index)=>(
                                <div className={styles.skillItem} key={index}>
                                  <span className={styles.skillName}>{s}</span>
                                  <span onClick={()=>handleClear(index)} className={styles.close}>&times;</span>
                                                  
                                </div>
                          ))}
                        <input ref={inputRef} type='text' onKeyDown={handleKeyDown} className={styles.skillInput} placeholder='Enter your skill' autoFocus={true}/>
                        
                    </div>
                    <div className={styles.inputBox}>
                        <label htmlFor='profileSummary'>Profile Summary</label>
                        <textarea rows={8} placeholder='enter profile summary ' {...register("profileSummary")} className= {errors.profileSummary ? styles.inputError : ""} autoFocus={false} >

                        </textarea>         
                        
                        <p className={styles.errorLabel}>{errors.profileSummary?.message}</p>
                    </div>
                   
                                   
                    <input type='submit' value="Register" name='submit' className={styles.btnLogin} style={{marginTop: '5px'}}/>
                   
                   
                   
                </form>
            </div>
        
     
    )
}
export default AddLanguage;