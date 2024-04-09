import React, { useEffect, useState } from 'react'
import NavButtons from '../../NavButtons'
import { useSelector, useDispatch } from 'react-redux'
import { changeUser} from '@/redux/user'
import {set, useForm} from "react-hook-form"
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'
import { changeStep } from '@/redux/step'
import styles from './personal.module.css'
import axios from 'axios'
import { getImageData, updateImageData } from '@/redux/multiStepForm'
const PersonalForm = () =>{
    const dispatch = useDispatch();
    const username = useSelector((state)=>state.user.value);
    const currentStep = useSelector((state)=>state.step.currentStep);
    const imageState = useSelector((state)=> state.CVBuilder.imageData)
    const [file, setFile] = useState('')
    const date = new Date();
    date.toDateString();
    const [imageData, setImageData] = useState([])
    const [fileError, setFileError] = useState('')
     //setting up the validation schema
     const validationSchema = yup.object().shape({
        firstName: yup.string().required("First name is required").min(2, "Invalid name enter more than 2 characters").matches(/^[a-zA-Z]+$/, "Invalid first name"),
        middleName: yup.string().required("Middle name is required").min(2, "Invalid name enter more thant 2 characters").matches(/^[a-zA-Z]+$/, "Invalid middle name"),
        lastName: yup.string().required("Last name is required").min(2, "Invalid name enter more thant 2 characters").matches(/^[a-zA-Z]+$/, "Invalid last name"),
        email: yup.string().required("Email address is required").matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email address"),
        sex: yup.string().required("Gender required"),
        dateOfBirth: yup.date()
                    .typeError("Invalid date")
                    .required("Date of birth required")
                    .max(date, "Invalid date, future date not allowed"),
        currentAddress: yup.string().required("Current Address required").min(2, "Invalid Address, enter more than 2 characters."),
        phoneNumber: yup.string().required("Phone number required").max(14, "Incorrect phone number"),
        portfolio: yup.string().nullable()
                    .matches( /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i, 'Invalid URL')
                    .transform((_, val) => (val !== "" ? String(val) : null)),
        linkedinLink: yup.string().nullable()
                        .matches( /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i, 'Invalid URL')
                        .transform((_, val) => (val !== "" ? String(val) : null)),
        githubLink: yup.string().nullable()
                    .matches( /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i, 'Invalid URL')
                    .transform((_, val) => (val !== "" ? String(val) : null)),

     })
    //linking the validation schema with the form data throuhg resolver
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(validationSchema)
    });
    //loading image from the server 
    useEffect(()=>{
        axios('http://localhost:5000/display-user-image/')
        .then((res) => {
            setImageData(res.data[0])
            dispatch(getImageData(res.data[0]))
            console.log(res.data[0])
        })
        
        .catch(err => console.log(err))
    }, [])
    //validating the image file
    const validateImage = (image)=>{
        setFile(image)
        setFileError('')
        if(typeof(image.name) != "undefined")
        {
        //checking the file extenstions
        if(!image.name.match(/\.(jpg|JPG|JPEG|jpeg|PNG|png)$/)){
            setFileError("Error, supported file types are jpg, jpeg and png");

            return;
        }
        //checking the file size 
        if(image.size > 2000000){
            setFileError("Image file is too large, the file exceeds 2 MB");
            return;
        }
        setFileError('')
       }
       else{
        setFileError("please select file")
        return
       }

    }
    const onSubmit = (data) =>{
        dispatch(changeStep(currentStep + 1))
    }
    //uploading image to the server 
    const handleImageUpload = ()=>{
        const formData = new FormData()
        if(file === ''){
            setFileError("Select the file")
        }
        else{
        formData.append('image', file);
        axios.post('http://localhost:5000/upload-cv-image', formData)
        .then(res => {
            if(res.data.userImage){
                dispatch(updateImageData({userId: res.data.userId, userImage: res.data.userImage}))
            }
        })
        .catch(err => console.log(err))
       }
        
    }
    return(
        <section className={styles.container}>
           <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className={styles.formContainer}>
                <p className={styles.notification}>All data with * symbol must be filled! </p>
                <div className={styles.formColumn}>
                    <div className={styles.inputBox}>
                            <input type='text'  {...register("firstName")} className= {errors.firstName ? styles.inputError : ""} required/>
                            <span>First Name*</span>
                            <p className={styles.errorLabel}>{errors.firstName?.message}</p>
                    </div>
                    <div className={styles.inputBox}>
                            <input type='text'  {...register("middleName")} className= {errors.middleName ? styles.inputError : ""} required/>
                            <span>Middle Name*</span>
                            <p className={styles.errorLabel}>{errors.middleName?.message}</p>
                    </div>
                    <div className={styles.inputBox}>
                            <input type='text'  {...register("lastName")} className= {errors.lastName ? styles.inputError : ""} required/>
                            <span>Last Name*</span>
                            <p className={styles.errorLabel}>{errors.lastName?.message}</p>
                    </div>
                    
                </div>
                <div className={styles.formColumn}>
                    <div className={styles.inputBox}>
                            <select  {...register("sex")} className= {errors.sex ? styles.inputError : ""} required>
                                <option value=""></option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            <span>Sex*</span>
                            <p className={styles.errorLabel}>{errors.sex?.message}</p>
                    </div>
                    <div className={styles.inputBox}>
                            <input type='date'  {...register("dateOfbirth")} className= {errors.dateOfBirth ? styles.inputError : ""} />
                            <span>Date of Birth*</span>
                            <p className={styles.errorLabel}>{errors.dateOfBirth?.message}</p>
                    </div>
                    <div className={styles.inputBox}>
                            <input type='text'  {...register("currentAddress")} className= {errors.currentAddress ? styles.inputError : ""} required/>
                            <span>Current Address*</span>
                            <p className={styles.errorLabel}>{errors.currentAddress?.message}</p>
                    </div>
                    
                </div>
                
                <div className={styles.formColumn}>
                <div className={styles.inputBox}>
                            <input type='text'  {...register("email")} className= {errors.email ? styles.inputError : ""} required/>
                            <span>Email*</span>
                            <p className={styles.errorLabel}>{errors.email?.message}</p>
                    </div>
                    <div className={styles.inputBox}>
                            <input type='text'  {...register("phoneNumber")} className= {errors.phoneNumber ? styles.inputError : ""} required/>
                            <span>Phone Number*</span>
                            <p className={styles.errorLabel}>{errors.phoneNumber?.message}</p>
                    </div>
                    <div className={styles.inputBox}>
                            <input type='text'  {...register("portfolio")} className= {errors.portfolio ? styles.inputError : ""} required/>
                            <span>Portfolio link</span>
                            <p className={styles.errorLabel}>{errors.portfolio?.message}</p>
                    </div>
                    

                </div>
                <div className={styles.formColumn}>
                
                    <div className={styles.inputBox}>
                            <input type='text'  {...register("linkedinLink")} className= {errors.linkedinLink ? styles.inputError : ""} required/>
                            <span>Linkedin Link</span>
                            <p className={styles.errorLabel}>{errors.linkedinLink?.message}</p>
                    </div>
                    <div className={styles.inputBox}>
                            <input type='text'  {...register("githubLink")} className= {errors.githubLink ? styles.inputError : ""} required/>
                            <span>Github link</span>
                            <p className={styles.errorLabel}>{errors.githubLink?.message}</p>
                    </div>
                

                </div>
             </div>
             <div className={styles.imageContainer}>
               
                <img src={`http://localhost:5000/uploads/`+imageState.userImage} alt='wenchijobs-default-profile-picture' />
               
                <div className={styles.buttonContainer}>
                    <input type='file' onChange={(e)=>{
                        if(e.target.files.length === 0){
                            setFile('')
                        }else{
                        validateImage(e.target.files[0])
                        }
                    }} accept= "image/png, image/jpg, image/jpeg" className= {fileError ? styles.inputError : ""} />
                    <input type='button' onClick= {handleImageUpload} value="Upload" className={styles.btnUpload} disabled={file === '' ? true : fileError.length > 0 ? true : false} />
                </div>
               
                <p className={styles.errorLabel}>{fileError}</p>
             </div>
            
              <NavButtons />
           </form>
        </section>
    )
}
export default PersonalForm;

