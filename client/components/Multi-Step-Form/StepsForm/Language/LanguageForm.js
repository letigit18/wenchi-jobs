
import React, { useState, useEffect } from 'react'
import NavButtons from '../../NavButtons'
import {useForm} from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux';
import { changeStep } from '@/redux/step'
import styles from '../steps.module.css'
import AddLanguage from './AddLanguage';
import { getLanguageData, deleteLanguageData } from '@/redux/multiStepForm';
import UpdateLanguage from './UpdateLanguage';
const LanguageForm = () =>{

    const currentStep = useSelector((state)=> state.step.currentStep);
    const languageData = useSelector((state)=> state.CVBuilder.languageData)
     const [indexValue, setIndexValue] = useState(0);
    const [languageModalOpen, setLanguageModalOpen] = useState(false)
    const [updateModalOpen, setUpdateModalOpen] = useState(false)
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();
    //fetching language data
    useEffect(() => {
        fetch('http://localhost:5000/fetch-language-data')
          .then((res) => {
            return res.json();
          })
          .then((data) => {
           dispatch(getLanguageData(data))
          });
      }, []);
    //handle delete language
    const handleDelete = (id, userId)=>{
        console.log(id)
        fetch('http://localhost:5000/delete-language-data',{
          method: "delete",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({id: id, userId: userId})
        })
        .then(res =>{
          dispatch(deleteLanguageData({id, userId}))
        
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
                        <th>Language</th>
                        <th>Proficiency</th>
                        <th style={{textAlign: 'center'}}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {languageData.map((language, index)=> {
                    return <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{language.language != 'other' ? language.language : language.other}</td>
                        <td>{language.proficiency}</td>
                        <td  className={styles.actionIcons} style={{textAlign: 'center'}} >
                      
                      <i className={`${styles.editButton} bx bx-edit`} style={{color:'green'}} onClick={()=>{setUpdateModalOpen(true), setIndexValue(index) }}></i>
                 
                      <i className={`${styles.deleteButton} bx bx-trash`} style={{color: 'red'}} onClick={()=>{handleDelete(language.id, language.userId)}}></i>
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
                        <td colSpan={4} className={styles.tdButton}><button type='button' onClick={()=>{setLanguageModalOpen(true)}}  className={styles.addButton}><i className='bx bx-plus'></i>Add Language</button></td>
                    </tr>
                </tbody>
             </table>
           <NavButtons />
           </form>

           {languageModalOpen && <AddLanguage closeModal={setLanguageModalOpen} />}
           {updateModalOpen && <UpdateLanguage closeModal={setUpdateModalOpen} languageData={languageData} indexValue={indexValue}/>}
        </section>
    )
}
export default LanguageForm;
