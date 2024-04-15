
import {useState, useRef} from 'react'
import NavButtons from '../../NavButtons';
import styles from './confirm.module.css'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import {useForm} from 'react-hook-form'
import { UseSelector, useSelector } from 'react-redux';
const SubmitForm = () =>{
    const [confirmation, setConfirmation] = useState(false)
    //redux state for CV builder
    const personalData = useSelector((state)=>state.CVBuilder.personalData)
    const educationData = useSelector((state)=>state.CVBuilder.educationalFormData)
    const experienceData = useSelector((state)=>state.CVBuilder.experienceData)
    const languageData = useSelector((state)=> state.CVBuilder.languageData)
    const skillData = useSelector((state)=>state.CVBuilder.skillData)
    const imageData = useSelector((state)=>state.CVBuilder.imageData)
    const pdfRef = useRef()
    const {handleSubmit} = useForm()
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
                <input type="checkbox" value={confirmation} name="confirmation" onChange={(e)=> setConfirmation(!confirmation)} id="confirmation" />
                <label htmlFor='confirmation'>I confirm that all the provided information is correct.</label>
                 
            </div>
             
            </div> 
            <NavButtons />
           </form>
           <div className={confirmation ? `${styles.cvPreview} ${styles.active}` : styles.cvPreview}>
              <div className={styles.CVContainer} ref={pdfRef}>
                 <div className={styles.header}>
                   <img src={`http://localhost:5000/uploads/`+imageData?.userImage}  />
                   <div className={styles.personalInfo}>
                      <p className={styles.nameInfo}>{`${personalData?.userFirstName} ${personalData?.userMiddleName}`}</p>
                   </div>
                 </div>
                
              </div>
           </div>
           
        
           
        </section>
    )
}
export default SubmitForm;
