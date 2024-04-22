"use client"
import {useEffect, useState, useRouter } from 'react';
import styles from './finder.module.css';
import Link from 'next/link';
import { useSelector} from 'react-redux';
import moment from 'moment';
import ReactPaginate from 'react-paginate';
const JobFinder = ()=>{
  const [selected, setSelected] = useState(null)
  const isEnglish = useSelector((state)=> state.language.isEnglish)
  const [data, setData] = useState([]);
  //setting pagination variables
  const [pageNumber, setPageNumber] = useState(0)
  const jobsPerPage = 5
  let todaysDate = new Date();
  todaysDate = moment(todaysDate).format('MM/DD/YYYY')

  const pagesVisited = pageNumber * jobsPerPage
  const pagesCount = Math.ceil(data.length / jobsPerPage)

  useEffect(() => {
    fetch('http://localhost:5000/fetch-job-data')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
       setData(data)
      });
  }, []);
  //handle the accordion toggle
  const handleToggle = (index)=>{
    if(selected == index){
        return setSelected(null)
    }
    setSelected(index)
  }
 
  //function that calculates closing date 
  const calculateClosingDate = (date1, date2)=>{
    const diffDate = moment(date1).diff(date2, 'days');
    if(diffDate >= 1){
        return `${diffDate} days left`
    }
    else if(diffDate == 0){
        return "Closing: Today"
    }
    else{
        return "Closed"
    }
  }
  //function that displays jobs
  const displayJobs = data
  .slice(pagesVisited, pagesVisited + jobsPerPage)
  .map((job, index) =>{
    return (
    <div className={styles.box} key={index}>
              <div className={styles.header}>
                  <h3 style={{textTransform: 'capitalize'}}>{job.jobTitle}</h3>
                  <p>{calculateClosingDate(`${moment(job.expiredDate).format('MM/DD/YYYY')}`, todaysDate)} </p>
              </div>
              <ul>

                 {isEnglish ? <li className={styles.company}>{job.companyName}</li> : <li className={styles.company}>{job.companyNameOr != '' ? job.companyNameOr : job.companyName}</li>} 
                  {job.salary != null && <li><b>Salary:</b> {job.salary} </li> }
                  <li><b>Posted: {`${moment(job.postedDate).format('MM')}` == 1 ? ('January') : `${moment(job.postedDate).format('MM')}` == 2 ? 'February': `${moment(job.postedDate).format('MM')}` == 3 ? 'March': `${moment(job.postedDate).format('MM')}` == 4 ? 'April' : `${moment(job.postedDate).format('MM')}` == 5 ? 'May': `${moment(job.postedDate).format('MM')}` == 6 ? 'June': `${moment(job.postedDate).format('MM')}` == 7 ? 'July': `${moment(job.postedDate).format('MM')}` == 8 ? 'August': `${moment(job.postedDate).format('MM')}` == 9 ? 'September': `${moment(job.postedDate).format('MM')}` == 10 ? 'October': `${moment(job.postedDate).format('MM')}` == 11 ? 'November' : 'December'} {`${moment(job.postedDate).format('DD')}`} {`${moment(job.postedDate).format('YYYY')}` }</b> </li>
                  <li><b>Employment Type: </b>{job.employmentType} </li>
                  <li><b>Closing Date: {`${moment(job.expiredDate).format('MM')}` == 1 ? 'January': `${moment(job.expiredDate).format('MM')}` == 2 ? 'February': `${moment(job.expiredDate).format('MM')}` == 3 ? 'March': `${moment(job.expiredDate).format('MM')}` == 4 ? 'April' : `${moment(job.expiredDate).format('MM')}` == 5 ? 'May': `${moment(job.expiredDate).format('MM')}` == 6 ? 'June': `${moment(job.expiredDate).format('MM')}` == 7 ? 'July': `${moment(job.expiredDate).format('MM')}` == 8 ? 'August': `${moment(job.expiredDate).format('MM')}` == 9 ? 'September': `${moment(job.expiredDate).format('MM')}` == 10 ? 'October': `${moment(job.expiredDate).format('MM')}` == 11 ? 'November' : 'December'} {`${moment(job.expiredDate).format('DD')}`} {`${moment(job.expiredDate).format('YYYY')}` }</b> </li>
              </ul>
              <img src='logo.jpg' alt='company logo' className={styles.logo} />
              <div className={styles.tooltip}>
                  Click to view detail!
              </div>
          </div>
  )}) // end of mapping the job data 
  //function that changes page number 
  const changePage = ({selected})=>{
    setPageNumber(selected)
  }
    return(
        <section className={styles.container} id="category">
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
                <div className={styles.jobContainer}>
                    <div className={styles.searchBar}>
                      <input type="text" placeholder='Enter your search term eg. Software Developer' name="job" />
                    </div>
                    {/** function that displays jobs */}
                    {displayJobs}  
                    {/**pagination buttons container */}    
                    <div className='buttonsContainer'>
                        <ReactPaginate 
                        previousLabel= {"Previous"}
                        nextLabel = {"Next"}
                        pageCount={pagesCount}
                        onPageChange={changePage}
                        containerClassName={styles.pagination}
                        previousLinkClassName={styles.previous}
                        nextLinkClassName={styles.next}
                        disabledClassName={styles.disabledBtn}
                        activeClassName={styles.btnActive}
                        />
                    </div>
                </div>
               
            </div>
        </section>
    )
}
export default JobFinder;
