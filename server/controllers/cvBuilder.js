const cvBuilderModel = require("../models/cvBuilderModel")

//personal data controllers
//fetch personal data to display 
 exports.fetchPersonalDataController = (req, res)=>{
    const data = {userId: 1}
    cvBuilderModel.fetchPersonalData(req.con, data, (error, result)=>{
        if(result){
            res.json(result)
        }
        else{
            throw error
        }
    })
 }
//update personal data
exports.updatePersonalData = (req, res)=>{
    const data = {userId: 1, userFirstName: req.body.userFirstName, userMiddleName: req.body.userMiddleName, userLastName: req.body.userLastName, userSex: req.body.userSex, userDateOfBirth: req.body.userDateOfBirth, userLocation: req.body.userLocation, userPhoneNumber: req.body.userPhoneNumber, portfolioLink: req.body.portfolioLink, linkedinLink: req.body.linkedinLink, githubLink: req.body.githubLink,  userEmail: req.body.userEmail}
    cvBuilderModel.updatePersonalData(req.con, data, (error, result)=>{
        if(result){
            res.json({"message": "Success"})
        }
        else{
            throw error
        }
    })
}
//display CV Image controller
exports.displayCVImage = (req, res)=>{
    const data = {userId: 1}
    cvBuilderModel.displayImage(req.con, data, (error, result)=>{
        if(result){
            return res.json(result)
        }
        else{
            throw error
        }
    })

}
//upload profile image 
exports.uploadProfileImage = (req, res)=>{
 const data = {userImage: req.file.filename, userId: 1};
 cvBuilderModel.uploadImage(req.con, data, (error, result)=>{
    if(result){
        cvBuilderModel.displayImage(req.con, data, (error2, result2)=>{
            if(result2){
                res.json({userImage: result2[0].userImage, userId: result2[0].userId})
            }
            else{
                throw error2
            }
        })
    }
    else{
        throw error
    }
 })
}
//fetch educational data based on userId
exports.fetchEducationalData = (req, res)=>{
    const data = {userId: 1}
    cvBuilderModel.fetchEducationData(req.con, data, (error, result)=>{
        if(result){
            res.json(result)
        }
        else{
            throw error
        }
    })

}
//insert new record of education data for job seekers
exports.createEducationData = (req, res)=>{
    const data = {userId: 1, id: req.body.id, educationalLevel: req.body.educationalLevel, category: req.body.category, collegeName: req.body.collegeName, department: req.body.department, startDate: req.body.startDate, endDate: req.body.endDate, cgpa: req.body.cgpa}
    cvBuilderModel.createEducationData(req.con, data, (error, result)=>{
        if(result){
            res.json({"message": "Record Successfully created"})
        }
        else{
            throw error
        }
    })
}
//update educational data of job seekers
exports.updateEducationData =(req, res)=>{
    const data = {id: req.body.id, userId: req.body.userId, educationalLevel: req.body.educationalLevel, collegeName: req.body.collegeName, other: req.body.other, category: req.body.category, department: req.body.department, startDate: req.body.startDate, endDate: req.body.endDate, cgpa: req.body.cgpa}
 cvBuilderModel.updateEducationData(req.con, data, (error, result)=>{
    if(result){
        res.json({"message": "Record Updated successfully"})
    }
    else{
        throw error
    }
 })
}
//delete education data of job seekers
exports.deleteEducationData = (req, res)=>{
    const data = {id: req.body.id, userId: req.body.userId};
    cvBuilderModel.deleteEducationData(req.con, data, (error, result)=>{
        if(result){
            res.json({"message": "Record deleted successfully"})
        }
        else{
            throw error
        }
    })
}
/** experince controller functions */
//fetch experience data
exports.fetchExperienceData = (req, res)=>{
    const data = {userId: 1}
    cvBuilderModel.fetchExperienceData(req.con, data, (error, result)=>{
        if(result){
            res.json(result)
        }
        else{
            throw error
        }
    })

}
//insert new record of experience data for job seekers
exports.createExperienceData = (req, res)=>{
    const data = {id: req.body.id, userId: req.body.userId, totalExperience: 2, jobTitle: req.body.jobTitle, employerName: req.body.employerName, jobResponsibility: req.body.jobResponsibility, startDate: req.body.startDate, endDate: req.body.endDate}
    cvBuilderModel.createExperienceData(req.con, data, (error, result)=>{
        if(result){
            res.json({"message": "Record Successfully created"})
        }
        else{
            throw error
        }
    })
}
//update experience data of job seekers
exports.updateExperienceData =(req, res)=>{
    const data = {userId: req.body.userId, id: req.body.id,  totalExperience: 1, jobTitle: req.body.jobTitle, employerName: req.body.employerName, jobResponsibility: req.body.jobResponsibility, startDate: req.body.startDate, endDate: req.body.endDate}
    cvBuilderModel.updateExperienceData(req.con, data, (error, result)=>{
    if(result){
        res.json({"message": "Record updated successfully"})
    }
    else{
        throw error
    }
 })
}
//delete experience data of job seekers
exports.deleteExperienceData = (req, res)=>{
    const data = {id: req.body.id, userId: 1};
    cvBuilderModel.deleteExperienceData(req.con, data, (error, result)=>{
        if(result){
            res.json({"message": "Record deleted successfully"})
        }
        else{
            throw error
        }
    })
}
// controller that handles the language data 
exports.fetchLanguageData = (req, res)=>{
    const data = {userId: 1}
    cvBuilderModel.fetchLanguageData(req.con, data, (error, result)=>{
        if(result){
            res.json(result)
        }
        else{
            throw error
        }
    })

}
//insert new record of language data for job seekers
exports.createLanguageData = (req, res)=>{
    const data = {id: req.body.id, userId: req.body.userId, language: req.body.language, other: req.body.other, proficiency: req.body.proficiency }
 
    cvBuilderModel.createLanguageData(req.con, data, (error, result)=>{
        if(result){
        
            res.json({"message": "Record Successfully created"})
        }
        else{
            throw error
        }
    })
}
//update language data of job seekers
exports.updateLanguageData =(req, res)=>{
    const data = {id: req.body.id, userId: req.body.userId, language: req.body.language, other: req.body.other, proficiency: req.body.proficiency }
    cvBuilderModel.updateLanguageData(req.con, data, (error, result)=>{
    if(result){
        res.json({"message": "Record updated successfully"})
    }
    else{
        throw error
    }
 })
}
//delete language data of job seekers
exports.deleteLanguageData = (req, res)=>{
    const data = {id: req.body.id, userId: 1};
    cvBuilderModel.deleteLanguageData(req.con, data, (error, result)=>{
        if(result){
            res.json({"message": "Record deleted successfully"})
        }
        else{
            throw error
        }
    })
}
//controllers thant handles skills data
//create record of skill 
exports.fetchSkillData = (req, res)=>{
    const data = {userId: 1}
    cvBuilderModel.fetchSkillData(req.con, data, (error, result)=>{
        if(result){
            res.json(result)
            
        }
        else{
            throw error
        }
    })

}
//insert new record of skills data for job seekers
exports.createSkillData = (req, res)=>{
    const data = {id: req.body.id, userId: req.body.userId, skills: req.body.skills, profileSummary: req.body.profileSummary }
    cvBuilderModel.createSkillData(req.con, data, (error, result)=>{
        if(result){
            res.send("Record Successfully created")
        }
        else{
            throw error
        }
    })
}
//update skills data of job seekers
exports.updateSkillData =(req, res)=>{
    const data = {id: req.body.id, userId: req.body.userId, skills: req.body.skills, profileSummary: req.body.profileSummary}
    cvBuilderModel.updateSkillData(req.con, data, (error, result)=>{
    if(result){
        res.json({"message": "Record updated successfully"})
    }
    else{
        throw error
    }
 })
}
//delete skills data of job seekers
exports.deleteSkillData = (req, res)=>{
    const data = {id: req.body.id, userId: 1};
    cvBuilderModel.deleteSkillData(req.con, data, (error, result)=>{
        if(result){
            res.json({"message": "Record deleted successfully"})
        }
        else{
            throw error
        }
    })
}