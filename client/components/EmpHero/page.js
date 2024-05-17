"use client"
import {useEffect} from 'react';
import { TypeAnimation, TypeAnimationOr } from 'react-type-animation';
import styles from './hero.module.css';
import Link from 'next/link';
import { useState } from 'react';
import SignupModal from '../Signup/page'
import { useSelector, useDispatch } from 'react-redux';
import SearchBar from './SearchBar/SearchBar';
import SearchResult from './SearchBar/SearchResult';
const EmpHero = () =>{
    const [search, setSearch] = useState("");
    const isEnglish = useSelector((state)=> state.language.isEnglish)
    const [signupOpen, setSignupOpen] = useState(false);
    const [result, setResult] = useState([])
    //declaring language state
    const dispatch = useDispatch()


    return(
        <section className={styles.hero} id="hero">
           <div className={styles.leftContainer}>
            
             <div className={styles.text}>
             {isEnglish ? 
             <TypeAnimation
                            sequence={[
                                // Same substring at the start will only be typed out once, initially
                                'Wenchijobs.com',
                                4000,
                                'Advertise your job your for free',
                                2000,
                                'Find potential job seekers that matches your required skill.',
                                2000,
                                'Create your company profile',
                                2000,
                                `Automatic candidate shortlisting and custom reporting`,
                                2000,
                                `Hojii barbaaddota iyyannoo hojiif affeeruu`,
                                2000,
                               
                            ]}
                            wrapper="span"
                            speed={50}
                            style={{ fontSize: '1.2rem', display: 'inline-block' }}
                            repeat={Infinity}
                 />
                 :  <TypeAnimation
                 sequence={[
                     // Same substring at the start will only be typed out once, initially
                     'Wenchijobs.com',
                     4000,
                     `Hojiiwwan kessan bilisaan beeksiisaa`,
                     2000,
                     'Hojjettoota dandeetii barbaaddaniin argadhaa',
                     2000,
                     'Calallii kaadhimamaa rawwachuu fi gabaasa qopheessuu',
                     2000,
                     `Profaayila dhaabbata keessanii maxxanssaa`,
                     2000,
                    
                 ]}
                 wrapper="span"
                 speed={50}
                 style={{ fontSize: '1.2rem', display: 'inline-block' }}
                 repeat={Infinity}
      /> }
             
             </div>
           </div>
           
           <div className={styles.container}>
           {/*** search box on the hero section */}
              <div className={styles.box}>
                <div className={styles.searchBox}>
                  <SearchBar setResult={setResult} />
                  <SearchResult result={result} />
                </div>   
              </div>

             <div className={styles.buttons}>
                  <Link href="/employers/registration" className={styles.btnWhite} >{isEnglish == "English" ? 'Post Jobs' : isEnglish =="Oromic" ? 'Hojii Maxxansi' : "ስራ ይለጥፉ"}</Link>
                  <Link href="/employers/auth" className={styles.btnTransparent}>{isEnglish == "English" ? 'Login' : isEnglish =="Oromic" ? 'Seenii' : "ይግቡ"}</Link>                
             </div>
                
           </div>
           
           <div className={styles.rightContainer}>
      
             <div className={styles.socialContainer}>
                <h3>{isEnglish == "English" ? 'Follow us' : isEnglish =="Oromic" ? 'Nu Hordofaa' : "ይከተሉን"}</h3>
                <div className={styles.socialIcons}>
                 <Link href="#"><i className='bx bxl-facebook-circle'></i></Link>
                 <Link href={''}><i className='bx bxl-linkedin-square' ></i></Link>
                 <Link href={''}><i className='bx bxl-telegram' ></i></Link>
                </div>
             </div>
           </div> 
    
             {/* open signup modal onclick */}
          {signupOpen && <SignupModal closeModal={setSignupOpen}/>}
        
             
        </section>
    )
}
export default EmpHero;