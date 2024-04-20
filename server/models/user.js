const db = require('../config/db')
//signup model
exports.signupModel = (con, data, callback)=>{
    db.query('insert into jobseekers set userFirstName=?, userMiddleName=?, userEmail=?, password=?',
    [data.userFirstName, data.userMiddleName, data.userEmail, data.userPassword],
    callback
    )
}