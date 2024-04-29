"use client"
import React, {useMemo, useEffect, useState} from 'react'
import styles from './postjobs.module.css'
import {useForm} from 'react-hook-form'
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
const PostJobs = ()=>{
  const date = new Date();
  date.toDateString();
  let defaultOroDate = new Date()
  const [jobCategory, setJobCategory] = useState([])
  const [oroForm, setOroForm] = useState(false)
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }),[]);
  const validationSchema = yup.object().shape({
    jobTitle: yup.string().required("Job title required!")
              .min(4, "please enter valid job title!"),
    jobCategory: yup.string().required("Job category required!"),
    jobRequirement: yup.string().required("Job requirement required!")
                    .min(5, "Please enter valid job requirement!"),
    howToApply: yup.string().required("How apply info must be filled!")
                    .min(5, "Please enter valid job application information!"),
    jobDescription: yup.string().min(5, "Please enter valid job description information!"),
    workPlace: yup.string()
    .required("Work place is required")
    .min(3, "Invalid work place"),
    employmentType: yup.string().required("Employment type required!"),
    closingDate: yup.date()
    .typeError("Invalid closing date ")
    .min(date, "Closing date can't come before post date"),
    salary: yup.number()
    .typeError("Salary must be a number!")
    .nullable()
    .moreThan(0, "Invalid Salary")
    .transform((_, val) => (val !== "" ? Number(val) : null)),
    experience: yup.number()
    .typeError("Experience must be a number type")
    .nullable()
    .min(0, "Invalid experience")
    .max(51, "Invalid experience")
    .transform((_, val) => (val !== "" ? Number(val) : null)),
    requiredNumber: yup.number()
    .typeError("Required number must be number")
    .nullable()
    .moreThan(0, "Required no. should be more than 0")
    .transform((_, val) => (val !== "" ? Number(val) : null)),
    //afan oromo form validation
    jobTitleOro: yup.string()
    .when("validationChecker", {
      is: (value) => value === true,
      then: (schema) => 
        schema.required("Maqaa hojii guutaa!").min(3, "Maqaa hojii sirri galchaa!")
      
    }),
    jobCategoryOro: yup.string()
    .when("validationChecker", {
      is: (value) => value === true,
      then: (schema) => 
        schema.required("Gosa hojii filadhaa!")
      
    }),
    employmentTypeOro: yup.string()
    .when("validationChecker", {
      is: (value) => value === true,
      then: (schema) => 
        schema.required("Haala qacarrii filadhaa!")
      
    }),
    salaryOro: yup.number()
    .when("validationChecker", {
      is: (value) => value === true,
      then: (schema) => 
      schema.typeError("Salary must be a number!")
      .nullable()
      .moreThan(0, "Invalid Salary")
      .transform((_, val) => (val !== "" ? Number(val) : null)),
      
    }),
    experienceOro: yup.number()
    .when("validationChecker", {
      is: (value) => value === true,
      then: (schema) => 
            schema.typeError("Muuxannoo lakkoofsaan galchaa!")
          .nullable()
          .min(0, "Muuxannoo sirrii galchaa")
          .max(51, "Muuxannoo sirrii galchaa")
          .transform((_, val) => (val !== "" ? Number(val) : null)),
      
    }),
    requiredNumberOro: yup.number()
    .when("validationChecker", {
      is: (value) => value === true,
      then: (schema) => 
          schema.typeError("Baay'ina lakkofsaan galchaa")
          .nullable()
          .moreThan(0, "Baay'ina barbaadamuu sirri galchaa")
          .transform((_, val) => (val !== "" ? Number(val) : null)),
      
    }),
    closingDateOro: yup.string()
    .when("validationChecker", {
      is: (value) => value === true,
      then: (schema) => 
        schema.required("Guyyaa cuufinsaa guutaa")
        .typeError("Guyyaa cuufiinsaa filadhaa ")
        .min(8, "Dogooggora: Haala kanan galchaa GG/JJ/WWWW")
        .max(11, "Dogooggora: Haala kanan galchaa GG/JJ/WWWW")

    }),
    workPlaceOro: yup.string()
    .when("validationChecker", {
      is: (value) => value === true,
      then: (schema) => 
        schema.required("Bakka hojii guutaa!")
        .min(3, "Bakka hojii sirrii galchaa")
    }),
    jobRequirementOro: yup.string()
    .when("validationChecker", {
      is: (value) => value === true,
      then: (schema) => 
        schema.required("Ulaagaa hojii guutaa")
        .min(5, "Ulaagaa hojii sirrii guutaa")

    }),
    howToApplyOro: yup.string()
    .when("validationChecker", {
      is: (value) => value === true,
      then: (schema) => 
        schema.required("Haala galmee guutaa")
        .min(5, "Haala galmee sirrii guutaa")

    }),
    jobDescriptionOro: yup.string()
    .when("validationChecker", {
      is: (value) => value === true,
      then: (schema) => 
        schema.min(5, "Ibsa hojii sirrii ta'e guutaa")

    }),
  })

  const {register, setValue, reset, watch, formState, handleSubmit, formState: {errors, isSubmitSuccessful}} = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      salaryOro: 0,
      requiredNumberOro: 0,
      experienceOro: 0,
    }
});
//handling react quill input options 
 //react quill handling functions
 useEffect(() => {
  register("jobRequirement")
  register("howToApply")
  register("jobDescription")
  register("jobRequirementOro")
  register("howToApplyOro")
  register("jobDescriptionOro")
}, [register]);
//registering change to the job requirement
const onRequirementChange = (editorState) => {
  setValue("jobRequirement", editorState);
};
//registering change to how to apply 
const onHowToApplyChange= (editorState) => {
  setValue("howToApply", editorState);
}
//registering change to job description
const onDescriptionChange = (editorState)=>{
  setValue("jobDescription", editorState)
}
const onRequirementChangeOro = (editorState) => {
  setValue("jobRequirement", editorState);
};
//registering change to how to apply 
const onHowToApplyChangeOro= (editorState) => {
  setValue("howToApply", editorState);
}
//registering change to job description
const onDescriptionChangeOro = (editorState)=>{
  setValue("jobDescription", editorState)
}
//checking the language to the form 
useEffect(()=>{
  if(oroForm === false){
      setValue("validationChecker", false)
  }
  else{
      setValue("validationChecker", true)
  }

}, [oroForm])
//fetching job category from db
useEffect(()=>{
  fetch("http://localhost:5000/fetch-job-category")
  .then((res)=>{
    return res.json()
  })
  .then((data)=>{
    setJobCategory(data)
    console.log(data)
  })
}, [])
//the function that handles the onsubmit event
const onSubmit = (data)=>{
  fetch('http://localhost:5000/create-job-data', {
    method: "post",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
}).then((result)=>{
  if(result.ok){
    toast.success("Your job has been successfully submitted, it will be visible soon on the Job board!", {
      position: "top-center"
    })
  }
})
}
//reseting the form after submition
useEffect(() => {
  if (formState.isSubmitSuccessful) {
    reset({ jobTitle: "" })
  }
}, [formState, reset])
//react quill watch
const requirement = watch("jobRequirement")
const howToApplyContent = watch("howToApply")
const description = watch("jobDescription")
//react quill oro form 
const requirementOro = watch("jobRequirementOro")
const howToApplyContentOro = watch("howToApplyOro")
const descriptionOro = watch("jobDescriptionOro")
    return(
        <section className={styles.container}>
          <div className={styles.card}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className={styles.formContainer}>
                   <h2>Job Registration </h2>
                   <p>
                    <span>All information with * symbol must be filled!</span>
                    <span className={styles.checkbox}>
                      <input type="checkbox" value={oroForm} name="oroForm" onChange={(e)=> setOroForm(!oroForm)}  />
                       Enable Oromiffa Job Post
                    </span>
                  </p>
                   <div className={styles.formContainerEng}>
                         <input type='hidden' {...register("companyId")} value={1} />
                         <div className={styles.inputBox}>
                            <label>Job Title*</label>
                            <input type='text' {...register("jobTitle")} className= {errors.jobTitle ? `${styles.formControl} ${styles.inputError}` : styles.formControl}  />
                            <p className={styles.errorLabel}>{errors.jobTitle?.message}</p>
                          </div>
                    
                          <div className={styles.inputBox}>
                            <label>Job category*</label>
                            <select {...register("jobCategory")} className= {errors.jobCategory ? `${styles.formControl} ${styles.inputError}` : styles.formControl}>
                              <option></option>
                              {jobCategory?.map((category, index)=>{
                              return <option value={category.categoryName}>{category.categoryName}</option>
                              })}
                            </select>
                            <p className={styles.errorLabel}>{errors.jobCategory?.message}</p>
                          </div>
                          <div className={styles.inputBox}>
                            <label>Employement type*</label>
                            <select {...register("employmentType")} className= {errors.employmentType ? `${styles.formControl} ${styles.inputError}` : styles.formControl}>
                              <option></option>
                              <option value="Contractual">Contractual</option>
            
                              <option value="Permanent">Permanent</option>
                              <option value="Remote">Remote job</option>
                            </select>
                            <p className={styles.errorLabel}>{errors.employmentType?.message}</p>
                          </div>
                   </div>
                   <div className={styles.col4Container}>
                         <div className={styles.inputBox}>
                            <label>Salary(number) </label>
                            <input type='number' {...register("salary")} className= {errors.salary ? `${styles.formControl} ${styles.inputError}` : styles.formControl} />
                            <p className={styles.errorLabel}>{errors.salary?.message}</p>
                          </div>
                          <div className={styles.inputBox}>
                            <label>Currency</label>
                            <select {...register("currency")} className= {errors.currency ? `${styles.formControl} ${styles.inputError}` : styles.formControl}>
                              <option value="ETB" selected>ETB</option>
                              <option value="$">Dollar</option>
                              <option value="Pound">Pound</option>
                            </select>
                            <p className={styles.errorLabel}>{errors.currency?.message}</p>
                          </div>
                          <div className={styles.inputBox}>
                            <label>Salary</label>
                            <select {...register("salaryInText")} className= {errors.salaryInText ? `${styles.formControl} ${styles.inputError}` : styles.formControl}>
                              <option></option>
                              <option value="As per the company scale">As per the company scale</option>
                              <option value="As per the company scale & very attractive">As per the company scale & very attractive</option>
                              <option value="As per the Banks salary scale">As per the Banks salary scale</option>
                              <option value="As per Higher Institution Education salary scale">As per Higher Institution Education salary scale</option>
                              <option value="Negotiable">Negotiable</option>
                            </select>
                            <p className={styles.errorLabel}>{errors.salaryInText?.message}</p>
                          </div>
                          <div className={styles.inputBox}>
                            <label>Experience years</label>
                            <input type='number' {...register("experience")} className= {errors.experience ? `${styles.formControl} ${styles.inputError}` : styles.formControl} />
                            <p className={styles.errorLabel}>{errors.experience?.message}</p>
                          </div>
                   </div>
                   <div className={styles.formContainerEng}>
                         <div className={styles.inputBox}>
                            <label>Required Number </label>
                            <input type='number' {...register("requiredNumber")} className= {errors.requiredNumber ? `${styles.formControl} ${styles.inputError}` : styles.formControl} />
                            <p className={styles.errorLabel}>{errors.requiredNumber?.message}</p>
                          </div>
                    
                          <div className={styles.inputBox}>
                            <label>Closing date(G.C.)</label>
                            <input type='date'  {...register("closingDate")} className= {errors.closingDate? `${styles.formControl} ${styles.inputError}` : styles.formControl} />
                            <p className={styles.errorLabel}>{errors.closingDate?.message}</p>
                          </div>
                          <div className={styles.inputBox}>
                            <label>Work place*</label>
                            <input type='text' {...register("workPlace")} className= {errors.workPlace? `${styles.formControl} ${styles.inputError}` : styles.formControl}  />
                            <p className={styles.errorLabel}>{errors.workPlace?.message}</p>
                          </div>
                   </div>
                   <div className={styles.formContainerTextArea}>
                         <div className={styles.inputBoxQuill} style={{width: '100%'}}>
                            <label>Job requirement*</label>
                            <ReactQuill theme="snow"  value={requirement} onChange={onRequirementChange} className= {errors.jobRequirement ? `${styles.textArea} ${styles.inputError}` : styles.textArea} />
                            <p className={styles.errorLabel}>{errors.jobRequirement?.message}</p>
                         </div>
                        
                   </div>
                   <div className={styles.formContainerTextArea}>
                         <div className={styles.inputBoxQuill}>
                            <label>How to Apply* </label>
                            <ReactQuill theme="snow"   value={howToApplyContent} onChange={onHowToApplyChange} className= {errors.howToApply ? `${styles.textArea} ${styles.inputError}` : styles.textArea}  />
                            <p className={styles.errorLabel}>{errors.howToApply?.message}</p>
                         </div>
                         <div className={styles.inputBoxQuill}>
                            <label>Job description </label>
                            <ReactQuill theme="snow" value={description} onChange={onDescriptionChange}  className= {errors.jobDescription? `${styles.textArea} ${styles.inputError}` : styles.textArea}  />
                            <p className={styles.errorLabel}>{errors.jobDescription?.message}</p>

                         </div>
                   </div>
                 
                   <div className={oroForm ? `${styles.buttonContainer} ${styles.active}` : styles.buttonContainer}>
                       <input type="submit" value= "Register job" className={styles.btnSubmit} />
                       <input type='reset' value="Reset" className={styles.btnReset} />
                   </div>
                   
                </div>
                {/** form container for Afan Oromo */}
                <div className={oroForm ? `${styles.formContainerOro} ${styles.active}` : styles.formContainerOro}>
                   <h2>Galmee Hojii </h2>
                   <p><span>Odeeffannoowwan mallattoo * qabaan hundii guutamuu qabu!</span></p>
                   <input type='hidden' {...register("validationChecker")}  />
                   <div className={styles.formContainerEng}>
                         <div className={styles.inputBox}>
                           <label>Maqaa Hojii</label>
                           <input type='text' {...register("jobTitleOro")} className= {errors.jobTitleOro ? `${styles.formControl} ${styles.inputError}` : styles.formControl}  />
                           <p className={styles.errorLabel}>{errors.jobTitleOro?.message}</p>

                          </div>
                    
                          <div className={styles.inputBox}>
                            <label>Gosa Hojii*</label>
                            <select {...register("jobCategoryOro")} className= {errors.jobCategoryOro ? `${styles.formControl} ${styles.inputError}` : styles.formControl}>
                            <option></option>
                            {jobCategory?.map((category, index)=>{
                              return <option value={category.categoryOromic}>{category.categoryOromic}</option>
                              })}
                            </select>
                            <p className={styles.errorLabel}>{errors.jobCategoryOro?.message}</p>
                          </div>
                          <div className={styles.inputBox}>
                            <label>Haala Qacarrii*</label>
                            <select {...register("employmentTypeOro")} className= {errors.employmentTypeOro ? `${styles.formControl} ${styles.inputError}` : styles.formControl}>
                              <option></option>
                              <option value="Kontiraataan">Kontiraataan</option>
                              <option value="dhaabbataan">dhaabbataan</option>
                              <option value="Riimootiin">Riimootiin</option>
                            </select>
                            <p className={styles.errorLabel}>{errors.employmentTypeOro?.message}</p>
                          </div>
                   </div>
                   <div className={styles.col4Container}>
                         <div className={styles.inputBox}>
                            <label>Mindaa(Lakkofsaan) </label>
                            <input type='number' {...register("salaryOro")} className= {errors.salaryOro ? `${styles.formControl} ${styles.inputError}` : styles.formControl} />
                            <p className={styles.errorLabel}>{errors.salaryOro?.message}</p>
                          </div>
                          <div className={styles.inputBox}>
                            <label>Gosa Maallaqa</label>
                            <select {...register("currencyOro")} className= {errors.currency ? `${styles.formControl} ${styles.inputError}` : styles.formControl}>
                              <option value="ETB" selected>ETB</option>
                              <option value="$">Dollar</option>
                              <option value="Pound">Pound</option>
                            </select>
                            <p className={styles.errorLabel}>{errors.currencyOro?.message}</p>
                          </div>
                          <div className={styles.inputBox}>
                            <label>Mindaa(jechaan)</label>
                            <select {...register("salaryInTextOro")} className= {errors.salaryInTextOro ? `${styles.formControl} ${styles.inputError}` : styles.formControl}>
                              <option></option>
                              <option value="Akka iskeelii mindaa dhaabbatichaa">Akka iskeelii dhaabbatichaa</option>
                              <option value="Akka iskeelii mindaa dhaabbatichaa fi baayyee hawwataadha">Akka iskeelii dhaabbatichaa fi baayyee hawwataadha</option>
                              <option value="Akka iskeelii mindaa Baankichaatiin">Akka iskeelii mindaa Baankichaatiin</option>
                              <option value="Akka iskeelii mindaa Barnoota Dhaabbata Olaanoo">Akka iskeelii mindaa Barnoota Dhaabbata Olaanoo</option>
                              <option value="Waliigalteen">Waliigalteen</option>
                            </select>
                            <p className={styles.errorLabel}>{errors.salaryInTextOro?.message}</p>
                          </div>
                          <div className={styles.inputBox}>
                            <label>Muuxannoo(waggaan)</label>
                            <input type='number' {...register("experienceOro")} className= {errors.experienceOro ? `${styles.formControl} ${styles.inputError}` : styles.formControl} />
                            <p className={styles.errorLabel}>{errors.experienceOro?.message}</p>
                          </div>
                   </div>
              
                   <div className={styles.formContainerEng}>
                         <div className={styles.inputBox}>
                            <label>Bay'inaa Barbaadamuu  </label>
                            <input type='number' {...register("requiredNumberOro")} className= {errors.requiredNumberOro ? `${styles.formControl} ${styles.inputError}` : styles.formControl} />
                            <p className={styles.errorLabel}>{errors.requiredNumberOro?.message}</p>
                          </div>
                    
                          <div className={styles.inputBox}>
                            <label>Guyyaa cufiinsaa(A.L.F)</label>
                            <input type='text' placeholder='Fkn: GG/JJ/WWWW' className= {errors.closingDateOro ? `${styles.formControl} ${styles.inputError}` : styles.formControl}  {...register("closingDateOro")} />
                            <p className={styles.errorLabel}>{errors.closingDateOro?.message}</p>
                          </div>
                          <div className={styles.inputBox}>
                            <label>Bakka Hojii*</label>
                            <input type='text' {...register("workPlaceOro")} className= {errors.workPlaceOro ? `${styles.formControl} ${styles.inputError}` : styles.formControl} />
                            <p className={styles.errorLabel}>{errors.workPlaceOro?.message}</p>
                          </div>
                   </div>
                  
                   <div className={styles.formContainerTextArea}>
                         <div className={styles.inputBoxQuill} style={{width: '100%'}}>
                            <label>Ulaagaa hojii*</label>
                            <ReactQuill theme="snow"  value={requirementOro} onChange={onRequirementChangeOro} className= {errors.jobRequirementOro ? `${styles.textArea} ${styles.inputError}` : styles.textArea} />
                            <p className={styles.errorLabel}>{errors.jobRequirementOro?.message}</p>
                         </div>
                        
                   </div>
                   <div className={styles.formContainerTextArea}>
                         <div className={styles.inputBoxQuill}>
                            <label>Haala galmee* </label>
                            <ReactQuill theme="snow"   value={howToApplyContentOro} onChange={onHowToApplyChangeOro} className= {errors.howToApplyOro ? `${styles.textArea} ${styles.inputError}` : styles.textArea}  />
                            <p className={styles.errorLabel}>{errors.howToApplyOro?.message}</p>
                         </div>
                         <div className={styles.inputBoxQuill}>
                            <label>Ibsa hojii</label>
                            <ReactQuill theme="snow" value={descriptionOro} onChange={onDescriptionChangeOro}  className= {errors.jobDescriptionOro? `${styles.textArea} ${styles.inputError}` : styles.textArea}  />
                            <p className={styles.errorLabel}>{errors.jobDescriptionOro?.message}</p>

                         </div>
                   </div>
                 
                  
                   
                </div>
                {/** for popup window */}
                <ToastContainer />
            </form>
          </div>
        </section>
    )
}
export default PostJobs;