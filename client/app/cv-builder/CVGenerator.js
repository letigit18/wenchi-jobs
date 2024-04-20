import React, {useRef} from 'react'
import styles from './cv-builder.module.css'
const CVGenerator = () =>{
    const pdfRef = useRef()
//function that generatos CV in PDF   
const downloadPDF = ()=>{
    const input = pdfRef.current;
    var opt = {
        margin:0,
        scale: 3,
        quality: 1,
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
        const imgY = 2;
        pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
        pdf.save('CV.pdf');
    });
    }
    return(
        <div className={styles.container} ref={pdfRef}>
           <h3>Wenchijob.com</h3>
           <h2> this is the PDF generate by wenchi jobs.com</h2>
        </div>
    )
}
export default CVGenerator;