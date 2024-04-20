const express = require("express");
const router = express.Router();
const cvBuilderController = require("../controllers/cvBuilder")
const userController = require("../controllers/user")
const upload = require("../controllers/imageUpload")
const jobController =  require('../controllers/jobs')
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
router.get('/fetch-personal-data', cvBuilderController.fetchPersonalDataController)
router.put('/update-personal-data', cvBuilderController.updatePersonalData)
//CV builder cv image changer
router.post('/upload-cv-image', upload.single('image'), cvBuilderController.uploadProfileImage)
router.get('/display-user-image', cvBuilderController.displayCVImage)
//job routes
router.get('/fetch-job-category', jobController.fetchJobCategoryController)
module.exports = router;