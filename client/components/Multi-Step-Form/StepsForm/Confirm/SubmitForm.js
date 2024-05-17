"use client"
import {useState, useEffect, useRef} from 'react'
import NavButtons from '../../NavButtons';
import styles from './confirm.module.css'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import {useForm} from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import moment from 'moment';
import { getImageData, getPersonalData, updateConfirmationData } from '@/redux/multiStepForm';
import axios from 'axios';
const SubmitForm = () =>{
    //const [confirmation, setConfirmation] = useState(false)
    const dispatch = useDispatch()
    const confirmation = useSelector((state)=> state.CVBuilder.confirmation)
    //redux state for CV builder
    const personalData = useSelector((state)=>state.CVBuilder.personalData)
    const educationData = useSelector((state)=>state.CVBuilder.educationalFormData)
    const experienceData = useSelector((state)=>state.CVBuilder.experienceData)
    const languageData = useSelector((state)=> state.CVBuilder.languageData)
    const skillData = useSelector((state)=>state.CVBuilder.skillData)
    const imageData = useSelector((state)=>state.CVBuilder.imageData)
    const pdfRef = useRef()
    const {handleSubmit} = useForm()
    useEffect(()=>{
        //functin that fetches personal data from server
        async function fetchPersonalData(){
         await axios.get(process.env.NEXT_PUBLIC_SERVER_ADDRESS+'/fetch-personal-data')
         .then((res)=>{
             dispatch(getPersonalData(res.data[0]))
         })
         
         .catch(err=>console.log(err))
       }
       //function that fetches image data from the server
       async function fetchImageData(){
         await axios.get(process.env.NEXT_PUBLIC_SERVER_ADDRESS+'/display-user-image')
         .then((res) => {
             dispatch(getImageData(res.data[0]))
             console.log(res.data[0])
         })
         .catch(err => console.log(err))
        }
       fetchPersonalData()
       fetchImageData()
       
       }, [])
    //handle onsubmit
    const onSubmit = ()=>{
        downloadPDF()
    }
    //function that generatos CV in PDF   
    const downloadPDF = ()=>{
        const input = pdfRef.current;
        var opt = {
            useCORS: true,
            margin:0,
            scale: 3,
            quality: 2,
            filename:     'my_file_name.pdf',
            image:        { type: 'png'},
        };
        html2canvas(input, opt).then(function (canvas) {
            var imgData = canvas.toDataURL("image/jpeg");
            var pdf = new jsPDF('p', 'mm', 'a4', true);
            var pdfWidth = pdf.internal.pageSize.getWidth();
            var pdfHeight = pdf.internal.pageSize.getHeight();
            var imgWidth = canvas.width;
            var imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth/imgWidth, pdfHeight/imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 0;
            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
            pdf.save('CV.pdf');
        });
        }
    return(
        <section className={styles.card}>
           <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.container}>
             <p>You should check the following checkbox to download your CV !</p>
             <div>
                <input type="checkbox" value={confirmation} name="confirmation" onChange={(e)=> dispatch(updateConfirmationData(!confirmation))} id="confirmation" />
                <label htmlFor='confirmation'>I confirm that all the provided information is correct.</label>
                 
            </div>
             
            </div> 
            <NavButtons />
           </form>
           <div className={confirmation ? `${styles.cvPreview} ${styles.active}` : styles.cvPreview}>
              <div className={styles.CVContainer} ref={pdfRef}>
                 <div className={styles.header}>
                   <img src={`${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/uploads/`+imageData?.userImage}  />
                   <div className={styles.personalInfo}>
                      <p className={styles.nameInfo}>{`${personalData?.userFirstName} ${personalData?.userMiddleName}`}</p>
                      <ul className={styles.personalInfo1}>
                        <li><i className='bx bx-current-location'></i> <span>{`${personalData?.userLocation}, Ethiopia`}</span></li>
                        <li><i className='bx bxs-phone'></i> <span>{personalData?.userPhoneNumber}</span></li>
                        
                      </ul>
                   </div>
                   <ul className={styles.personalInfo2}>
                        <li><i className='bx bx-envelope'></i> <span>{personalData?.userEmail}</span></li>
                        <li onClick={()=>{
                            window.location.href(`${personalData?.linkedinLink}`)
                        }}><i className='bx bxl-linkedin-square' ></i><a href={`${personalData?.linkedinLink}`}> <span>{`${personalData?.linkedinLink}`}</span></a> </li>
                                       
                   </ul>
                   
                 </div>{/**end of cv header  */}
                 {/**body of the cv goes here ... */}
                 <div className={styles.cvBodyContainer}>
                    <div className={styles.leftContainer}>
                        <div className={styles.personalInfo}>
                             <h2>Personal Information</h2>
                            
                            <ul>
                                <li><p>Full Name:</p> <span>{personalData?.userFirstName} {personalData?.userMiddleName} {personalData?.userLastName}</span></li>
                                <li><p>Sex:</p> <span>{personalData?.userSex}</span></li>
                                <li><p>Birth Year:</p> <span>{`${moment(personalData?.userDateOfBirth).format('DD/MM/YYYY')} G.C.`}</span></li>
                                {personalData?.githubLink == null && personalData?.portfolioLink == null && <li><p>Mobile No.:</p><span>{personalData?.userPhoneNumber}</span></li>}
                                {personalData?.githubLink != null && <li><p>Github Link: </p><span><Link href={`${personalData?.githubLink}`}>{personalData?.githubLink}</Link></span></li> } 
                                {personalData?.portfolioLink != null && <li><p>Portfolio: </p> <span><Link href={`${personalData?.portfolioLink}`}>{personalData?.portfolioLink}</Link></span></li> }
                               
                            </ul>
                        </div>
                        <div className={styles.skillInfo}>
                             
                           <h2>Skills</h2>
                          {/**display in the form of lists */}
                           { skillData[0]?.skills.split(',').length <= 6 && 
                            <ul className={styles.skillList}>
                           
                                {skillData[0]?.skills.split(',').map((skill, index)=>{
                                    return <li key={index}>{skill}</li>
                                })}
                           
                            </ul>
                           }
                           {/**display in the form two cols */}
                           { skillData[0]?.skills.split(',').length > 6 && 
                            <ul className={styles.twoCols}>
                           
                                {skillData[0]?.skills.split(',').map((skill, index)=>{
                                    return <li key={index}>{skill}</li>
                                })}
                           
                            </ul>
                           }
                        </div>
                        <div className={styles.languageInfo}>
                            <h2>Language</h2>
                            
                            {languageData?.map((language, index)=>{
                            return <ul className={styles.languageList} key={index}>
                               <li><p>{language.language != 'other' ? language.language : language.other}</p><span>{language.proficiency}</span></li> 
                                
                            </ul>
                            })}
                        </div>
                        <div className={styles.referenceInfo}>
                            <h2>References</h2>
                            
                            <p>References available upon request.</p>


                        </div>
                      
                    </div>
                    <div className={styles.rightContainer}>
                        <div className={styles.profileSummary}>
                            <h2><img src="summary.jpg" />  Profile Summary</h2>
                            <div className={styles.headerLine}></div>
            
                            <p>{skillData[0]?.profileSummary}</p>
                        </div>
                        <div className={styles.educationInfo}>
                            <h2><img src="education.png" />  Education</h2>
                            <div className={styles.headerLine}></div>
                            {educationData?.map((education, index)=>{
                            return <div className={styles.educationContainer} key={index}>
                                <div className={styles.educationalLevel}>
                                    <b>{education.educationalLevel}</b> in <b> {education.department} {education.cgpa >= 3 && `(CGPA: ${education.cgpa})`}</b>
                                    <p> {education.collegeName == 'other' ? education.other : education.collegeName} {'('}{`${moment(education?.startDate).format('MM')}` == 1 ? ('January') : `${moment(education?.startDate).format('MM')}` == 2 ? 'February': `${moment(education?.startDate).format('MM')}` == 3 ? 'March': `${moment(education?.startDate).format('MM')}` == 4 ? 'April' : `${moment(education?.startDate).format('MM')}` == 5 ? 'May': `${moment(education?.startDate).format('MM')}` == 6 ? 'June': `${moment(education?.startDate).format('MM')}` == 7 ? 'July': `${moment(education?.startDate).format('MM')}` == 8 ? 'August': `${moment(education?.startDate).format('MM')}` == 9 ? 'September': `${moment(education?.startDate).format('MM')}` == 10 ? 'October': `${moment(education?.startDate).format('MM')}` == 11 ? 'November' : 'December'}{`,`} {`${moment(education?.startDate).format('YYYY')} - `}
                                    {`${moment(education?.endDate).format('MM')}` == 1 ? ('January') : `${moment(education?.endDate).format('MM')}` == 2 ? 'February': `${moment(education?.endDate).format('MM')}` == 3 ? 'March': `${moment(education?.endDate).format('MM')}` == 4 ? 'April' : `${moment(education?.endDate).format('MM')}` == 5 ? 'May': `${moment(education?.endDate).format('MM')}` == 6 ? 'June': `${moment(education?.endDate).format('MM')}` == 7 ? 'July': `${moment(education?.endDate).format('MM')}` == 8 ? 'August': `${moment(education?.endDate).format('MM')}` == 9 ? 'September': `${moment(education?.endDate).format('MM')}` == 10 ? 'October': `${moment(education?.endDate).format('MM')}` == 11 ? 'November' : 'December'}{','} {`${moment(education?.endDate).format('YYYY')})` }
                                    </p>
                                    <div className={styles.spacer}>
                                    </div>
                                </div>
        
                            </div>
                            })}
                        </div>
                        <div className={styles.experienceInfo}>
                            <h2><img src="exp.jpg" /> Work Experience</h2>
                            <div className={styles.headerLine}></div>
                            {experienceData?.map((experience, index)=>{
                            return <div className={styles.experienceContainer} key={index}>
                                <div className={styles.experienceList}>
                                    <b>{experience?.jobTitle}</b> at <b> {experience?.employerName} </b>
                                    {' ('}{`${moment(experience?.startDate).format('MM')}` == 1 ? ('January') : `${moment(experience?.startDate).format('MM')}` == 2 ? 'February': `${moment(experience?.startDate).format('MM')}` == 3 ? 'March': `${moment(experience?.startDate).format('MM')}` == 4 ? 'April' : `${moment(experience?.startDate).format('MM')}` == 5 ? 'May': `${moment(experience?.startDate).format('MM')}` == 6 ? 'June': `${moment(experience?.startDate).format('MM')}` == 7 ? 'July': `${moment(experience?.startDate).format('MM')}` == 8 ? 'August': `${moment(experience?.startDate).format('MM')}` == 9 ? 'September': `${moment(experience?.startDate).format('MM')}` == 10 ? 'October': `${moment(experience?.startDate).format('MM')}` == 11 ? 'November' : 'December'} {moment(experience?.startDate).format('DD')}{`,`} {`${moment(experience?.startDate).format('YYYY')} - `}
                                    {`${moment(experience?.endDate).format('MM')}` == 1 ? ('January') : `${moment(experience?.endDate).format('MM')}` == 2 ? 'February': `${moment(experience?.endDate).format('MM')}` == 3 ? 'March': `${moment(experience?.endDate).format('MM')}` == 4 ? 'April' : `${moment(experience?.endDate).format('MM')}` == 5 ? 'May': `${moment(experience?.endDate).format('MM')}` == 6 ? 'June': `${moment(experience?.endDate).format('MM')}` == 7 ? 'July': `${moment(experience?.endDate).format('MM')}` == 8 ? 'August': `${moment(experience?.endDate).format('MM')}` == 9 ? 'September': `${moment(experience?.endDate).format('MM')}` == 10 ? 'October': `${moment(experience?.endDate).format('MM')}` == 11 ? 'November' : 'December'} {moment(experience?.endDate).format('DD')}{','} {`${moment(experience?.endDate).format('YYYY')})` }
                                    
                                    <div dangerouslySetInnerHTML={{__html: experience.jobResponsibility}} className={styles.jobResponsibility}>
                                        
                                    </div>
                                        
                        
                                    
                                   

                                    <div className={styles.spacer}>
                                    </div>
                                </div>
        
                            </div>
                            })}
                        </div>
                   
                    </div>
                 </div>
                
                 
                 
              </div>
           </div>
           
        
           
        </section>
    )
}
export default SubmitForm;
