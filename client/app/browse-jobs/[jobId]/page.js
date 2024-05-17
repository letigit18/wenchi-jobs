"use client"
import React, {useEffect, useState} from 'react'
import styles from './jobDetail.module.css'
import Link from 'next/link';
import { useSelector} from 'react-redux';

import moment from 'moment';
import LeftMenu from '@/components/Category/LeftMenu/LeftMenu';

const ViewJobDetail = ({params})=>{
    const [selected, setSelected] = useState(null)
    const isEnglish = useSelector((state)=> state.language.isEnglish)
    const [data, setData] = useState([])
    
      //handle the accordion toggle
  const handleToggle = (index)=>{
    if(selected == index){
        return setSelected(null)
    }
    setSelected(index)
  }
 //handle back button
 const handleBack = ()=>{
  window.history.back()
    
 }
    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_SERVER_ADDRESS+'/fetch-job-detail/'+params.jobId)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
           setData(data)
           
          });
      }, []);
    return(
        <section className={styles.container}>
            <div className={styles.card}>
            <LeftMenu />
                {data.map((job, index)=> {
                return <div className={styles.jobContainer} key={index}>
                    <div className={styles.jobBox}>
                      <div className={styles.headerContent}>
                          <div className={styles.leftContent}>
                            <h1>{job.jobTitle}</h1>
                            <h2 className={styles.companyName}>By {job.companyName}</h2>
                            <table>
                             <tr>
                                <td>{isEnglish == "English" ? "Employment Type:" : isEnglish =="Oromic" ? "Haala Qacarrii፡" : "የቅጥር ሁኔታ"}</td>
                                <td>{job.employmentType}</td>
                              </tr>
                              <tr>
                                <td>{isEnglish == "English" ? "Job Category" : isEnglish =="Oromic" ? "Gosa Hojii" : "የስራዉ ምድብ"}</td>
                                <td style={{textTransform: 'capitalize'}}>{`${job.jobCategory}`}</td>
                              </tr>
                              <tr>
                                <td>{isEnglish == "English" ? "Salary:" : isEnglish =="Oromic" ? "Miindaa" : "ደሞዝ"}</td>
                                <td>{job.jobSalary != undefined ? `${job.jobSalary} ${job.currency}` : job.jobSalaryText}</td>
                              </tr>
                            {job.jobExperience != undefined &&
                              <tr>
                                <td>{isEnglish == "English" ? "Minimum Experience:" : isEnglish =="Oromic" ? "Muuxannoo Hojii:" : "የስራ ልምድ"}</td>
                                <td>{isEnglish == "English" ? `${job.jobExperience} Years`: isEnglish == "Oromic" ? `Waggaa ${job.jobExperience}` : `${job.jobExperience} አመት`}</td>
                              </tr>
                            }
                              
                            </table>
                          
                         
                                        
                                           
                          </div>
                          <div className={styles.rightContent}>
                            <table>
                            
                              <tr>
                                <td>{isEnglish == "English" ? "Posted Date:" : isEnglish =="Oromic" ? "Guyyaa Maxxanfame:" : "የተለጠፈበት ቀን"}</td>
                                <td>{`${moment(job.postedDate).format('MM')}` == 1 ? ('January') : `${moment(job.postedDate).format('MM')}` == 2 ? 'February': `${moment(job.postedDate).format('MM')}` == 3 ? 'March': `${moment(job.postedDate).format('MM')}` == 4 ? 'April' : `${moment(job.postedDate).format('MM')}` == 5 ? 'May': `${moment(job.postedDate).format('MM')}` == 6 ? 'June': `${moment(job.postedDate).format('MM')}` == 7 ? 'July': `${moment(job.postedDate).format('MM')}` == 8 ? 'August': `${moment(job.postedDate).format('MM')}` == 9 ? 'September': `${moment(job.postedDate).format('MM')}` == 10 ? 'October': `${moment(job.postedDate).format('MM')}` == 11 ? 'November' : 'December'} {`${moment(job.postedDate).format('DD')}`.concat(',')} {`${moment(job.postedDate).format('YYYY')}` }</td>
                              </tr>
                              <tr>
                                <td>{isEnglish == "English" ? "Closing Date:" : isEnglish =="Oromic" ? "Guyyaa Cufinsaa" : "የመዝጊያ ቀን"}</td>
                                <td>{`${moment(job.expiredDate).format('MM')}` == 1 ? ('January') : `${moment(job.expiredDate).format('MM')}` == 2 ? 'February': `${moment(job.expiredDate).format('MM')}` == 3 ? 'March': `${moment(job.expiredDate).format('MM')}` == 4 ? 'April' : `${moment(job.expiredDate).format('MM')}` == 5 ? 'May': `${moment(job.expiredDate).format('MM')}` == 6 ? 'June': `${moment(job.expiredDate).format('MM')}` == 7 ? 'July': `${moment(job.expiredDate).format('MM')}` == 8 ? 'August': `${moment(job.expiredDate).format('MM')}` == 9 ? 'September': `${moment(job.expiredDate).format('MM')}` == 10 ? 'October': `${moment(job.expiredDate).format('MM')}` == 11 ? 'November' : 'December'} {`${moment(job.expiredDate).format('DD')}`.concat(',')} {`${moment(job.expiredDate).format('YYYY')}` }</td>
                              </tr>
                              <tr>
                                <td>{isEnglish == "English" ? "Work place:" : isEnglish =="Oromic" ? "Bakka Hojii:" : "የስራዉ ቦታ"}</td>
                                <td>{job.jobLocation}</td>
                              </tr>
                              {job.requiredNo != undefined && (
                              <tr>
                                <td>{isEnglish == "English" ? "Required Number:" : isEnglish =="Oromic" ? `Baay'inaa Barbaadamuu:` : "ብዛት"}</td>
                                <td>{job.requiredNo}</td>
                              </tr>
                              )}
                            </table>
                            
                            
                            
                          </div>
                      </div>
                    </div>
                      
                    {job.jobDescription != undefined && (
                      <div className={styles.descriptionContainer}>
                        <h2>{isEnglish == "English" ? "Job Description" : isEnglish =="Oromic" ? `Bal'inaa Hojii` : "የስራዉ ዝርዝር"}</h2>
                        <div dangerouslySetInnerHTML={{__html: job.jobDescription}}>
                        </div>
                      </div>
                       
                    )}
                    <h2>{isEnglish == "English" ? "Job Requirement" : isEnglish =="Oromic" ? "Ulaagaa Hojii" : "የስራዉ መስፈርት"}</h2>
                     <div dangerouslySetInnerHTML={{__html: job.jobRequirement}}>
                     </div>
                     <h2>{isEnglish == "English" ? "How to apply" : isEnglish =="Oromic" ? "Haala Galmee" : "የማመልከቻ ሁኔታ"}</h2>
                     <div dangerouslySetInnerHTML={{__html: job.howToApply}}>
                     </div>
                     <button className={styles.btnBack} onClick={()=>{handleBack()}}><i class='bx bx-arrow-back'></i> Back</button>
                       
                        
                </div>
            })}
            </div>
        </section>
    )
}
export default ViewJobDetail;