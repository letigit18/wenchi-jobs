const userModel = require('../models/user')
const bcryptjs = require('bcrypt')
const nodemailer = require('nodemailer')
//signup users 
exports.signupController = async(req, res)=>{
    const plainPassword = req.body.password;
    const hashedPassword = await bcryptjs.hash(plainPassword, 8);
    const data = {userFirstName: req.body.firstName, userMiddleName: req.body.middleName,  userEmail: req.body.email, userPassword: hashedPassword}
    userModel.signupModel(req.con, data, (error, result)=>{
        if(result){
            res.json({"message": "Success"})
        }
        else{
            throw error
        }
    })
}
//login job seekrs
exports.loginController = ((req, res) => {
   const data = {email: req.body.email}
    userModel.loginModel(req.con, data, async (error, result) => {
        const password = req.body.password;
        if(error){
            throw error
        }
        else if ((result.length > 0) && (await bcryptjs.compare(password, result[0].password))) {

            req.session.userFirstName = result[0].userFirstName;
            req.session.userMiddleName = result[0].userMiddleName;
            req.session.userId=result[0].userId;
            req.session.login = true;
            return res.json({login: true, userFirstName: req.session.userFirstName, userMiddleName: req.session.userMiddleName, userId: req.session.userId})
          

        }
        else {
            return res.json({login: false})
        }
    })
})
//job seekers controller
exports.loginCheckerController = ((req, res)=>{
    if(req.session.userFirstName){
        res.json({valid: true, userFirstName: req.session.userFirstName, userMiddleName: req.session.userMiddleName, userId: req.session.userId })
    }
    else{
        res.json({valid: false})
    }
})
//logout controller
exports.logoutController = ((req, res)=>{
    req.session.destroy(err=>{
        if(err){
            res.status(500).json({logout: false})
        }
        else{
            res.json({logout: true})
        }
    })
})
//forgot password
exports.forgetPasswordController =  ((req, res) => {
    const data = {email: req.body.email}
    const randCode = Math.floor(Math.random() * 90000) + 10000;
    console.log(randCode)
    console.log(data.email)
    userModel.forgetModel(req.con, data, (error, result)=>{
        if(result.length === 1){
          let transporter = nodemailer.createTransport({
        host: 'mail.wenchijobs.com',
        port: 465, // Port for SMTP
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'info@wenchijobs.com', // Your cPanel email address
            pass: 'Lee.0910985181##' // Your email password
        }
    });
    let mailOptions = {
        from: 'info@wenchijobs.com', // sender address
        to: data.email, // list of receivers
        subject: 'Password Reset', // Subject line
        text: 'This is the message from wenchi jobs,',// plain text body
        html: `<p>Hello, here is your Verification code to reset your password:</p>
          <h3> ${randCode} </h3>
          <a href='http:localhost:3000/reset-password'>Click this link </a>
        `
    };
    
    // Send email
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            res.json({mesage: "Error"})
          
        } else {
            res.json({message: "Success", code: randCode})
        }
    });
        }
        else if(result.length === 0){
            res.json({message: "Not found"})
        }
        else{
            throw error
        }
    })

   
})