"use client"
import styles from './page.module.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { updateImageData, getImageData} from '@/redux/employers';
function getCompanyId(){
  if (typeof window !== 'undefined') {
      // Perform localStorage action
      let companyId = window.localStorage.getItem('companyId')
      if(companyId){
          return companyId
      }
      else{
          return;
      }
     
    }
   
}
const EmployersHome = ()=>{
   const imageState = useSelector((state)=> state.employers.imageData)
   const dispatch = useDispatch()
   const employerId = getCompanyId()
    const [companyId, setCompanyId] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [companyType, setCompanyType] = useState('');
    const [companyInfo, setCompanyInfo] = useState('');
    const [file, setFile] = useState('')
    const [imageData, setImageData] = useState([])
    const [fileError, setFileError] = useState('')
    //check the logged in user
    useEffect(()=>{
   
      axios.defaults.withCredentials = true
      axios.get(process.env.NEXT_PUBLIC_SERVER_ADDRESS+"/company-home")
      .then((res)=>{
       
          if(res.data.valid)
          { 
                  setCompanyId(res.data.companyId) 
                  setCompanyInfo(res.data.companyInfo) 
                  setCompanyName(res.data.companyName) 
                  setCompanyType(res.data.companyType)       
          }
          else{
        
              window.location.href = "/employers/auth"
          }
      })
  }, [])
    //image validator function
    const validateImage = (image)=>{
      setFile(image)
      setFileError('')
      if(typeof(image.name) != "undefined")
      {
      //checking the file extenstions
      if(!image.name.match(/\.(jpg|JPG|JPEG|jpeg|PNG|png)$/)){
          setFileError("Error, supported file types are jpg, jpeg and png");
          return;
      }
      //checking the file size 
      if(image.size > 3000000){
          setFileError("Image file is too large, the file exceeds 3 MB");
          return;
      }
      setFileError('')
     }
     else{
      setFileError("please select file")
      return
     }

  }
   //loading image from the server 
   useEffect(()=>{
   //function that fetches image data from the server
   async function fetchImageData(){
     await axios.get(process.env.NEXT_PUBLIC_SERVER_ADDRESS+'/display-company-logo/'+employerId)
     .then((res) => {
         setImageData(res.data[0])
         console.log(res.data[0])
         dispatch(getImageData(res.data[0]))
     })
     .catch(err => console.log(err))
    }
   fetchImageData()
   }, [])
    //uploading image to the server 
     const handleImageUpload = ()=>{
      const formData = new FormData()
      if(file === ''){
          setFileError("Select the file")
      }
      else{
      formData.append('image', file);
      formData.append('userId', userId)
      axios.post(process.env.NEXT_PUBLIC_SERVER_ADDRESS+'/upload-company-logo', formData)
      .then(res => {
          if(res.data.companyLogo){
              dispatch(updateImageData({companyId: res.data.companyId, companyLogo: res.data.companyLogo}))
              setFile('')
          }
      })
      .catch(err => console.log(err))
     }
      
  }
    return(
        <section className={styles.container}>
          <div className={styles.card}>
            <div className={styles.companyInfo}>
                <h1>Welcome to Wenchijobs.com Employers page</h1>
                <div className={styles.profileContainer}>
                    <div className={styles.companyDetail}>
                      <div className={styles.textContainer}>
                        <p>Company Name: </p><span>{companyName}</span>
                        <p>Organization Type:</p><span>{companyType}</span>
                        <b>About</b>
                        <p>{companyInfo}</p>
                      </div>
                      
                      <div className={styles.imageContainer}>
               
                            <img src={`${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/logoImages/`+imageState?.companyLogo} alt='wenchijobs-default-profile-picture' />
                            
                            <div className={styles.buttonContainer}>
                                <input type='file' onChange={(e)=>{
                                    if(e.target.files.length === 0){
                                        setFile('')
                                    }else{
                                    validateImage(e.target.files[0])
                                    }
                                }} accept= "image/png, image/jpg, image/jpeg" className= {fileError ? styles.inputError : ""} />
                                <input type='button' onClick= {handleImageUpload} value="Upload" className={styles.btnUpload} disabled={file === '' ? true : fileError.length > 0 ? true : false} />
                            </div>
                            
                            <p className={styles.errorLabel}>{fileError}</p>
                      </div>
                      
                   </div>
                    
                    <div className={styles.aboutContainer}>

                    </div>
                </div>
            </div>
            <div className={styles.dashboard}>
                <div className={styles.box}>
                  <div className={styles.header}>
                    <h1>
                        Posted jobs
                    </h1>
                  </div>
                  
                   <p>0 Jobs</p>
                </div>

            </div>
          </div>
        </section>
    )
}
export default EmployersHome;