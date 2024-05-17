import { createSlice } from "@reduxjs/toolkit";
const initialState = {personalData: {}, educationalFormData: [], experienceData: [], languageData: [], skillData: [], imageData: {}, confirmation: false}
const multiStepSlice = createSlice({
    name: "CVBuilder",
    initialState,
    reducers: {
        
        //personal data reducers
        getPersonalData: (state, action)=>{
            state.personalData = {userId: action.payload.userId, userFirstName: action.payload.userFirstName, userMiddleName: action.payload.userMiddleName, userLastName: action.payload.userLastName, userSex: action.payload.userSex, userDateOfBirth: action.payload.userDateOfBirth, userLocation: action.payload.userLocation, userPhoneNumber: action.payload.phoneNumber, portfolioLink: action.payload.portfolioLink, linkedinLink: action.payload.linkedinLink, githubLink: action.payload.githubLink, userEmail: action.payload.userEmail}
        },
        updatePersonalData: (state, action)=>{
            state.personalData.userId = action.payload.userId,
            state.personalData.userFirstName = action.payload.userFirstName,
            state.personalData.userMiddleName = action.payload.userMiddleName,
            state.personalData.userLastName = action.payload.userLastName,
            state.personalData.userSex = action.payload.userSex,
            state.personalData.userLocation = action.payload.userLocation,
            state.personalData.userDateOfBirth = action.payload.userDateOfBirth,
            state.personalData.userPhoneNumber = action.payload.userPhoneNumber,
            state.personalData.userEmail = action.payload.userEmail,
            state.personalData.githubLink = action.payload.githubLink,
            state.personalData.linkedinLink = action.payload.linkedinLink,
            state.personalData.portfolioLink = action.payload.portfolioLink
        },
        //education data handler reducers
        getEducationalData: (state, action)=>{
            state.educationalFormData = action.payload.map((data)=>{
                return{id: data.id, userId: data.userId, educationalLevel: data.educationalLevel, category: data.category, collegeName: data.collegeName, cgpa: data.cgpa, department: data.department, 
                    other: data.other, startDate: data.startDate, endDate: data.endDate
                }
            })
        },
        addEducationalFormData: (state, action)=>{
            state.educationalFormData.push(action.payload)
        },
        updateEducationalData: (state, action)=>{
            const { id, userId, educationalLevel, collegeName, other, category, cgpa, department, startDate, endDate } = action.payload;
            const educationalFormData = state.educationalFormData.map(education => {
              if (education.id == id && education.userId == userId) {
                return { ...education, id, userId, educationalLevel, collegeName, other, category, cgpa, department, startDate, endDate};
              }
             
              return education;
            });
          
            return { ...state.educationalFormData, educationalFormData};
              
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
            state.skillData[0].id = action.payload.id;
            state.skillData[0].userId = action.payload.userId;
            state.skillData[0].skills = action.payload.skills;
            state.skillData[0].profileSummary = action.payload.profileSummary; 
        },
        deleteSkillsData: (state, action)=>{
            if(action.payload.id == state.skillData[0].id && action.payload.userId == state.skillData[0].userId){
                state.skillData = []
            }
        },
        //cv image data reducers
        getImageData: (state, action)=>{
            state.imageData = {userId: action.payload.userId, userImage: action.payload.userImage}
        },
        updateImageData: (state, action)=>{
           state.imageData.userId = action.payload.userId;
           state.imageData.userImage = action.payload.userImage
            
        },
        updateConfirmationData: (state, action)=>{
            state.confirmation = action.payload
        }

    }
})
export const {getEducationalData, setFormData, addEducationalFormData, updateEducationalData, deleteEducationalFormData,
getExperienceData,addExperienceData, updateExperienceData, deleteExperienceData,
getLanguageData,addLanguageData, updateLanguageData, deleteLanguageData,
getSkillsData, addSkillsData, updateSkillsData, deleteSkillsData,
getImageData, updateImageData,
getPersonalData, updatePersonalData,
updateConfirmationData
} = multiStepSlice.actions;
export default multiStepSlice.reducer;