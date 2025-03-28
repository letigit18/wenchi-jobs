const db = require('../config/db');
//fetch job category
exports.fetchCategory = (con, callback)=>{
    db.query('select * from category order by categoryName', callback)   
}
//creates the job record 
exports.createJobRecord = (con, data, callback)=>{
    db.query('insert into jobs set jobTitle=?, jobTitleOr=?, jobDescription=?, jobDescriptionOr=?, jobRequirement=?, jobRequirementOr=?, jobCategory=?, jobCategoryOr=?, expiredDate=?, expiredDateOr=?, jobSalary=?, jobSalaryOr=?, currency=?, currencyOr=?, jobSalaryText=?, jobSalaryTextOr=?, jobExperience=?, jobExperienceOr=?, requiredNo=?, requiredNoOr=?, employmentType=?, employmentTypeOr=?, howToApply=?, howToApplyOr=?, companyId=?, jobLocation=?, jobLocationOr=?',
    [data.jobTitle, data.jobTitleOro, data.jobDescription, data.jobDescriptionOro, data.jobRequirement, data.jobRequirementOro, data.jobCategory, data.jobCategoryOro, data.closingDate, data.closingDateOro, data.jobSalary, data.jobSalaryOro, data.currency, data.currencyOro, data.salaryInText, data.salaryInTextOro, data.experience, data.experienceOro, data.requiredNumber, data.requiredNumberOro, data.employmentType, data.employmentTypeOro, data.howToApply, data.howToApplyOro, data.companyId, data.workPlace, data.workPlaceOro],
    callback
    )
}
//fetch job info
exports.fetchJobInfo = (con, callback)=>{
    db.query('select * from jobs  join company on jobs.companyId = company.companyId order by postedDate desc', callback)
}
exports.fetchJobByCategory = (con, data,  callback)=>{
    db.query('select * from jobs  join company on jobs.companyId = company.companyId where jobs.jobCategory=? order by jobs.postedDate desc', [data.jobCategory], callback)
}
exports.fetchJobDetail = (con, data, callback)=>{
    db.query('select * from jobs  join company on jobs.companyId = company.companyId where jobs.jobId=?',[data.jobId], callback)
}
//fetch job location
exports.fetchLocationData = (con, callback)=>{
    db.query('select DISTINCT jobLocation from jobs order by jobLocation', callback)
}
//counter based on the job category
exports.counterByCategory = (con, callback)=>{
    db.query('select jobCategory, count(*) as counter from jobs group by jobCategory', callback)
}
//fetch job titles for live search
exports.fetchJobData = (con, callback)=>{
    db.query('select jobTitle, jobTitleOr, jobCategory, jobCategoryOr from jobs order by postedDate desc', callback)
}
//fetch active jobs 
exports.fetchActiveJobs = (con, callback)=>{
    db.query('select jobTitle, jobTitleOr, jobCategory, jobCategoryOr from jobs where expiredDate >= CURRENT_DATE order by postedDate desc', callback)
}


//fetch job data by job title
exports.fetchByJobTitle = (con, data, callback)=>{
    db.query(`select * from jobs where jobTitle like ?`, [data.jobTitle], callback)
}
//fetch by organization type
exports.fetchByOrganizationType = (con, data, callback)=>{
    db.query(`select * from jobs join company ON jobs.companyId = company.companyId where company.companyType like ? order by jobs.postedDate desc`, [data.companyType], callback)
}
//fetch by employment type 
exports.fetchByEmploymentType = (con, data, callback)=>{
    db.query(`select * from jobs join company ON jobs.companyId = company.companyId where jobs.employmentType like ? order by jobs.postedDate desc`, [data.employmentType], callback)
}
//fetch by location
exports.fetchByLocation = (con, data, callback)=>{
    db.query(`select * from jobs join company ON jobs.companyId = company.companyId where jobs.jobLocation like ? order by jobs.postedDate desc`, [data.jobLocation], callback)
}
//fetch by location
exports.fetchByExperience = (con, data, callback)=>{
    db.query(`select * from jobs join company ON jobs.companyId = company.companyId where jobs.jobExperience >= ? and jobs.jobExperience <= ? order by jobs.postedDate desc`, [data.minExp, data.maxExp], callback)
}

