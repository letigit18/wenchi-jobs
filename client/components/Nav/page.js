"use client"
import React, { useContext } from 'react'
import styles from './navbar.module.css';
import { useState, useEffect } from 'react'
import SignupModal from '../Signup/page';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { changeLanguage } from '@/redux/language';
const Navbar = () =>{
    const [active, setActive] = useState(true);
    const [open, setOpen] = useState(false);
    const [signupOpen, setSignupOpen] = useState(false);
    const [linkActive, setLinkActive] = useState(null);
    const dispatch = useDispatch();
    const isEnglish = useSelector((state)=> state.language.isEnglish)
    {/* to close the menu when it's clicked outside of the component*/}
    useEffect(()=>{
        let handler =()=>{
            setOpen(false);
        }
        document.addEventListener("mousedown", handler);
    })
    const handleToggle=()=>{
        setActive(!active)
    }
    const handleMyAccount=()=>{
        setOpen(!open)
    }
   const menuLinkHandler = (index)=>{
    if(index == linkActive){
      setLinkActive(null)
    }
    setLinkActive(index);
   }
   
    return(
        <header className={styles.header}>
            <nav className={styles.navBar}>
                <div className={styles.logo}>
                    Wenchi jobss
                </div>
                <ul className={styles.menu}>
                    <li className={styles.menuItem}>
                        <Link href="/" className={linkActive == 1 ? `${styles.active}`: ``}  onClick={()=>{menuLinkHandler(1)}}>{isEnglish ? 'Home' : 'Fuula jalqabaa'}</Link>
                    </li>
                    <li className={`${styles.menuItem} ${styles.megaItem}`}>
                        <Link className={styles.link} href="#" >{isEnglish ? 'Job category' : 'Gosa Hojii'} <i className='bx bx-chevron-down'></i></Link>
                        <div className={styles.megaMenu}>
                            <div className={styles.megaContainer}>
                              <div className={styles.title}>
                                IT
                                <span>2</span>
                              </div>
                              <div className={styles.title}>
                                IT
                                <span>2</span>
                              </div>
                              <div className={styles.title}>
                                IT
                                <span>2</span>
                              </div>
                              <div className={styles.title}>
                                IT
                                <span>2</span>
                              </div>
                            </div>
                            
                        </div>
                    </li>
                    <li className={styles.menuItem}>
                    <Link className={`${styles.link} ${styles.dropdown}`} href="#">{isEnglish ? 'Job seekers' : 'Hojii barbaadaa'}<i className='bx bx-chevron-down'></i></Link>
                     <ul className={styles.dropdownMenu}>
                        <li className={styles.menuItem}><Link href='/browse-jobs'>{isEnglish ? 'Find jobs' : 'Hojii barbaadi'}</Link></li>
                        <li className={styles.menuItem}>{isEnglish ? 'Build CV' : 'CV Qopheessi'}</li>
                        <li className={styles.menuItem}>{isEnglish ? 'Register' : 'Haaraa galmeessii'}</li>
                        <li className={styles.menuItem}>{isEnglish ? 'Login' : 'Seenii | Login'}</li>

                     </ul>
                    </li>
                    <li className={styles.menuItem}>
                    <Link className={`${styles.link} ${styles.dropdown}`} href="/">{isEnglish ? 'Employers' : 'Hojjechiistota'}<i className='bx bx-chevron-down'></i></Link>
                     <ul className={styles.dropdownMenu}>
                        <li className={styles.menuItem}>{isEnglish ? 'Home' : 'Fula jalqabaa'}</li>
                        <li className={styles.menuItem}>{isEnglish ? 'Post jobs' : 'Hoji maxxansii'}</li>
                        <li className={styles.menuItem}>{isEnglish ? 'Register' : 'Haaraa Galmeessii'}</li>
                        <li className={styles.menuItem}>{isEnglish ? 'Login' : 'Seenii'}</li>

                     </ul>
                    </li>
                    <li className={styles.menuItem}>
                        <Link className={linkActive == 5 ? `${styles.active} ${styles.link}`: `${styles.link}`} href="/about" onClick={()=>{menuLinkHandler(5)}}> 
                          {isEnglish ? 'About us' : `Waa'ee Kenya`}
                        </Link>
                    </li>
                 
                </ul>
                {/* open signup modal on click*/}
                {signupOpen && <SignupModal closeModal={setSignupOpen}/>}
                {/*Mobile Menu starts here */}
                <ul className={active ? `${styles.mobileMenu} ${styles.hidden}` : `${styles.mobileMenu} ${styles.active}` }>
                    <li className={styles.menuItem}>
                        <Link className={styles.link} href="/">Home</Link>
                    </li>
                    <li className={styles.menuItem}>
                        <Link className={styles.link} href="/">Find Job</Link>
                    </li>
                    <li className={styles.menuItem}>
                        <Link className={styles.link} href="/">Job category</Link>
                    </li>
                    <li className={styles.menuItem}>
                        <Link className={styles.link} href="/">Build CV</Link>
                    </li>
                    <li className={styles.menuItem}>
                    <Link className={`${styles.link} ${styles.dropdown}`} href="/">Employers  <i className='bx bx-chevron-down'></i></Link>
                     <ul className={styles.dropdownMenu}>
                        <li className={styles.menuItem}>Register</li>
                        <li className={styles.menuItem}>Post jobs</li>
                     </ul>
                    </li>
                    <div className= {styles.myAccount}>
                      <span onClick={handleMyAccount}><i className='bx bx-user-circle'></i> My Account <i className='bx bx-chevron-down'></i></span>
                      <ul className={open ? `${styles.dropdownMenu} ${styles.active}` : `${styles.dropdownMenu}` }>
                        <li className={styles.linkItem}><Link href='http://www.google.com'>Signup</Link></li>
                        <li className={styles.linkItem}>Signin</li>
                        <li className={styles.linkItem}>Forget password?</li>
                     </ul>
                    </div>
                    <div className={styles.closeMenu} onClick={handleToggle}>
                      <i className='bx bx-x'></i>
                    </div>
                    <div className={styles.brand}>
                        &copy; All rights reserved. Wenchijobs.com
                    </div>
                </ul>
                
          <ul className={styles.menuRight}>
            <li  className={styles.menuItem}>
              <Link href="#" className= {`${styles.link}  ${styles.btnTransparent}`} onClick={()=>{dispatch(changeLanguage(!isEnglish))}}><span>{isEnglish ? <img src="English.jpg"></img> : <img src='Oromiya.jpg'></img>}</span>{isEnglish ? 'English' : 'Oromiffa'}
              <div className={styles.toolTip}> 
                {isEnglish ? 'Change language' : 'Afaan jijjirii'}
              </div>
              </Link>
             
            </li>
           
            <li  className={styles.menuItem}>
              <Link  href="#" className={`${styles.link} ${styles.dropdown} ${styles.btnOrange}`}>My Account <i className='bx bx-chevron-down'></i>
              <ul className={styles.dropdownMenu}>
                <li className={styles.menuItem} onClick={()=>{setSignupOpen(true)}}>Create Account</li>
                <li className={styles.menuItem}>Signin</li>
                <li className={styles.menuItem}>Forget password?</li>
              </ul>
              </Link>
            </li>
          </ul>
          <div className={styles.hamburger} onClick={handleToggle}>
             <i className='bx bx-menu' ></i>
          </div>
       </nav>
    </header>
    )
}
export default Navbar;