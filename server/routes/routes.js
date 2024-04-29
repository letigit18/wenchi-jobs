const express = require("express");
const nodemailer = require('nodemailer');
const router = express.Router();
const cvBuilderController = require("../controllers/cvBuilder")
const userController = require("../controllers/user")
const upload = require("../controllers/imageUpload")
const jobController =  require('../controllers/jobs')
const companyController = require('../controllers/company')
//login controllers
router.post('/auth', userController.loginController)
//user routes 
router.post('/create-signup-data', userController.signupController)
//CV builder education route handlers
router.get('/fetch-educational-data', cvBuilderController.fetchEducationalData)
router.post('/create-education-data', cvBuilderController.createEducationData)
router.put('/update-education-data', cvBuilderController.updateEducationData)
router.post('/delete-education-data', cvBuilderController.deleteEducationData)
//CV builder experience route handlers
router.get('/fetch-experience-data', cvBuilderController.fetchExperienceData)
router.post('/create-experience-data', cvBuilderController.createExperienceData)
router.put('/update-experience-data', cvBuilderController.updateExperienceData)
router.delete('/delete-experience-data', cvBuilderController.deleteExperienceData)
//CV builder language route handlers 
router.get('/fetch-language-data', cvBuilderController.fetchLanguageData)
router.post('/create-language-data', cvBuilderController.createLanguageData)
router.put('/update-language-data', cvBuilderController.updateLanguageData)
router.delete('/delete-language-data', cvBuilderController.deleteLanguageData)
//CV builder skill route handlers 
router.get('/fetch-skill-data', cvBuilderController.fetchSkillData)
router.post('/create-skill-data', cvBuilderController.createSkillData)
router.put('/update-skill-data', cvBuilderController.updateSkillData)
router.delete('/delete-skill-data', cvBuilderController.deleteSkillData)
//CV builder personal data route handlers 
router.get('/fetch-personal-data/:id', cvBuilderController.fetchPersonalDataController)
router.put('/update-personal-data', cvBuilderController.updatePersonalData)
//CV builder cv image changer
router.post('/upload-cv-image', upload.single('image'), cvBuilderController.uploadProfileImage)
router.get('/display-user-image/:id', cvBuilderController.displayCVImage)
//job routes
router.get('/fetch-jobs', jobController.fetchAllJobDataController)
router.get('/fetch-job-category', jobController.fetchJobCategoryController)
router.get('/fetch-by-title/:id', jobController.fetchByJobTitleController)
router.get('/fetch-job-data', jobController.fetchJobDataController)
router.get('/fetch-job-detail/:id', jobController.fetchJobDetailController)
router.post('/create-job-data', jobController.createJobRecordController)
router.get('/fetch-location-data', jobController.fetchLocationDataController)
router.get('/browse-by-category/:id', jobController.fetchJobByCategoryController)
router.get('/job-counter', jobController.jobCounterController)
//route to company pages
router.post('/create-company-data', companyController.createCompanyData)
//jobseekrs route 
router.get('/job-seekers-home', userController.loginCheckerController)
router.get('/logout', userController.logoutController)
//send mail
router.post('/send-email',userController.forgetPasswordController) 
module.exports = router;