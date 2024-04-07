"use client"
import React, { useContext, useState } from 'react'
import EducationForm from './StepsForm/Education/EducationForm';
import PersonalForm from './StepsForm/Personal/PersonalForm';
import ExperienceForm from './StepsForm/Experience/ExperienceForm';
import SkillsForm from './StepsForm/Skills/SkillsForm';
import LanguageForm from './StepsForm/Language/LanguageForm';
import SubmitForm from './StepsForm/SubmitForm';
import { useSelector } from 'react-redux';
const StepFormContainer = () =>{
const currentStep = useSelector((state)=> state.step.currentStep);
  //the function that displays step forms based on the selected step
function stepChecker(step){
    if(step === 1){
        return(
            <PersonalForm />
        )
    }
    else if( step === 2){
        return(
            <EducationForm />
        )
    }
    else if (step === 3){
        return(
            <ExperienceForm />
        )
    }
    else if (step === 4){
        return(
            <LanguageForm />
           
        )
    }
    else if (step === 5){
        return(
            <SkillsForm />
        )
    }
    else{
        return(
            <SubmitForm />
        )
    }
}

    return(
        <>
         {stepChecker(currentStep)}
        </>
    )
}
export default StepFormContainer;