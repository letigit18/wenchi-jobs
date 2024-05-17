const db = require('../config/db')
//create company data 
exports.createCompany = (con, data, callback)=>{
    db.query("insert into company set companyName=?, phoneNumber=?, companyInfo=?, companyNoOfEmp=?, companyEmail=?, companyWebsite=?, companyType=?, companyLocation=?, password=?, companyLogo=?",
[data.companyName, data.phoneNumber, data.companyAbout, data.companyNoOfEmp, data.email, data.website, data.companyType, data.location, data.password, data.companyLogo], callback)
}
//login model
exports.loginModel=(con, data, callback)=>{
    db.query('select * from company where BINARY companyEmail=?', [data.email], callback)
}
//fetch company info
exports.fetchCompanyInfo=(con, data, callback)=>{
    db.query('select * from company where companyId', [data.companyId], callback)
}
//upload company logo model
exports.uploadImage = (con, data, callback)=>{
    db.query('update company set companyLogo=? where companyId=?', [data.companyLogo, data.companyId], callback)
}
//display company image
exports.displayImage = (con, data, callback)=>{
    db.query('select companyId, companyLogo from company where companyId=?', [data.companyId], callback)
}
//fetch company names
exports.fetchCompanyNames = (con, callback)=>{
    db.query('select companyId, companyName from company order by companyName asc', callback)
}
//fetch all job seekers for search purpose 
exports.fetchJobSeekers = (con, callback)=>{
    db.query('select * from jobseekers join skill on jobseekers.userId=skill.userId', callback)
}
//view job seekers
exports.viewJobSeekers=(con, data, callback)=>{
    db.query('select * from jobseekers join skill on jobseekers.userId= skill.userId where jobseekers.userId=?', [data.userId], callback)
}