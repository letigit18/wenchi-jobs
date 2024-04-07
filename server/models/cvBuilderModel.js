const db = require('../config/db');
//education models
exports.fetchEducationData = (con, data, callback)=>{
    db.query('select * from jobseekers join education on jobseekers.userId= education.userId  where jobseekers.userId = ?',[data.userId],callback)
}
exports.createEducationData = (con, data, callback)=>{
    db.query('insert into education set educationalLevel=?, department=?, collegeName=?, cgpa=?, startDate=?, endDate=?, userId=?',
    [data.educationalLevel, data.department, data.collegeName, data.cgpa, data.startDate, data.endDate, data.userId],
    callback
    )
}
exports.updateEducationData = (con, data, callback)=>{
    db.query('update education set educationalLevel=?, department=?, collegeName=?, cgpa=?, startDate=?, endDate=? where userId=? and id=?',
    [data.educationalLevel, data.department, data.collegeName, data.cgpa, data.startDate, data.endDate, data.userId, data.id],
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
    db.query('insert into experience set id=?, employerName=?, jobTitle=?, responsibility=?, totalExperience=?, startDate=?, endDate=?, userId=?',
    [data.id, data.employerName, data.jobTitle, data.jobResponsibility, data.totalExperience, data.startDate, data.endDate, data.userId],
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
    db.query('insert into language set id=?, language=?, other=?, proficiency=?, userId=?',
    [data.id, data.language, data.other, data.proficiency, data.userId],
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
    db.query('select * from skill where userId = ?',[data.userId],callback)
}
exports.createSkillData = (con, data, callback)=>{
    db.query('insert into skill set id=?, skills=?, profileSummary=?, userId=?',
    [data.id, data.skills, data.profileSummary, data.userId],
    callback
    )
}
exports.updateSkillData = (con, data, callback)=>{
    db.query('update language set id=?, skills=?, profileSummary=?, userId=? where id=? AND userId=?',
    [data.id, data.skills, data.profileSummary, data.userId, data.id, data.userId],
    callback
    )
}
exports.deleteSkillData = (con, data, callback)=>{
    db.query('delete from skill where id =? and userId=?', [data.id, data.userId], callback)
}