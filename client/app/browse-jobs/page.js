"use client"
import {useEffect, useState, useRouter } from 'react';
import styles from './finder.module.css';
import Link from 'next/link';
import { useSelector} from 'react-redux';
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import LeftMenu from '@/components/Category/LeftMenu/LeftMenu';
const JobFinder = ()=>{
  const [selected, setSelected] = useState(null)
  const isEnglish = useSelector((state)=> state.language.isEnglish)
  const [data, setData] = useState([]);
  //setting pagination variables
  const [pageNumber, setPageNumber] = useState(0)
  const jobsPerPage = 10
  let todaysDate = new Date();
  todaysDate = moment(todaysDate).format('MM/DD/YYYY')

  const pagesVisited = pageNumber * jobsPerPage
  const pagesCount = Math.ceil(data.length / jobsPerPage)

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_SERVER_ADDRESS+'/fetch-job-data')
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
      
        return isEnglish == "English" ? `${diffDate} days left`: isEnglish == "Oromic" ? `Guyyaa ${diffDate} hafe` : `${diffDate} ቀን ይቀራል`
    }
    else if(diffDate == 0){
        return isEnglish == "English" ? "Closing: Today": isEnglish == "Oromic" ? "Guyyaan xuumuuraa: Har'aa" : "የመዝጊያ ቀን፡ ዛሬ"
    }
    else{
        return isEnglish == "English" ? "Closed" : isEnglish == "Oromic" ? "Cufameera": "ተዘግቷል" 
    }
  }
  //function that displays jobs
  const displayJobs = data
  .slice(pagesVisited, pagesVisited + jobsPerPage)
  .map((job, index) =>{
    return (
    <Link href={`/browse-jobs/${job.jobId}`}>
    <div className={styles.box} key={index}>
              <div className={styles.header}>
                 <h3 style={{textTransform: 'capitalize'}}>{job.jobTitle}</h3>
                  <p>{calculateClosingDate(`${moment(job.expiredDate).format('MM/DD/YYYY')}`, todaysDate)} </p>
              </div>
              <ul>
              {isEnglish ? <li className={styles.company}>{job.companyName}</li> : <li className={styles.company}>{job.companyNameOr != undefined ? job.companyNameOr : job.companyName}</li>} 
                <table>
                  <tr>
                    <td>{isEnglish == "English" ? "Employment Type:" : isEnglish =="Oromic" ? "Haala qacarrii" : "የቅጥር ሁኔታ"}</td>
                    <td>{isEnglish ? job.employmentType : job.employmentTypeOr}</td>
                  </tr>
                  <tr>
                    <td>{job.jobSalary != undefined && (isEnglish == "English" ? "Salary:" : isEnglish =="Oromic" ? "Miindaa" : "ደሞዝ") || job.jobSalaryText.length > 1  && (isEnglish == "English" ? "Salary:" : isEnglish =="Oromic" ? "Miindaa" : "ደሞዝ")}</td>
                    <td>{job.jobSalary != undefined ? `${job.jobSalary} ${job.currency}` : (isEnglish == "English" ? job.jobSalaryText : isEnglish =="Oromic" ? job.jobSalaryTextOr : job.jobSalaryText)}</td>
          
                  </tr>
                  <tr>
                    <td>{isEnglish == "English" ? "Posted Date:" : isEnglish =="Oromic" ? "Guyyaa Maxxanffame:" : "የተለጠፈበት ቀን"}</td>
                    <td>{`${moment(job.postedDate).format('MM')}` == 1 ? ('January') : `${moment(job.postedDate).format('MM')}` == 2 ? 'February': `${moment(job.postedDate).format('MM')}` == 3 ? 'March': `${moment(job.postedDate).format('MM')}` == 4 ? 'April' : `${moment(job.postedDate).format('MM')}` == 5 ? 'May': `${moment(job.postedDate).format('MM')}` == 6 ? 'June': `${moment(job.postedDate).format('MM')}` == 7 ? 'July': `${moment(job.postedDate).format('MM')}` == 8 ? 'August': `${moment(job.postedDate).format('MM')}` == 9 ? 'September': `${moment(job.postedDate).format('MM')}` == 10 ? 'October': `${moment(job.postedDate).format('MM')}` == 11 ? 'November' : 'December'} {`${moment(job.postedDate).format('DD')}`.concat(',')} {`${moment(job.postedDate).format('YYYY')}` }</td>
                  </tr>
                  <tr>
                    <td>{isEnglish == "English" ? "Closing Date:" : isEnglish =="Oromic" ? "Guyyaa cufiinsaa" : "የመዝጊያ ቀን"}</td>
                    <td>{`${moment(job.expiredDate).format('MM')}` == 1 ? 'January': `${moment(job.expiredDate).format('MM')}` == 2 ? 'February': `${moment(job.expiredDate).format('MM')}` == 3 ? 'March': `${moment(job.expiredDate).format('MM')}` == 4 ? 'April' : `${moment(job.expiredDate).format('MM')}` == 5 ? 'May': `${moment(job.expiredDate).format('MM')}` == 6 ? 'June': `${moment(job.expiredDate).format('MM')}` == 7 ? 'July': `${moment(job.expiredDate).format('MM')}` == 8 ? 'August': `${moment(job.expiredDate).format('MM')}` == 9 ? 'September': `${moment(job.expiredDate).format('MM')}` == 10 ? 'October': `${moment(job.expiredDate).format('MM')}` == 11 ? 'November' : 'December'} {`${moment(job.expiredDate).format('DD')}`.concat(',')} {`${moment(job.expiredDate).format('YYYY')}` }</td>
                  </tr>
                 
                </table>

              </ul>
              {job.companyLogo != undefined && <img src={`${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/logoImages/`+job?.companyLogo}  className={styles.logo} /> }
              <div className={styles.tooltip}>
                {isEnglish == "English" ? "Click to view detail": isEnglish == "Oromic" ? "Bal'ina isaa ilaaluuf cuqaasaa" : "ዝርዝሩን ለማየት ይጫኑ"}
              </div>
              <div className={styles.btnView}>
                {isEnglish == "English" ? "View Detail": isEnglish == "Oromic" ? "Bal'inaan Ilaalaa" : "ዝርዝሩን ተመልከቱ"}
              </div>
    </div>
    </Link>
  )}) // end of mapping the job data 
  //function that changes page number 
  const changePage = ({selected})=>{
    setPageNumber(selected)
  }
    return(
        <section className={styles.container} id="category">
            <div className={styles.card}>
                <LeftMenu />
                <div className={styles.jobContainer}>
                   
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
