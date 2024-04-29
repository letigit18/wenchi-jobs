const db = require('../config/db')
//signup model
exports.signupModel = (con, data, callback)=>{
    db.query('insert into jobseekers set userFirstName=?, userMiddleName=?, userEmail=?, password=?',
    [data.userFirstName, data.userMiddleName, data.userEmail, data.userPassword],
    callback
    )
}
//login model
exports.loginModel=(con, data, callback)=>{
    db.query('select * from jobseekers where BINARY userEmail=?', [data.email], callback)
}
//forget password 
exports.forgetModel=(con, data, callback)=>{
    db.query('select userId, userEmail from jobseekers where userEmail=?', [data.email], callback)
}