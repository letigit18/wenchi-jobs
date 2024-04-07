"use client"
import React, {useEffect, useMemo, useState} from 'react'
import styles from '../steps.module.css'
import Link  from 'next/link';
import {useForm} from 'react-hook-form'
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'
import { useSelector, useDispatch} from 'react-redux';
import { addLanguageData } from '@/redux/multiStepForm';

const AddLanguage = ({closeModal})=>{

    const isEnglish = useSelector((state)=>state.language.isEnglish)
    const languageData = useSelector((state)=> state.CVBuilder.languageData)
    let regId; 
    const [openInputField, setOpenInputField] = useState(false);
    const [otherVar, setOtherVar] = useState('')
    const [language, setLanguage] = useState('')
    const dispatch = useDispatch()
    //setting up the validation schema
    
    const validationSchema = yup.object().shape({
        
        language: yup.string().required("Language required"),
        proficiency: yup.string().required("Proficiency required"),
        showOther: yup.boolean(),
        other: yup.string()
               .when("showOther", {
                is: (value) => value === true,
                then: (schema) => schema.required("Enter other Language")
               })       
    })
    //get showOther value throute getter function
   
    //linking the validation schema with the form data throuhg resolver
    const {register, handleSubmit,setValue, formState: {errors}} = useForm({
        resolver: yupResolver(validationSchema),
       
    });
    useEffect(() => {
        if(language === 'other'){
        setValue('showOther', true);
        }
        else{
            setValue('showOther', false)
        }
      }, [language])
    const getRegId = () =>{
        if(languageData.length == 0){
            regId = 1;
            return regId;
        }
        else{
            return parseInt(languageData[languageData.length - 1].id) + 1;
        }
    }
  
    //the function that handles the onsubmit form data 
    const onSubmit = (data) =>{
        console.log(data.showOther)
        fetch('http://localhost:5000/create-language-data', {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
        .then(response => {
         
        dispatch(addLanguageData({id: data.id, userId: data.userId, language: data.language, other: data.other, proficiency: data.proficiency}))
       
        closeModal(false)
        })
    }
 
    return(
        
            <div className={styles.languageCard} >
              
                <div className={styles.header}>
                     <h3>Add Language </h3>
                     
                     <div className={styles.close} onClick={()=>closeModal(false)}>X</div>
                     <div className={styles.closeToolTip}>
                        Close
                     </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                   <input type='hidden' {...register("id")} value={getRegId()}  />
                   <input type='hidden' value={1} {...register("userId")} />
                   <div className={styles.inputBox} >
                        <label htmlFor='language'>Language</label>
                        <select {...register("language")}  onChange={e=>setLanguage(e.target.value)} className= {errors.language ? styles.inputError : ""} required>
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
                        <input {...register("showOther")}  type='hidden' value={language} />
                        {language === 'other' && <input type='text' placeholder='Enter Language' style={{margin: '5px 0'}} {...register('other')} className= {errors.other ? styles.inputError : ""} />}
                        <p className={styles.errorLabel}>{errors.other?.message}</p>
                        
                        <p className={styles.errorLabel}>{errors.language?.message}</p>
                    </div>
                    <div className={styles.inputBox}>
                        <label htmlFor='proficiency' style={{marginTop: '15px'}}>Proficiency</label>
                        <select {...register("proficiency")} className= {errors.proficiency ? styles.inputError : ""} required>
                            <option></option>
                            <option value="Basic">Basic</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Fluent">Fluent</option>
                            <option value="Native">Native</option>
                            
                           
                        </select>
                                             
                        
                        <p className={styles.errorLabel}>{errors.proficiency?.message}</p>
                    </div>
                   
                                   
                    <input type='submit' value="Register" name='submit' className={styles.btnLogin} style={{marginTop: '25px'}}/>
                   
                   
                   
                </form>
            </div>
        
     
    )
}
export default AddLanguage;