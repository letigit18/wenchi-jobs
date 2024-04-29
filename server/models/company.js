const db = require('../config/db')
//create company data 
exports.createCompany = (con, data, callback)=>{
    db.query("insert into company set companyName=?, companyInfo=?, companyNoOfEmp=?, companyEmail=?, companyWebsite=?, companyType=?, companyLocation=?, password=?",
[data.companyName, data.companyAbout, data.companyNoOfEmp, data.email, data.website, data.companyType, data.location, data.password], callback)
}