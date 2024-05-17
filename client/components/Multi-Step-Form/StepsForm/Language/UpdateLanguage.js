"use client"
import React, {useEffect, useMemo, useState} from 'react'
import styles from '../steps.module.css'
import Link  from 'next/link';
import {useForm} from 'react-hook-form'
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'
import { useSelector, useDispatch} from 'react-redux';
import { addLanguageData, updateLanguageData } from '@/redux/multiStepForm';

const UpdateLanguage = ({closeModal, indexValue, languageData})=>{

    const isEnglish = useSelector((state)=>state.language.isEnglish)
    const formData = useSelector((state)=> state.CVBuilder.languageData)
    const [openInputField, setOpenInputField] = useState(false);
    const [language, setLanguage] = useState(formData[indexValue].language)
    const dispatch = useDispatch()
    //setting up the validation schema
    
    const validationSchema = yup.object().shape({
        language: yup.string().required("Language required"),
        proficiency: yup.string().required("Proficiency required"),
        other: yup.string()            
    })
    //linking the validation schema with the form data throuhg resolver
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(validationSchema),
       
    });
  
    //the function that handles the onsubmit form data 
    const onSubmit = (data) =>{
        
        const response = fetch(process.env.NEXT_PUBLIC_SERVER_ADDRESS+'/update-language-data', {
            method: "put",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({id: data.id, userId: data.userId, language: data.language, other: data.other, proficiency: data.proficiency})
        })
        .then(response => {
        
        dispatch(updateLanguageData({id: data.id, userId: data.userId, language: data.language, other: data.other, proficiency: data.proficiency}))
        closeModal(false)
        
        
        })
        
    }
 
    return(
        
            <div className={styles.languageCard} >
              
                <div className={styles.header}>
                     <h3>Update Language Data </h3>
                     
                     <div className={styles.close} onClick={()=>closeModal(false)}>X</div>
                     <div className={styles.closeToolTip}>
                        Close
                     </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                   <input type='hidden' value={formData[indexValue].id} {...register("id")} />
                   <input type='hidden' value={formData[indexValue].userId} {...register("userId")} />
                   <div className={styles.inputBox} >
                        <label htmlFor='language'>Language</label>
                        <select {...register("language")} value={language} onChange={e=>setLanguage(e.target.value)} className= {errors.language ? styles.inputError : ""} required>
                            <option></option>
                            <option value="Amharic">Amharic</option>
                            <option value="Oromic">Afan Oromo</option>
                            <option value="Chinese">Chinese</option>
                            <option value="English">English</option>
                            <option value="French">French</option>
                            <option value="Gurage">Guragegna</option>
                            <option value="Harari">Harari</option>
                            <option value="Somali">Somali</option>
                            <option value="Sidama">Sidamegna</option>
                            <option value="Tigregna">Tigregna</option>
                            <option value="Wolaita">Wolaitagna</option>
                            <option value="other">Other</option>
                        </select>
                        {language == 'other' && <input type='text' defaultValue={formData[indexValue].other} placeholder='Enter other language' style={{margin: '5px 0'}} {...register('other')} className= {errors.other ? styles.inputError : ""} />}
                       
                        
                        <p className={styles.errorLabel}>{errors.language?.message}</p>
                    </div>
                    <div className={styles.inputBox}>
                        <label htmlFor='proficiency' style={{marginTop: '15px'}}>Proficiency</label>
                        <select defaultValue={formData[indexValue].proficiency} {...register("proficiency")} className= {errors.proficiency ? styles.inputError : ""} required>
                            <option></option>
                            <option value="Basic">Basic</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Fluent">Fluent</option>
                            <option value="Native">Native</option>
                            
                           
                        </select>
                                             
                        
                        <p className={styles.errorLabel}>{errors.proficiency?.message}</p>
                    </div>
                   
                                   
                    <input type='submit' value="Update" name='submit' className={styles.btnLogin} style={{marginTop: '25px'}}/>
                   
                   
                   
                </form>
            </div>
        
     
    )
}
export default UpdateLanguage;