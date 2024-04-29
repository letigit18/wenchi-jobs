"use client"
import React, {useMemo, useEffect, useState} from 'react'
import styles from './registration.module.css'
import {useForm} from 'react-hook-form'
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
const EmployeRegistration = ()=>{
  const date = new Date();
  date.toDateString();
  const [file, setFile] = useState('')
  const [fileError, setFileError] = useState('')
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }),[]);
  const validationSchema = yup.object().shape({
    companyName: yup.string().required("Company name required!")
              .min(3, "please enter valid company name!"),
    website : yup.string()
              .nullable()
              .matches( /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i, 'Invalid URL')
              .transform((_, val) => (val !== "" ? String(val) : null)),
    companyType: yup.string().required("Company type required!"),
    password: yup.string().required("Password required")
              .min(6, "Your password must be greater than 5 characters"),
    confirmPassword: yup.string().required("Confirm password required").oneOf([yup.ref("password"), null], "Pasword don't match!"),
    email: yup.string().required("Email address is required").matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email address"),
    companyAbout: yup.string().nullable()
                  .min(5, "Please enter valid company info.")
                  .transform((_, val) => (val !== "" ? String(val) : null)),
    location: yup.string().nullable()
    .min(3, "Invalid work place")
    .transform((_, val) => (val !== "" ? String(val) : null)),
   
    
  })

  const {register, setValue, watch, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(validationSchema)
    
});
//handling react quill input options 
 //react quill handling functions
 useEffect(() => {
  register("jobAbout")
  
}, [register]);
//registering change to the about company
const onAboutChange = (editorState) => {
  setValue("companyAbout", editorState);
};


//the function that handles the onsubmit event
const onSubmit = (data)=>{
  fetch('http://localhost:5000/create-company-data', {
    method: "post",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
}).then((result)=>{
      if(result.ok){
        toast.success("Your company has been succesfully registered", {
          position: "top-center"
        })
      }
})

}
//react quill watch
const about = watch("companyAbout")

    return(
        <section className={styles.container}>
          <div className={styles.card}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className={styles.formContainer}>
                   <h2>Company(Organization) Registration </h2>
                   <p>
                    <span>All information with * symbol must be filled!</span>
                    
                  </p>
                   <div className={styles.formContainerEng}>
                         <input type='hidden' {...register("companyId")} value={1} />
                         <div className={styles.inputBox}>
                            <label>Company Name*</label>
                            <input type='text' {...register("companyName")} className= {errors.companyName ? `${styles.formControl} ${styles.inputError}` : styles.formControl}  />
                            <p className={styles.errorLabel}>{errors.companyName?.message}</p>
                          </div>
                    
                          <div className={styles.inputBox}>
                            <label>Company Type*</label>
                            <select {...register("companyType")} className= {errors.companyType ? `${styles.formControl} ${styles.inputError}` : styles.formControl}>
                              <option></option>
                              <option value="Banks or Insurance">Banks or Insurance company</option>
                              <option value="Government">Government </option>
                              <option value="NGO">NGO</option>
                              <option value="Private Limited Company">Private Limited Company</option>
                              <option value="Higher Education Institution">Higher Education Institution</option>
                            </select>
                            <p className={styles.errorLabel}>{errors.companyType?.message}</p>
                          </div>
                          <div className={styles.inputBox}>
                          <label>Email*</label>
                            <input type='text' {...register("email")} className= {errors.email ? `${styles.formControl} ${styles.inputError}` : styles.formControl}  />
                            <p className={styles.errorLabel}>{errors.email?.message}</p>
                          </div>
                   </div>
                   <div className={styles.formContainerEng}>
                          <div className={styles.inputBox}>
                            <label>Website Address</label>
                            <input type='text' {...register("website")} className= {errors.website ? `${styles.formControl} ${styles.inputError}` : styles.formControl} />
                            <p className={styles.errorLabel}>{errors.website?.message}</p>
                          </div>
                          <div className={styles.inputBox}>
                            <label>Password </label>
                            <input type='password' {...register("password")} className= {errors.password ? `${styles.formControl} ${styles.inputError}` : styles.formControl} />
                            <p className={styles.errorLabel}>{errors.password?.message}</p>
                          </div>
                          <div className={styles.inputBox}>
                            <label>Confirm password </label>
                            <input type='password' {...register("confirmPassword")} className= {errors.confirmPassword ? `${styles.formControl} ${styles.inputError}` : styles.formControl} />
                            <p className={styles.errorLabel}>{errors.confirmPassword?.message}</p>
                          </div>
                          
                        
                   </div>
                   <div className={styles.formContainerEng}>
                         <div className={styles.inputBox}>
                              <label>Number of employees</label>
                              <select {...register("companyNoOfEmp")} className= {errors.companyNoOfEmp? `${styles.formControl} ${styles.inputError}` : styles.formControl}>
                                <option></option>
                                <option value="Less than 20">Less than 20</option>
                                <option value="21-50">21-50</option>
                                <option value="51-100">51-100</option>
                                <option value="101-500">101-500</option>
                                <option value="501-1000">501-1000</option>
                                <option value="greater than 1000"> Greater than 1000</option>
                              </select>
                              <p className={styles.errorLabel}>{errors.companyNoOfEmp?.message}</p>
                            </div>
                    
                          <div className={styles.inputBox}>
                            <label>Head Office Location</label>
                            <input type='text' {...register("location")} className= {errors.location? `${styles.formControl} ${styles.inputError}` : styles.formControl}  />
                            <p className={styles.errorLabel}>{errors.location?.message}</p>
                          </div>
                         
                          
                   </div>
                   <div className={styles.formContainerTextArea}>
                         <div className={styles.inputBoxQuill} style={{width: '100%'}}>
                            <label>About Company</label>
                            <ReactQuill theme="snow"  value={about} onChange={onAboutChange} className= {errors.companyAbout ? `${styles.textArea} ${styles.inputError}` : styles.textArea} />
                            <p className={styles.errorLabel}>{errors.companyAbout?.message}</p>
                         </div>
                        
                   </div>
                 
                 
                   <div className={styles.buttonContainer}>
                       <input type="submit" value= "Register job" className={styles.btnSubmit} />
                       <input type='reset' value="Reset" className={styles.btnReset} />
                   </div>
                   
                </div>
                {/** for success message display purpose */}
                <ToastContainer />
               
            </form>
          </div>
        </section>
    )
}
export default EmployeRegistration;