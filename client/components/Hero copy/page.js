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
const Hero = () =>{
    const [search, setSearch] = useState("");
    const [signupOpen, setSignupOpen] = useState(false);
    const [result, setResult] = useState([])
    //declaring language state
    const dispatch = useDispatch();
    const isEnglish = useSelector((state)=> state.language.isEnglish)

    return(
        <section className={styles.hero} id="hero">
           <div className={styles.leftContainer}>
            
             <div className={styles.text}>
            {isEnglish ? 
             <TypeAnimation
                            sequence={[
                                // Same substring at the start will only be typed out once, initially
                                'Wenchijobs.com',
                                3000,
                                'Get our daily latest job posts',
                                2000,
                                'Build and download professional CV for free',
                                2000,
                                'Get our job email Alert',
                                2000,
                                `Filter jobs based on your requirement`,
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
                     3000,
                     `Barreeffamoota hojii keenya guyyaa guyyaan haaraa ta'an argadhaa`,
                     2000,
                     'CV ogeessaa bilisaan qopheessuu fi buufachuu',
                     2000,
                     'Hojiiwwan kenyaa karaa ergaa email argadhaa',
                     2000,
                     `Calallii hojii feedhii irratti hundaa'e rawwachuu`,
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
                  <Link href="#" className={styles.btnWhite} onClick={()=>{setSignupOpen(true)}}>{isEnglish ? 'Signup' : `Galmaa'i`}</Link>
                  <Link href="/auth" className={styles.btnTransparent}>{isEnglish ? 'Login' : 'Seeni'}</Link>                
             </div>
                
           </div>
           
           <div className={styles.rightContainer}>
      
             <div className={styles.socialContainer}>
                <h3>{isEnglish ? 'Follow us' : 'Nu hordofaa'}</h3>
                <div className={styles.socialIcons}>
                 <Link href="#"><i className='bx bxl-facebook-circle'></i></Link>
                 <i className='bx bxl-linkedin-square' ></i>
                 <i className='bx bxl-telegram' ></i>
                </div>
             </div>
           </div> 
    
             {/* open signup modal onclick */}
          {signupOpen && <SignupModal closeModal={setSignupOpen}/>}
        
             
        </section>
    )
}
export default Hero;