const companyModel = require('../models/company')
const bcryptjs = require('bcrypt')
//create company req.body controller
exports.createCompanyData= async (req, res)=>{
    const plainPassword = req.body.password;
    const hashedPassword = await bcryptjs.hash(plainPassword, 8)
    const data = {companyName: req.body.companyName, password: hashedPassword, phoneNumber: req.body.phoneNumber, companyAbout: req.body.companyAbout, companyNoOfEmp: req.body.companyNoOfEmp, email: req.body.email, website: req.body.website, companyType: req.body.companyType, location: req.body.location}
    companyModel.createCompany(req.con, data, (error, result)=>{
        if(result){
            res.json({message: "Success"})
        }
        else{
            throw error
        }
    })
}
//admin create company data 
exports.createCompanyDataAdmin= async (req, res)=>{
    const data = {companyName: req.body.companyName, companyType: req.body.companyType}
    if(req.file){
        data.companyLogo = req.file.filename
    }
    companyModel.createCompany(req.con, data, (error, result)=>{
        if(result){
            res.json({message: "Success"})
        }
        else{
            throw error
        }
    })
}
//login company
exports.loginController = ((req, res) => {
    const data = {email: req.body.email}
     companyModel.loginModel(req.con, data, async (error, result) => {
         const password = req.body.password;
         if(error){
             throw error
         }
         else if ((result.length > 0) && (await bcryptjs.compare(password, result[0].password))) {
             req.session.companyId = result[0].companyId;
             req.session.companyType = result[0].companyType;
             req.session.companyName = result[0].companyName;
             req.session.companyLogo = result[0].companyLogo;
             req.session.companyInfo = result[0].companyInfo;

             return res.json({login: true, companyId: req.session.companyId})
           
         }
         else {
             return res.json({login: false})
         }
     })
 })
 //company login authentication controller
 exports.loginCheckerController = ((req, res)=>{
     if(req.session.companyId){
         res.json({valid: true, companyId: req.session.companyId, companyName: req.session.companyName, companyType: req.session.companyType, companyInfo: req.session.companyInfo})
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
 //fetch company info 
 exports.fetchCompanyInfoController = ((req, res)=>{
    const data = {companyId: req.params.id}
    companyModel.fetchCompanyInfo(req.con, data, (error, result)=>{
        if(result.length > 0){
            res.json(result)
        }
        else{
            throw error
        }
    })
 })
 //upload logo image 
exports.uploadCompanyLogoController = (req, res)=>{
    const data = {companyLogo: req.file.filename, companyId: 17};
    companyModel.uploadImage(req.con, data, (error, result)=>{
       if(result){
           companyModel.displayImage(req.con, data, (error2, result2)=>{
               if(result2){
                   res.json({companyLogo: result2[0].companyLogo, companyId: result2[0].companyId})
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
//display company logo
exports.displayCompanyLogoController = (req, res)=>{
    const data = {companyId: req.params.id}
    companyModel.displayImage(req.con, data, (error, result)=>{
        if(result){
            return res.json(result)
        }
        else{
            throw error
        }
    })

}
//fetch company names 
exports.fetchCompanyNameController = (req, res)=>{
    companyModel.fetchCompanyNames(req.con, (error, result)=>{
        if(result){
            res.json(result)
        }
        else{
            throw error
        }
    })
}
//fetch all job seekers
exports.fetchJobSeekersController = (req, res)=>{
    companyModel.fetchJobSeekers(req.con, (error, result)=>{
        if(result){
            res.json(result)
        }
        else{
            throw error
        }
    })
}
//view job seekers
exports.viewJobSeekersController = (req, res)=>{
    const data = {userId: req.params.id}
    companyModel.viewJobSeekers(req.con, data, (error, result)=>{
        if(result){
            return res.json(result)
        }
        else{
            throw error
        }
    })

}