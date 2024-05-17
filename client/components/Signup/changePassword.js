import  {useState, useEffect} from 'react'
import styles from './signup.module.css'
import Link  from 'next/link';
import {useForm} from 'react-hook-form'
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux';
import language from '@/redux/language';
const ChangePasswordModal = ({closeModal})=>{
    const [errorMessage, setErrorMessage] = useState("")
    const dispatch = useDispatch();
    const isEnglish = useSelector((state)=> state.language.isEnglish)
    //setting up the validation schema
    const validationSchema = yup.object().shape({
        firstName: yup.string().required("First name is required").matches(/^[a-zA-Z]+$/, "Invalid first name"),
        middleName: yup.string("please input valid middle name").required("Middle name is required"),
        email: yup.string().matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email address").required("Email address is required"),
        password: yup.string().required("Password is required").min(5, "Password must be minimum of 5 characters").max(20, "Password should not exceed 20 characters"),
        confirmPassword: yup.string().required("Confirm password required").oneOf([yup.ref("password"), null], "Pasword don't match!")
    })
    //linking the validation schema with the form data throuhg resolver
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(validationSchema)
    });
   //closing signup window on out side click

    //the function that handles the onsubmit form data 
    const onSubmit = (data) =>{
        fetch(process.env.NEXT_PUBLIC_SERVER_ADDRESS+'/create-signup-data', {
            method: 'post',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
        .then((res)=>{
            if(!res.ok){
               throw errors
              }
              return res.json()
            
        })
        .then((data)=>{
            if(data.message == "Exist"){
                setErrorMessage("Email already exist")
            }
            if(data.message == "Success"){
                window.location.href = "/auth"
            }
        })
      
    }
    return(
        
            <div className={styles.card}>
              
                <div className={styles.header}>
                     <h3>{isEnglish == "English" ? 'Change Password' : isEnglish == "Oromic" ?  "Jecha Iccitii jijjirraa " : "የይለፍ ቃል መቀየሪያ" } </h3>
                     <p className={styles.errorMessage}>{errorMessage}</p>
                     <div className={styles.close} onClick={()=>closeModal(false)}>X</div>
                     <div className={styles.closeToolTip}>
                     {isEnglish == "English" ? 'Close' : isEnglish == "Oromic" ?  "Cufi" : "ዝጋ" }
                     </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
    
                  
                   <div className={styles.inputBox}>
                        <input type='password'  {...register("oldPassword")} className= {errors.oldPassword ? styles.inputError : ""} required/>
                        <span>{isEnglish == "English" ? 'Old password' : isEnglish == "Oromic" ?  "Paswordii dura" : "የበፊት ፓስዎርድ" }</span>
                        <p className={styles.errorLabel}>{errors.oldPassword?.message}</p>
                    </div>
                    
                    <div className={styles.inputBox}>
                        <input type='password'  {...register("password")} className= {errors.password ? styles.inputError : ""} required/>
                        <span>{isEnglish == "English" ? 'Password' : isEnglish == "Oromic" ?  "Jechaa Iccitii" : "ፓስዎርድ" }</span>
                        <p className={styles.errorLabel}>{errors.password?.message}</p>
                    </div>
                    <div className={styles.inputBox}>
                        <input type='password'  {...register("confirmPassword")} className= {errors.confirmPassword ? styles.inputError : ""} required/>
                        <span>{isEnglish == "English" ? 'Confirm password' : isEnglish == "Oromic" ?  "Paswordii mirkaneessa" : "ፓስዎርዱን በድጋሚ ያስገቡ" }</span>
                        <p className={styles.errorLabel}>{errors.confirmPassword?.message}</p>
                    </div>
                                   
                    <input type='submit' value={isEnglish == "English" ? 'Save' : isEnglish == "Oromic" ?  "Galmeessii" : "አስቀምጥ" } name='submit' className={styles.btnLogin} />
                    {/** popup window for messages*/}
                  
                   
                </form>
            </div>
        
     
    )
}
export default ChangePasswordModal;