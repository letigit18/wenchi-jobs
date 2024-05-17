import React, { useContext } from 'react'
import styles from './NavButtons.module.css'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { changeStep } from '@/redux/step'
const NavButtons = () =>{
    const currentStep = useSelector((state)=> state.step.currentStep);
    const confirmation = useSelector((state)=>state.CVBuilder.confirmation)
    const dispatch = useDispatch();
    const handlePrevious = () =>{
      dispatch(changeStep( currentStep - 1 ))
    }
    return(
        
          <div className={styles.btnContainer}>
            <button type='button'  className={styles.btnPrevious} onClick={handlePrevious} disabled={currentStep === 1}><i class='bx bx-arrow-back'></i> Previous</button>
            <button type='submit' disabled= {currentStep == 6 && confirmation == false} className={currentStep === 6 ? styles.btnDownload : styles.btnNext} >{currentStep === 6 ? "Finish and Download" : "Next"} {currentStep !== 6 && <i class='bx bx-arrow-back'></i>}</button>   
         </div>
         
    
    )
}
export default NavButtons;