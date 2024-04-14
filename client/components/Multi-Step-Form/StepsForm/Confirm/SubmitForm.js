
import {useState} from 'react'
import NavButtons from '../../NavButtons';
import styles from './confirm.module.css'
const SubmitForm = () =>{
    const [confirmation, setConfirmation] = useState(false)
    console.log(confirmation)
    return(
        <section>
           <form className={styles.form}>
            <div className={styles.container}>
             <p>You should check the following checkbox to download your CV !</p>
             <div>
                <input type="checkbox" value={confirmation} name="confirmation" onChange={(e)=> setConfirmation(!confirmation)} id="confirmation" />
                <label htmlFor='confirmation'>I confirm that all the provided information is correct.</label>
             </div>
             
            </div> 
            
           </form>
           {confirmation ? "Agreed" : 'Not Agreed'}
           <NavButtons />
        </section>
    )
}
export default SubmitForm;
