const db = require('../config/db');
//education models
exports.fetchEducationData = (con, data, callback)=>{
    db.query('select * from education where userId = ?',[data.userId],callback)
}
exports.createEducationData = (con, data, callback)=>{
    db.query('insert into education set educationalLevel=?, category=?, department=?, collegeName=?, cgpa=?, startDate=?, endDate=?, userId=?',
    [data.educationalLevel, data.category, data.department, data.collegeName, data.cgpa, data.startDate, data.endDate, data.userId],
    callback
    )
}
exports.updateEducationData = (con, data, callback)=>{
    db.query('update education set educationalLevel=?, department=?, collegeName=?, category=?, other=?, cgpa=?, startDate=?, endDate=? where userId=? and id=?',
    [data.educationalLevel, data.department, data.collegeName, data.category, data.other, data.cgpa, data.startDate, data.endDate, data.userId, data.id],
    callback
    )
}
exports.deleteEducationData = (con, data, callback)=>{
    db.query('delete from education where id =? and userId=?', [data.id, data.userId], callback)
}
//experience models
exports.fetchExperienceData = (con, data, callback)=>{
    db.query('select * from experience where userId = ?',[data.userId],callback)
}
exports.createExperienceData = (con, data, callback)=>{
    db.query('insert into experience set employerName=?, jobTitle=?, responsibility=?, totalExperience=?, startDate=?, endDate=?, userId=?',
    [data.employerName, data.jobTitle, data.jobResponsibility, data.totalExperience, data.startDate, data.endDate, data.userId],
    callback
    )
}
exports.updateExperienceData = (con, data, callback)=>{
    db.query('update experience set employerName=?, jobTitle=?, responsibility=?, totalExperience=?, startDate=?, endDate=? where id=? AND userId=?',
    [data.employerName, data.jobTitle, data.jobResponsibility, data.totalExperience, data.startDate, data.endDate, data.id, data.userId],
    callback
    )
}
exports.deleteExperienceData = (con, data, callback)=>{
    db.query('delete from experience where id =? and userId=?', [data.id, data.userId], callback)
}
//language models
exports.fetchLanguageData = (con, data, callback)=>{
    db.query('select * from language where userId = ?',[data.userId],callback)
}
exports.createLanguageData = (con, data, callback)=>{
    db.query('insert into language set language=?, other=?, proficiency=?, userId=?',
    [data.language, data.other, data.proficiency, data.userId],
    callback
    )
}
exports.updateLanguageData = (con, data, callback)=>{
    db.query('update language set id=?, language=?, other=?, proficiency=?, userId=? where id=? AND userId=?',
    [data.id, data.language, data.other, data.proficiency, data.userId, data.id, data.userId],
    callback
    )
}
exports.deleteLanguageData = (con, data, callback)=>{
    db.query('delete from language where id =? and userId=?', [data.id, data.userId], callback)
}
//skills model 
exports.fetchSkillData = (con, data, callback)=>{
    db.query('select * from skill where userId = ?',[data.userId], callback)
}
exports.createSkillData = (con, data, callback)=>{
    db.query('insert into skill set skills=?, profileSummary=?, userId=?',
    [data.skills, data.profileSummary, data.userId],
    callback
    )
}
exports.updateSkillData = (con, data, callback)=>{
    db.query('update skill set skills=?, profileSummary=? where id=? AND userId=?',
    [data.skills, data.profileSummary, data.id, data.userId],
    callback
    )
}
exports.deleteSkillData = (con, data, callback)=>{
    db.query('delete from skill where id =? and userId=?', [data.id, data.userId], callback)
}
//the model that updates profile image of the user
exports.displayImage = (con, data, callback)=>{
    db.query('select userId, userImage from jobseekers where userId=?', [data.userId], callback)
}
exports.uploadImage = (con, data, callback)=>{
    db.query('update jobseekers set userImage=? where userId=?', [data.userImage, data.userId], callback)
}
//personal information model
exports.fetchPersonalData = (con, data, callback)=>{
    db.query('select * from jobseekers where userId=?', [data.userId], callback)
} 
//update personal data model
exports.updatePersonalData = (con, data, callback)=>{
    db.query('update jobseekers set userFirstName=?, userMiddleName=?, userLastName=?, userSex=?, userDateOfBirth=?, userLocation=?, phoneNumber=?, portfolioLink=?, linkedinLink=?, githubLink=?, userEmail=? where userId=?',
    [data.userFirstName, data.userMiddleName, data.userLastName, data.userSex, data.userDateOfBirth, data.userLocation, data.userPhoneNumber, data.portfolioLink, data.linkedinLink, data.githubLink, data.userEmail, data.userId],
    callback
    )
}