const nodemailer = require('nodemailer');
exports.sendFeedback = (req, res)=>{
    const data = {email: req.body.email, subject: req.body.subject, userMessage: req.body.userMessage}
  
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
        from: data.email, // sender address
        to:'info@wenchijobs.com', // list of receivers
        subject: data.subject, // Subject line
        text: data.userMessage
    }; 
    // Send email
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            res.json({mesage: "Error"})
          
        } else {
            res.json({message: "Success"})
        }
    });
        
     
   

}