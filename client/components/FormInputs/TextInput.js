import React from 'react'
import styles from './textInput.module.css'
const TextInput = ({
    label,
    register,
    name,
    errors,
    type="text",
})=>{
    return(
        <div className={styles.textInputContainer}>
          <label htmlFor={name} className='form-control'>{label}</label>
          <input type={type} name={name} id= {name} className={styles.formControl} placeholder={`Enter the ${name}`} {...register(`${name}`)} />
          <p>{errors}</p>
        </div>
    )
}
export default TextInput;