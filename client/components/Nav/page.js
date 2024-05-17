"use client"
import React, { useContext } from 'react'
import styles from './navbar.module.css';
import { useState, useEffect, useRef} from 'react'
import SignupModal from '../Signup/page';
import ChangePasswordModal from '../Signup/changePassword';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { changeLanguage } from '@/redux/language';
import axios from 'axios';
import { loginFailure,loginStart, loginSuccess } from '@/redux/login';
function getUser(){
  if(typeof window !== 'undefined'){
    let user = localStorage.getItem('user')
    if(user){
      user = user
    }
    else{
      user = null
    }
    return user
  }

  
}
const Navbar = () =>{
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [signupOpen, setSignupOpen] = useState(false);
    const [changerOpen, setChangerOpen] = useState(false);
    const [linkActive, setLinkActive] = useState(null);
    const [openEmpDropdown, setOpenEmpDropdown] = useState(false)
    const [openJobseekerDropdown, setOpenJobseekerDropdown] = useState(false)
    const [category, setCategory] = useState([])
    const [megaMenuOpen, setMegaMenuOpen] = useState(false)
    const isEnglish = useSelector((state)=> state.language.isEnglish)
    const [openMessage, setOpenMessage] = useState(false)
    const [openNotification, setOpenNotification] = useState(false)
    const [openProfile, setOpenProfile] = useState(false)
    const [myAccountOpen, setMyAccountOpen] = useState(false)
    const messageRef = useRef()
    const menuRef = useRef()
    const linkEmp = useRef()
    const linkJob = useRef()
    const notificationRef = useRef()
    const profileRef = useRef()
    const mobileMenuRef = useRef()
    const myAccountRef = useRef()
    //loading login states 
    const isLogin = useSelector((state)=>state.login.isLogin)
    const loading = useSelector((state)=> state.login.loading)
    const [userFirstName, setUserFirstName] = useState('')
    const [userMiddleName, setUserMiddleName] = useState('')
    const dispatch = useDispatch();
  //function that get user info 
  useEffect(()=>{
    dispatch(loginStart())
    axios.defaults.withCredentials = true
    axios.get(process.env.NEXT_PUBLIC_SERVER_ADDRESS+"/job-seekers-home")
    .then((res)=>{
        console.log(res)
        if(res.data.valid)
        {
                dispatch(loginSuccess())
                setUserFirstName(res.data.userFirstName)
                setUserMiddleName(res.data.userMiddleName)
                
        }
        else{
            dispatch(loginFailure())
        }
    })
}, [])
 //handling closing mobile menu on outside click
 useEffect(()=>{
  let mobileHandler = (e)=>{
    if(mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)){
      setMobileMenuOpen(false)
    }
  }
  

    document.addEventListener("mousedown", mobileHandler)
    return ()=>{
      document.removeEventListener("mousedown", mobileHandler)
    }
  
}, [])
  //handling closing mega menu on outside click
  useEffect(()=>{
    let handler = (e)=>{
      if(menuRef.current && !menuRef.current.contains(e.target)){
        setMegaMenuOpen(false)
      }
    }
    

      document.addEventListener("mousedown", handler)
      return ()=>{
        document.removeEventListener("mousedown", handler)
      }
    
  }, [])
   //myaccount mobile menu closing menu on outside click
   useEffect(()=>{
    let myAccountHandler = (e)=>{
      if(myAccountRef.current && !myAccountRef.current.contains(e.target)){
        setMyAccountOpen(false)
      }
    }
    

      document.addEventListener("mousedown", myAccountHandler)
      return ()=>{
        document.removeEventListener("mousedown", myAccountHandler)
      }
    
  }, [])
  //handling logout
  const handleLogout = ()=>{
    axios.get(process.env.NEXT_PUBLIC_SERVER_ADDRESS+'/logout')
    .then(res=>{
        if(res.data.logout){
            dispatch(loginFailure())
            window.location.href = "/auth"   
        }
        else{
            console.log('error')
        }
    })
}
    //handling employe menu on outside click
    useEffect(()=>{
      let employeHandler = (e)=>{
        if(linkEmp.current && !linkEmp.current.contains(e.target)){
          setOpenEmpDropdown(false)
        }
      }
      
  
        document.addEventListener("mousedown", employeHandler)
        return ()=>{
          document.removeEventListener("mousedown", employeHandler)
        }
      
    }, [])
  //handling job seekers dropdown menu
  useEffect(()=>{
    let jobseekersHandler = (e)=>{
      if(linkJob.current && !linkJob.current.contains(e.target)){
        setOpenJobseekerDropdown(false)
      }
    }
    

      document.addEventListener("mousedown", jobseekersHandler)
      return ()=>{
        document.removeEventListener("mousedown", jobseekersHandler)
      }
    
  }, [])
  //handling profile icons open and close container 
  useEffect(()=>{
    let messageHandler = (e)=>{
      if(messageRef.current && !messageRef.current.contains(e.target)){
        setOpenMessage(false)
      }
    }
    

      document.addEventListener("mousedown", messageHandler)
      return ()=>{
        document.removeEventListener("mousedown", messageHandler)
      }
    
  }, [])
  useEffect(()=>{
    let notificationHandler = (e)=>{
      if(notificationRef.current && !notificationRef.current.contains(e.target)){
        setOpenNotification(false)
      }
    }
    

      document.addEventListener("mousedown", notificationHandler)
      return ()=>{
        document.removeEventListener("mousedown", notificationHandler)
      }
    
  }, [])
  useEffect(()=>{
    let profileHandler = (e)=>{
      if(profileRef.current && !profileRef.current.contains(e.target)){
        setOpenProfile(false)
      }
    }
    

      document.addEventListener("mousedown", profileHandler)
      return ()=>{
        document.removeEventListener("mousedown", profileHandler)
      }
    
  }, [])
  //fetch category from database 
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_SERVER_ADDRESS+'/fetch-job-category')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
       setCategory(data)

      });
  }, []);
    {/* to close the menu when it's clicked outside of the component*/}
    useEffect(()=>{
        let handler =()=>{
            setOpen(false);
        }
        document.addEventListener("mousedown", handler);
    })
   
   
   const menuLinkHandler = (index)=>{
    if(index == linkActive){
      setLinkActive(null)
    }
    setLinkActive(index);
   }
 //
 const handleMouseDown = ()=>{
  setMegaMenuOpen(true)
 }
    return(
        <header className={styles.header}>
            <nav className={styles.navBar}>
                <div className={styles.logo}>
                    <img src="/wenchijobs-nav-logo.png" />
                </div>
                <ul className={styles.menu} >
                    <li className={styles.menuItem}>
                        <Link href="/" className={linkActive == 1 ? `${styles.active}`: ``}  onClick={()=>{menuLinkHandler(1)}}>{isEnglish == "English" ? 'Home' : isEnglish =="Oromic" ? 'Fuula jalqabaa' : "መነሻ ገጽ"}</Link>
                    </li>
                    <li className={megaMenuOpen ? `${styles.menuItem} ${styles.active} ${styles.megaItem}` : `${styles.menuItem} ${styles.megaItem}`}  onClick={()=>{setMegaMenuOpen(!megaMenuOpen)}} ref={menuRef}>
                        <Link className={styles.link} href="#" >{isEnglish == "English" ? 'Job Category' : isEnglish =="Oromic" ? 'Gosa Hojii' : "የሥራ ምድብ"} <i className='bx bx-chevron-down'></i></Link>
                        <div className={styles.megaMenu} >
                            <div className={styles.megaContainer}>
                              {category.map((cat, index)=>{
                              return (<a href={`/browse-by-category/${cat.categoryName}`}>
                                 <div className={styles.title} key={index}>
                                 {isEnglish == "English" ? cat.categoryName : isEnglish =="Oromic" ? cat.categoryOromic : cat.categoryAhmaric}
                              </div>
                               </a>       
                              )})}
                              
                            </div>
                            
                      </div>
                    </li>
                    <li className={openJobseekerDropdown ? `${styles.menuItem} ${styles.active}` : styles.menuItem} ref={linkJob} onClick={()=>{setOpenJobseekerDropdown(!openJobseekerDropdown)}}>
                    <Link className={`${styles.link} ${styles.dropdown}`} href="#">{isEnglish == "English" ? 'Job Seekers' : isEnglish =="Oromic" ? 'Hojii barbaaddota' : "ሥራ ፈላጊዎች"}<i className='bx bx-chevron-down'></i></Link>
                     <ul className={styles.dropdownMenu}>
                        <Link href='/browse-jobs'><li className={styles.menuItem}>{isEnglish == "English" ? 'Find jobs' : isEnglish =="Oromic" ? 'Hojii barbaadii' : "ስራዎችን ያፈልጉ"}</li></Link>
                        <Link href='/CV-Builder'> <li className={styles.menuItem}>{isEnglish == "English" ? 'Build CV' : isEnglish =="Oromic" ? 'CV Qopheessii' : "CV ያዘጋጁ"}</li></Link>
                       {userFirstName === '' &&  <li className={styles.menuItem} onClick={()=>{setSignupOpen(true)}}>{isEnglish == "English" ? 'Signup' : isEnglish =="Oromic" ? `Haaraa Galmaa'ii` : "ይመዝገቡ"}</li>  }
                       {userFirstName === '' && <Link href='/auth'><li className={styles.menuItem}>{isEnglish == "English" ? 'Login' : isEnglish =="Oromic" ? `Seenaa | Login` : "ይግቡ | Login"}</li></Link> }

                     </ul>
                    </li>
                    <li className={openEmpDropdown ? `${styles.menuItem} ${styles.active}` : styles.menuItem} ref={linkEmp} onClick={()=>{setOpenEmpDropdown(!openEmpDropdown)}}>
                    <Link className={`${styles.link} ${styles.dropdown}`} href="/">{isEnglish == "English" ? 'Employers' : isEnglish =="Oromic" ? `Hojjechiistota` : "ቀጣሪዎች"}<i className='bx bx-chevron-down'></i></Link>
                     <ul className={styles.dropdownMenu}>
                        <Link href="/employers"><li className={styles.menuItem}>{isEnglish == "English" ? 'Home' : isEnglish =="Oromic" ? `Fuula jalqabaa` : "መነሻ ገጽ"}</li></Link>
                        <Link href="/employers/post-jobs"><li className={styles.menuItem}>{isEnglish == "English" ? 'Post Jobs' : isEnglish =="Oromic" ? `Hojii Maxxanssii` : "ስራ ለጥፍ"}</li></Link>
                        <Link href="/employers/registration"><li className={styles.menuItem}>{isEnglish == "English" ? 'Signup' : isEnglish =="Oromic" ? `Haaraa Galmaa'ii` : "ይመዝገቡ"}</li></Link>
                        <Link href="/employers/auth"><li className={styles.menuItem}>{isEnglish == "English" ? 'Login' : isEnglish =="Oromic" ? `Seenaa | Login` : "ይግቡ | Login"}</li></Link>

                     </ul>
                    </li>
                    <Link className={linkActive == 5 ? `${styles.active} ${styles.link}`: `${styles.link}`} href="/about" onClick={()=>{menuLinkHandler(5)}}> 
                        <li className={styles.menuItem}>
                            
                        {isEnglish == "English" ? 'About us' : isEnglish =="Oromic" ? `Waa'ee kenya` : "ስለ እኛ"}
                          
                        </li>
                    </Link>
                 
                </ul>
                {/* open signup modal on click*/}
                {signupOpen && <SignupModal closeModal={setSignupOpen}/>}
                {changerOpen && <ChangePasswordModal closeModal={setChangerOpen}/>}
                {/*Mobile Menu startls here */}
                <ul className={mobileMenuOpen ? `${styles.mobileMenu} ${styles.active}` : styles.mobileMenu} ref={mobileMenuRef}>
                    <li className={styles.menuItem} onClick={()=>{setMobileMenuOpen(false)}}>
                        <Link className={styles.link} href="/">Home</Link>
                    </li>
                    <li className={styles.menuItem} onClick={()=>{setMobileMenuOpen(false)}}>
                        <Link className={styles.link} href="/browse-jobs">Find Job</Link>
                    </li>
              
                    <li className={styles.menuItem} onClick={()=>{setMobileMenuOpen(false)}}>
                        <Link className={styles.link} href="/CV-Builder">Build CV</Link>
                    </li>
                    <li className={styles.menuItem}>
                        <Link className={styles.link} href="/about">About us</Link>
                    </li>
                    <li className={styles.menuItem}>
                    <Link className={`${styles.link} ${styles.dropdown}`} href="/">Employers  <i className='bx bx-chevron-down'></i></Link>
                     <ul className={styles.dropdownMenu}>
                        <li className={styles.menuItem} onClick={()=>{setMobileMenuOpen(false)}}><Link href="/employers/auth">Login</Link></li>
                        <li className={styles.menuItem} onClick={()=>{setMobileMenuOpen(false)}}><Link href="/employers/registration">Register</Link></li>
                        <li className={styles.menuItem} onClick={()=>{setMobileMenuOpen(false)}}><Link href="/employers/post-jobs">Post jobs</Link></li>
                     </ul>
                    </li>
      
                    <div className= {styles.myAccount} ref={myAccountRef}>
                      <span onClick={()=>{setMyAccountOpen(!myAccountOpen)}}><i className='bx bx-user-circle'></i> My Account <i className='bx bx-chevron-down'></i></span>
                      <ul className={myAccountOpen ? `${styles.dropdownMenu} ${styles.active}` : `${styles.dropdownMenu}` }>
                        <li className={styles.linkItem} onClick={()=>{setMyAccountOpen(false), setMobileMenuOpen(false), setSignupOpen(true)}}>Signup</li>
                        <li className={styles.linkItem} onClick={()=>{setMyAccountOpen(false), setMobileMenuOpen(false)}}><Link href={"/auth"}>Signin</Link></li>
                        <li className={styles.linkItem} onClick={()=>{setMyAccountOpen(false)}}><Link href={'/forget-password'}>Forget password?</Link></li>
                     </ul>
                    </div>
                    <div className={styles.closeMenu} onClick={()=>{setMobileMenuOpen(false)}}>
                      <i className='bx bx-x'></i>
                    </div>
                    <div className={styles.brand}>
                        
                        &copy; All rights reserved. Wenchijobs.com
                    </div>
                </ul>
                
          <ul className={styles.menuRight}>

            <li  className={styles.menuItem}>
              {/* <Link href="#" className= {`${styles.link}  ${styles.btnTransparent}`} onClick={()=>{dispatch(changeLanguage(!isEnglish))}}><span>{isEnglish ? <img src="/English.jpg"></img> : <img src='/Oromiya.jpg'></img>}</span>{isEnglish ? <p className={styles.languageText}>English</p> : <p className={styles.languageText}>Oromiffa</p>} */}
          
              <Link  href="#" className={`${styles.link} ${styles.dropdown} ${styles.btnTransparent}`}><span>{isEnglish == "English" ? <img src="/English.jpg"></img> :  isEnglish =="Oromic" ? <img src='/Oromiya.jpg'></img> : <img src='/eflag.png'></img>}</span>{isEnglish == "English" ? "English" : isEnglish == "Oromic" ? "Oromiffa" : "አማርኛ"} <i className='bx bx-chevron-down'></i></Link>
                <ul className={styles.dropdownMenu}>
                  <li className={styles.menuItem} onClick={()=>{dispatch(changeLanguage("English"))}}>English</li>
                  <li className={styles.menuItem} onClick={()=>{dispatch(changeLanguage("Oromic"))}}>Oromiffa</li>
                  <li className={styles.menuItem} onClick={()=>{dispatch(changeLanguage("አማርኛ"))}}>አማርኛ</li>
                  
                </ul>
              
             
             
            </li>
            {isLogin && !loading && (
            <li className={styles.profileContainer}>
               <div className={openMessage ? `${styles.message} ${styles.active}`: styles.message} ref={messageRef} onClick={()=>{setOpenMessage(!openMessage)}}>
                <i class='bx bxs-message-rounded-dots'></i>
                <div className={styles.messageContainer} >
                  <h3>Messages</h3>
                  <div className={styles.messageContent}>
                    <p>No messages yet.</p>

                  </div>
                </div>
               </div>
               <div className={openNotification ? `${styles.notification} ${styles.active}`: styles.notification} ref={notificationRef} onClick={()=>{setOpenNotification(!openNotification)}}>
                 <i class='bx bxs-bell-ring' ></i>
                 <div className={styles.notificationContainer} >
                  <h3>Notification</h3>
                  <div className={styles.notificationContent}>
                    <p>No notification found yet.</p>

                  </div>
                </div>
               </div>
               <div className={openProfile ? `${styles.account} ${styles.active}`: styles.account} ref={profileRef} onClick={()=>{setOpenProfile(!openProfile)}}>
                  <i class='bx bxs-user'></i>
                 <div className={styles.accountContainer} >
                  <div className={styles.listsContainer}>
                    <div className={styles.userInfoContainer}>
                      <div className={styles.accountUser}>
                       <Link href={'/job-seekers'}><i class='bx bxs-user'></i></Link>
                      </div>
                      <p><Link href={'/job-seekers'}>{userFirstName} {userMiddleName}</Link></p>
                    </div>
                    <ul>
                    <Link href={'/CV-Builder'}>
                      <li>
                       
                        <span>
                           <svg width="20px" height="20px" viewBox="0 0 24 24" id="files_text_content" data-name="files text content" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect id="Rectangle" width="24" height="24" fill="none"></rect> <path id="Rectangle_2" data-name="Rectangle 2" d="M0,0H8l6,6V18H0Z" transform="translate(5 3)" fill="none" stroke="#000000" stroke-miterlimit="10" stroke-width="1.5"></path> <path id="Line" d="M.5,1.5h7" transform="translate(8 12)" fill="none" stroke="#000000" stroke-linecap="square" stroke-miterlimit="10" stroke-width="1.5"></path> <path id="Line-2" data-name="Line" d="M.5,1.5h7" transform="translate(8 15)" fill="none" stroke="#000000" stroke-linecap="square" stroke-miterlimit="10" stroke-width="1.5"></path> <path id="Rectangle_3" data-name="Rectangle 3" d="M6,6H0V0" transform="translate(13 3)" fill="none" stroke="#000000" stroke-miterlimit="10" stroke-width="1.5"></path> </g></svg>
                        </span> 
                        <p>{isEnglish == "English" ? 'My CV' : isEnglish =="Oromic" ? `CV koo` : "የኔ CV"}</p>
                        
                      </li>
                      </Link>
                      
                      <li onClick = {()=>{setChangerOpen(true)}}><span><i class='bx bx-edit'></i></span> <p>{isEnglish == "English" ? 'Change Password' : isEnglish =="Oromic" ? `Paswordii jijjirii` : "ፓስዎርድ ቀይር"}</p></li>
                      <li onClick={()=>{handleLogout()}}>
                       
                        <span>
                          <svg viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11.75 9.874C11.75 10.2882 12.0858 10.624 12.5 10.624C12.9142 10.624 13.25 10.2882 13.25 9.874H11.75ZM13.25 4C13.25 3.58579 12.9142 3.25 12.5 3.25C12.0858 3.25 11.75 3.58579 11.75 4H13.25ZM9.81082 6.66156C10.1878 6.48991 10.3542 6.04515 10.1826 5.66818C10.0109 5.29121 9.56615 5.12478 9.18918 5.29644L9.81082 6.66156ZM5.5 12.16L4.7499 12.1561L4.75005 12.1687L5.5 12.16ZM12.5 19L12.5086 18.25C12.5029 18.25 12.4971 18.25 12.4914 18.25L12.5 19ZM19.5 12.16L20.2501 12.1687L20.25 12.1561L19.5 12.16ZM15.8108 5.29644C15.4338 5.12478 14.9891 5.29121 14.8174 5.66818C14.6458 6.04515 14.8122 6.48991 15.1892 6.66156L15.8108 5.29644ZM13.25 9.874V4H11.75V9.874H13.25ZM9.18918 5.29644C6.49843 6.52171 4.7655 9.19951 4.75001 12.1561L6.24999 12.1639C6.26242 9.79237 7.65246 7.6444 9.81082 6.66156L9.18918 5.29644ZM4.75005 12.1687C4.79935 16.4046 8.27278 19.7986 12.5086 19.75L12.4914 18.25C9.08384 18.2892 6.28961 15.5588 6.24995 12.1513L4.75005 12.1687ZM12.4914 19.75C16.7272 19.7986 20.2007 16.4046 20.2499 12.1687L18.7501 12.1513C18.7104 15.5588 15.9162 18.2892 12.5086 18.25L12.4914 19.75ZM20.25 12.1561C20.2345 9.19951 18.5016 6.52171 15.8108 5.29644L15.1892 6.66156C17.3475 7.6444 18.7376 9.79237 18.75 12.1639L20.25 12.1561Z" fill="#000000"></path> </g></svg>
                        </span> 
                        <p>{isEnglish == "English" ? 'Logout' : isEnglish =="Oromic" ? `cufii ba'ii` : "ዘግተህ ውጣ"}</p>
                      </li>
                    </ul>
                  </div>
                  
           
                </div>
               </div>
              
            </li>
            )} {/** end of login checker for user menu  */}
          {!loading && !isLogin && (
            <li  className={styles.menuItem}>
                <Link  href="#" className={`${styles.link} ${styles.dropdown} ${styles.btnOrange}`}> {isEnglish == "English" ? 'My Account' : isEnglish =="Oromic" ? `Galmee koo` : "የኔ አካዉንት"}<i className='bx bx-chevron-down'></i></Link>
                <ul className={styles.dropdownMenu}>
                  <li className={styles.menuItem} onClick={()=>{setSignupOpen(true)}}>{isEnglish == "English" ? 'Signup' : isEnglish =="Oromic" ? `Haaraa Galmaa'ii` : "ይመዝገቡ"}</li>
                  <li className={styles.menuItem}><Link href={'/auth'}>{isEnglish == "English" ? 'Login' : isEnglish =="Oromic" ? `Seenaa | Login` : "ይግቡ"}</Link></li>
                  <li className={styles.menuItem}><Link href={'/forget-password'}>{isEnglish == "English" ? 'Forget Password?' : isEnglish =="Oromic" ? `Paaswordii dagattanii` : "ፓስዎርዶን ረስተዋል?"}</Link></li>
                </ul>
              
              </li>
          )}
          
          </ul>
       
         
          <div className={styles.hamburger} onClick={()=>{setMobileMenuOpen(true)}}>
             <i className='bx bx-menu' ></i>
          </div>
       </nav>
    </header>
    )
}
export default Navbar;