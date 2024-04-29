"use client"
import React, {useEffect, useState} from 'react'
import styles from './jobDetail.module.css'
import Link from 'next/link';
import { useSelector} from 'react-redux';

import moment from 'moment';

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
    
 }
    useEffect(() => {
        fetch('http://localhost:5000/fetch-job-detail/'+params.jobId)
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
            <div className={styles.category}>
                    <div className={styles.title}>
                        Job categories
                    </div>
                    <div className={styles.accordion}>
                      <div className={styles.accordionMenuItem}>
                        <div className={selected === 1 ? `${styles.accordionItemHeader} ${styles.active}`: `${styles.accordionItemHeader}`} onClick={()=>handleToggle(1)}>
                            Organization Type
                        </div>
                        <div className={styles.accordionItemBody}>
                            <ul className={styles.accordioItemBodyContent}>
                                <li><Link href="#">Government Jobs</Link></li>
                                <li>NGO Jobs</li>
                                <li>University Jobs</li>
                            </ul>
                        </div>
                      </div>
                      <div className={styles.accordionMenuItem}>
                        <div className={selected === 2 ? `${styles.accordionItemHeader} ${styles.active}`: `${styles.accordionItemHeader}`}  onClick={()=>handleToggle(2)}>
                            Job Type
                        </div>
                        <div className={styles.accordionItemBody}>
                            <ul className={styles.accordioItemBodyContent}>
                                <li>Contractual Jobs </li>
                                <li>Permanent Jobs</li>
                                <li>Remote Jobs</li>
                                <li>Contractual Jobs</li>
                                <li>Permanent Jobs</li>
                                <li>Remote Jobs</li>
                                <li>Contractual Jobs</li>
                                <li>Permanent Jobs</li>
                                <li>Remote Jobs</li>
                                <li>Contractual Jobs</li>
                                <li>Permanent Jobs</li>
                                <li>Remote Jobs</li>
                            </ul>
                        </div>
                      </div>
                      <div className={styles.accordionMenuItem}>
                        <div className={selected === 3 ? `${styles.accordionItemHeader} ${styles.active}`: `${styles.accordionItemHeader}`}  onClick={()=>handleToggle(3)}>
                            Company names
                        </div>
                        <div className={styles.accordionItemBody}>
                            <ul className={styles.accordioItemBodyContent}>
                                <li>Awash bank</li> 
                            </ul>
                        </div>
                      </div>
                      <div className={styles.accordionMenuItem}>
                        <div className={selected === 4 ? `${styles.accordionItemHeader} ${styles.active}`: `${styles.accordionItemHeader}`}  onClick={()=>handleToggle(4)}>
                            Location
                        </div>
                        <div className={styles.accordionItemBody}>
                            <ul className={styles.accordioItemBodyContent}>
                                <li>Addis Ababa</li> 
                            </ul>
                        </div>
                      </div>
                      
                    </div>
                        
                </div>
                {data.map((job, index)=> {
                return <div className={styles.jobContainer} key={index}>
                    <div className={styles.jobBox}>
                        <h1>{job.jobTitle}</h1>
                        <h2 className={styles.companyName}>By {job.companyName}</h2>
                        {job.salary != undefined ? `Salary: ${job.salary}`: job.jobSalaryText != '' ? `Salary: ${job.jobSalaryText}` : ''}
                        <p>Posted: {`${moment(job.postedDate).format('MM')}` == 1 ? ('January') : `${moment(job.postedDate).format('MM')}` == 2 ? 'February': `${moment(job.postedDate).format('MM')}` == 3 ? 'March': `${moment(job.postedDate).format('MM')}` == 4 ? 'April' : `${moment(job.postedDate).format('MM')}` == 5 ? 'May': `${moment(job.postedDate).format('MM')}` == 6 ? 'June': `${moment(job.postedDate).format('MM')}` == 7 ? 'July': `${moment(job.postedDate).format('MM')}` == 8 ? 'August': `${moment(job.postedDate).format('MM')}` == 9 ? 'September': `${moment(job.postedDate).format('MM')}` == 10 ? 'October': `${moment(job.postedDate).format('MM')}` == 11 ? 'November' : 'December'} {`${moment(job.postedDate).format('DD')}`} {`${moment(job.postedDate).format('YYYY')}` }</p>
                    </div>
                    {job.jobDescription != undefined && (
                      <>
                        <h2>Job Description</h2>
                        <div dangerouslySetInnerHTML={{__html: job.jobDescription}}>
                        </div>
                      </>
                       
                    )}
                    <h2>Job Requirement</h2>
                     <div dangerouslySetInnerHTML={{__html: job.jobRequirement}}>
                     </div>
                     <h2>How to Apply</h2>
                     <div dangerouslySetInnerHTML={{__html: job.howToApply}}>
                     </div>
                     <button className={styles.btnBack} onClick={()=>{handleBack}}>Back to previous page</button>
                       
                        
                </div>
            })}
            </div>
        </section>
    )
}
export default ViewJobDetail;