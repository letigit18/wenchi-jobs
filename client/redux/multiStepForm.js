import { createSlice } from "@reduxjs/toolkit";
const initialState = {formData: {}, educationalFormData: [], experienceData: [], languageData: [], skillData: []}
const multiStepSlice = createSlice({
    name: "CVBuilder",
    initialState,
    reducers: {
        setFormData: (state, action)=>{
            state.formData = {...state.formData, ...action.payload}
        },
        //education states
        getEducationalData: (state, action)=>{
            state.educationalFormData = action.payload.map((data)=>{
                return{id: data.id, userId: data.userId, educationalLevel: data.educationalLevel, collegeName: data.collegeName, cgpa: data.cgpa, department: data.department, 
                    startDate: data.startDate, endDate: data.endDate
                }
            })
        },
        addEducationalFormData: (state, action)=>{
            state.educationalFormData.push(action.payload)
        },
        updateEducationalFormData: (state, action)=>{
          const index = state.educationalFormData.findIndex(educationData => educationData.userId == action.payload.userId && educationData.id == action.payload.id)
          state.educationalFormData[index] ={
            educationalLevel: action.payload.educationalLevel,
            collegeName: action.payload.collegeName,
            cgpa: action.payload.cgpa,
            department: action.payload.department,
            startDate: action.payload.startDate,
            endDate: action.payload.endDate
          }
        },
        deleteEducationalFormData: (state, action)=>{
            const id = action.payload.id;
            state.educationalFormData = state.educationalFormData.filter(education => education.id !== id)
        },
        //experience handling reducers
        getExperienceData: (state, action)=>{
            state.experienceData = action.payload.map((data)=>{
                return{id: data.id, userId: data.userId, jobTitle: data.jobTitle, employerName: data.employerName, jobResponsibility: data.responsibility, 
                    startDate: data.startDate, endDate: data.endDate
                }
            })
        },
        addExperienceData: (state, action)=>{
            state.experienceData.push(action.payload)
           
        },
        updateExperienceData: (state, action)=>{
        
        const { id, userId, jobTitle, employerName, jobResponsibility, startDate, endDate } = action.payload;
        const experienceData = state.experienceData.map(experience => {
          if (experience.id == id && experience.userId == userId) {
            return { ...experience, id, employerName, userId, jobTitle, jobResponsibility, startDate, endDate};
          }
          return experience;
        });
      
        return { ...state.experienceData, experienceData };
          
        },
        deleteExperienceData: (state, action)=>{
            const id = action.payload.id;
            state.experienceData = state.experienceData.filter(experience => experience.id !== id)
        },
        //language handling reducers
        getLanguageData: (state, action)=>{
            state.languageData = action.payload.map((data)=>{
                return{id: data.id, userId: data.userId, language: data.language, proficiency: data.proficiency, other: data.other
                }
            })
        },
        addLanguageData: (state, action)=>{
            state.languageData.push(action.payload)
           
        },
        updateLanguageData: (state, action)=>{
        
        const { id, userId, language, other, proficiency } = action.payload;
        const languageData = state.languageData.map(lang => {
          if (lang.id == id && lang.userId == userId) {
            return { ...lang, id, language, other, proficiency, userId};
          }
          return lang;
        });
      
        return { ...state.languageData, languageData };
          
        },
        deleteLanguageData: (state, action)=>{
            const id = action.payload.id;
            state.languageData = state.languageData.filter(language => language.id !== id)
        },
        //skills handling reducers 
        getSkillsData: (state, action)=>{
            state.skillData= action.payload.map((data)=>{
                return{id: data.id, userId: data.userId, skills: data.skills, profileSummary: data.profileSummary
                }
            })
        },
        addSkillsData: (state, action)=>{
            state.skillData.push(action.payload)
           
        },
        updateSkillsData: (state, action)=>{
        
        const { id, userId, skills, profileSummary } = action.payload;
        const skillData = state.skillData.map(skill => {
          if (skill.id == id && skill.userId == userId) {
            return { ...skill, id, skills, profileSummary, userId};
          }
          return skill;
        });
      
        return { ...state.skillData, skillData };
          
        },
        deleteSkillsData: (state, action)=>{
            const id = action.payload.id;
            state.skillData = state.skillData.filter(skill => skill.id !== id)
        }
    }
})
export const {getEducationalData, setFormData, addEducationalFormData, updateEducationalFormData, deleteEducationalFormData,
getExperienceData,addExperienceData, updateExperienceData, deleteExperienceData,
getLanguageData,addLanguageData, updateLanguageData, deleteLanguageData,
getSkillsData, addSkillsData, updateSkillsData, deleteSkillsData
} = multiStepSlice.actions;
export default multiStepSlice.reducer;