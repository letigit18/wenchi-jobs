import React from 'react'
import styles from './footer.module.css'
import Link from 'next/link'
import { useSelector } from 'react-redux';
const Footer = () =>{
    const date = new Date();
    const isEnglish = useSelector((state)=> state.language.isEnglish)
    return(
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.containerMenu}>
                    <div className={styles.leftContainer}>
                           <div className={styles.header}>
                               {isEnglish == "English" ? "About Us" : isEnglish =="Oromic" ? `Waa'ee kenya` : "ስለ እኛ"}
                            </div>
                          {isEnglish == "English" &&(
                            <p><b>Wenchijobs.com</b> is the leading platform that connects Employers and Job seekers that are found in Ethiopia with exceptional features. </p>
                          )}
                          {isEnglish == "Oromic" &&(
                            <p><b>Wenchijobs.com</b>  Waltajjii hojii barbaaddotaa fi hojjechiistota Itoophiyaa keessatti argamanii wal qunnamsiisuu dha. </p>
                          )}
                          {isEnglish != "English" && isEnglish != "Oromic" &&(
                            <p><b>Wenchijobs.com</b> በኢትዮጵያ የሚገኙ ሥራ ፈላጊዎችን እና አሰሪዎችን በልዪ አገልግሎቶች የሚያገናኝ ፕላትፎርም ነው። </p>
                          )}
                    </div>
                    <div className={`${styles.linkContainer} ${styles.rightMenu}` }>
                    
                        <div className={styles.header}>
                            {isEnglish == "English" ? "Empoyer Links" : isEnglish =="Oromic" ? `Linkii Hojjechiistotaa` : "የቀጣሪዎች ሊንክ"}
                        </div>
                        <ul>
                           <li><Link href={'/employers'}>{isEnglish == "English" ? "Home" : isEnglish =="Oromic" ? `Fuula Duraa` : "የፊት ገጽ"} </Link></li>
        
                            <li><Link href={'/emp-auth'}> {isEnglish == "English" ? "Login" : isEnglish =="Oromic" ? `Seenii` : "ይግቡ"}</Link></li>
                            <li><Link href={'/post-jobs'}> {isEnglish == "English" ? "Post Job" : isEnglish =="Oromic" ? `Hojii Maxxansi` : "ስራ ለጥፍ"}</Link></li>
                            
                        </ul>
                    </div>
                    <div className={styles.linkContainer}>
                        <div className={styles.header}>
                        {isEnglish == "English" ? "Job Seeker Links:" : isEnglish =="Oromic" ? `Liinkii Hojii Barbaaddotaa:` : "የስራ ፈላጊዎች ሊንክ"}
                        </div>
                        <ul>
                            <li><Link href={'/'}> {isEnglish == "English" ? "Home" : isEnglish =="Oromic" ? `Fuula Duraa` : "የፊት ገጽ"}</Link></li>
                            <li><Link href={'/browse-jobs'}> {isEnglish == "English" ? "Find Jobs" : isEnglish =="Oromic" ? `Hojii Barbaadii` : "ስራ ፈልግ"}</Link></li>
                            <li><Link href={'/CV-builder'}> {isEnglish == "English" ? "Build CV" : isEnglish =="Oromic" ? `CV Qopheessi` : "CV አዘጋጅ"}</Link></li>
                        </ul>
                    </div>
                    <div className={styles.socialContainer}>
                        <div className={styles.header}>
                        {isEnglish == "English" ? "Follow us:" : isEnglish =="Oromic" ? `Nu Hordofaa:` : "ይከታተሉን"}
                        </div>
                        <div className={styles.socialLinks}>
                            <Link href="#"><i className='bx bxl-facebook-circle'></i></Link>
                            <i className='bx bxl-linkedin-square' ></i>
                            <i className='bx bxl-telegram' ></i>
                        </div>
                    </div>
                </div>
                
                
            </div>
            <div className={styles.copyrightInfo}>
                <hr className={styles.line} />
                    <p className={styles.links}> <Link href="/privacy">{isEnglish == "English" ? "Privacy" : isEnglish =="Oromic" ? `Praayveesi` : "ፕራይቬሲ"}</Link>&nbsp; | &nbsp; <Link href="/terms">{isEnglish == "English" ? "Terms & Conditions" : isEnglish =="Oromic" ? `Haalaawwanii fi Tumaalee` : "አተገባበሩና ​​መመሪያው"}</Link></p>
                    <p>&copy; {date.getFullYear()}      {isEnglish == "English" ? "Powered by Wenchijobs.com. All Rights Reserved." : isEnglish =="Oromic" ? `Wenchijobs.com 'n kan dhiyaatee. Mirgi Qopheessaa Seeraan Kan Eegame.` : "በ Wenchijobs.com የበለጸገ። መብቱ በህግ የተጠበቀ ነው።"}</p>
            </div> 
         
        </footer>
    )
}
export default Footer;