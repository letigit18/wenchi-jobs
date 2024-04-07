import React from 'react'
import styles from './footer.module.css'
import Link from 'next/link'
const Footer = () =>{
    const date = new Date();
    return(
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.containerMenu}>
                    <div className={styles.leftContainer}>
                           <div className={styles.header}>
                                About us
                            </div>
                            <p><b>Wenchijobs.com</b> is the leading platform that connects Employers and Job seekers with exceptional features. </p>
                        </div>
                    <div className={`${styles.linkContainer} ${styles.rightMenu}` }>
                    
                        <div className={styles.header}>
                            Employer Links
                        </div>
                        <ul>
                            <li>Home</li>
                            <li>Register</li>
                            <li>Post Jobs</li>
                            <li>Login</li>
                        </ul>
                    </div>
                    <div className={styles.linkContainer}>
                        <div className={styles.header}>
                            Job Seeker Links
                        </div>
                        <ul>
                            <li>Home</li>
                            <li>Job Category</li>
                            <li>Find Jobs</li>
                            <li>Build CV</li>
                        </ul>
                    </div>
                    <div className={styles.socialContainer}>
                        <div className={styles.header}>
                            Follow us:
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
                    <p className={styles.links}> <Link href="/privacy">Privacy</Link>&nbsp; | &nbsp; <Link href="/terms">Terms and Conditions</Link></p>
                    <p>&copy; {date.getFullYear()} Powered by Wenchijobs.com. All Rights Reserved.</p>
            </div> 
         
        </footer>
    )
}
export default Footer;