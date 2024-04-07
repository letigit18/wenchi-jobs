import React from 'react'
import NavButtons from '../../NavButtons'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { changeUser } from '@/redux/user'
import {useForm} from "react-hook-form"
import { changeStep } from '@/redux/step'
const PersonalForm = () =>{
    const dispatch = useDispatch();
    const username = useSelector((state)=>state.user.value);
    const currentStep = useSelector((state)=>state.step.currentStep);
    
    const {register, handleSubmit} = useForm()
    const onSubmit = (data) =>{
        dispatch(changeStep(currentStep + 1))
    }
    return(
        <section>
            personal Info
           <form onSubmit={handleSubmit(onSubmit)}>
        
           <NavButtons />
           </form>
        </section>
    )
}
export default PersonalForm;

