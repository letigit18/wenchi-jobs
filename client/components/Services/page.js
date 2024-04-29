"use client"
import React from 'react';
import styles from './services.module.css'
import {useSelector} from 'react-redux'
const Services = () =>{
    const isEnglish = useSelector((state)=> state.language.isEnglish)
    return(
        <section className={styles.container}>
                 <div className={styles.header}><span>{isEnglish ? 'Our Services' : 'Tajaajiloota kenya'}</span></div>
                 <div className={styles.cardsContainer}>
                    <div className={styles.cards}>
                    <svg className = {styles.icons} fill="#000000" viewBox="0 0 63 63" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g data-name="Layer 51" id="Layer_51"> <rect height="2" width="2" x="31" y="5"></rect> <path d="M32,31A14,14,0,1,0,18,17,14,14,0,0,0,32,31ZM32,5A12,12,0,0,1,44,16H43v2h1A12,12,0,0,1,33,29V27H31V29A12,12,0,0,1,20.05,18H21V16h-.95A12,12,0,0,1,32,5Z"></path> <path d="M34,18h4V16H34.85A2.81,2.81,0,0,0,33,14.15V9H31v9h3Z"></path> <path d="M48,33H16C8.83,33,3,38.45,3,45.14V61H61V45.14C61,38.45,55.17,33,48,33ZM35.91,35l-.54,6H28.63l-.54-6ZM36,51.44l-4,3.27-4-3.27L28.64,43h6.72ZM59,59H5V45.14C5,39.55,9.93,35,16,35H26.09l.62,7L26,52.33l6,5,6-5L37.29,42l.62-7H48c6.07,0,11,4.55,11,10.14Z"></path> </g> </g></svg>
                        <div className={styles.title}>
                
                            {isEnglish ? 'Employer Services' : 'Tajaajila hojjechiisaa'}
                        </div>
                        <div className={styles.cardBody}>
                           <ul>
                              {isEnglish && (<div>
                                    <li>1. Post Jobs</li>
                                    <li>2. Search for potential Job seekers.</li>
                                    <li>3. Automatic Candidates Shortlisting.</li>
                                    <li>4. Send Grouped and individual messages for Job seekers</li>
                                </div>
                             
                              )}
                               {isEnglish == false && (<div>
                                    <li>1. Hojii Maxxansuu.</li>
                                    <li>2. Hojjettota dandeetti barbaadamuu qaban barbaaduu.</li>
                                    <li>3. Calallii kaadhimamtootaa raawwachuu</li>
                                    <li>4 Hojii barbaaddotaaf ergaa Garee fi dhuunfaa erguu</li>
                                </div>
                             
                              )}
                            </ul>
                            <form>
                                <input type="submit" value={isEnglish ? "Post Jobs" : "Hojii Maxxansii"} className={styles.btnPrimary} />
                            </form>
                        </div>
                    </div>
                    <div className={styles.cards}>
                    <svg className={styles.icons} fill="#000000" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M23.313 26.102l-6.296-3.488c2.34-1.841 2.976-5.459 2.976-7.488v-4.223c0-2.796-3.715-5.91-7.447-5.91-3.73 0-7.544 3.114-7.544 5.91v4.223c0 1.845 0.78 5.576 3.144 7.472l-6.458 3.503s-1.688 0.752-1.688 1.689v2.534c0 0.933 0.757 1.689 1.688 1.689h21.625c0.931 0 1.688-0.757 1.688-1.689v-2.534c0-0.994-1.689-1.689-1.689-1.689zM23.001 30.015h-21.001v-1.788c0.143-0.105 0.344-0.226 0.502-0.298 0.047-0.021 0.094-0.044 0.139-0.070l6.459-3.503c0.589-0.32 0.979-0.912 1.039-1.579s-0.219-1.32-0.741-1.739c-1.677-1.345-2.396-4.322-2.396-5.911v-4.223c0-1.437 2.708-3.91 5.544-3.91 2.889 0 5.447 2.44 5.447 3.91v4.223c0 1.566-0.486 4.557-2.212 5.915-0.528 0.416-0.813 1.070-0.757 1.739s0.446 1.267 1.035 1.589l6.296 3.488c0.055 0.030 0.126 0.063 0.184 0.089 0.148 0.063 0.329 0.167 0.462 0.259v1.809zM30.312 21.123l-6.39-3.488c2.34-1.841 3.070-5.459 3.070-7.488v-4.223c0-2.796-3.808-5.941-7.54-5.941-2.425 0-4.904 1.319-6.347 3.007 0.823 0.051 1.73 0.052 2.514 0.302 1.054-0.821 2.386-1.308 3.833-1.308 2.889 0 5.54 2.47 5.54 3.941v4.223c0 1.566-0.58 4.557-2.305 5.915-0.529 0.416-0.813 1.070-0.757 1.739 0.056 0.67 0.445 1.267 1.035 1.589l6.39 3.488c0.055 0.030 0.126 0.063 0.184 0.089 0.148 0.063 0.329 0.167 0.462 0.259v1.779h-4.037c0.61 0.46 0.794 1.118 1.031 2h3.319c0.931 0 1.688-0.757 1.688-1.689v-2.503c-0.001-0.995-1.689-1.691-1.689-1.691z"></path> </g></svg>
                        <div className={styles.title}>
                            {isEnglish ? "Job Seeker Services": "Tajaajila hojii barbaaddotaa"}
                        </div>
                        <div className={styles.cardBody}>
                            <ul>
                             {isEnglish && (
                              <div>
                                <li>1. Build downloadable professional CV</li>
                                <li>2. Advanced Job Filter Features </li>
                                <li>3. Job Email Alert Service.</li>
                                <li>4. Online Job Application.</li>
                                <li>5. Get notifaction on the progress of the application.</li>
                              </div>
                              
                             )}
                             {isEnglish == false && (
                               <div>
                                <li>1. CV ogeessa qopheessuu fi buufachuu</li>
                                <li>2. Hojii barbaaduu </li>
                                <li>3. Beeksiisa Hojii karaa ergaa Imeelii.</li>
                                <li>4. Galmee Hojii Toora Interneetii.</li>
                                <li>5. Adeemsa galmee hojii irrattii ergaa argachuu </li>
                               </div>
                             )}
                            </ul>
                            <form>
                                <input type="submit" value={isEnglish ? "Find Jobs" : "Hojii Barbaadii"} className={styles.btnPrimary} />
                            </form>
                        </div>
                    </div>
                    <div className={styles.cards}>
                        <svg className={styles.icons} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 52 52" id="cv"><g  stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"><path d="M29.808 2H10.086c-.885 0-1.603.718-1.603 1.603v44.794c0 .885.718 1.603 1.603 1.603h31.828c.885 0 1.603-.718 1.603-1.603V15.094"></path><path d="M29.808 2v11.49c0 .886.718 1.604 1.603 1.604h12.106L29.808 2zM13.985 7.936h9.776v7.594h-9.776zM26 21.444h11.96M14.041 28.783H37.96M14.041 36.123H37.96M14.041 43.462H37.96"></path></g></svg>
                        <div className={styles.title}>
                            {isEnglish ? "Professional CV Builder" : "CV Ogeessaa qopheessuu"} 
                        </div>
                        <div className={styles.cardBody}>
                            <ul>
                             {isEnglish && (
                              <div>
                                <p>Create and Download professional CV with our CV builder.</p> 
                                <li>Step 1: Signup and Login to the sytem.</li>
                                <li>Step 2: Select Build CV from Menu.</li>
                                <li>Step 3: Enter the requested data.</li>
                                <li>Step 4: Save and Download your PDF CV file.</li>
                              </div>
                             )}
                               {isEnglish == false && (
                              <div>
                                <p>Haala ittin CV qopheessaa keenyan CV qophaa'e buufattan</p> 
                                <li>Tark. 1: Galmee(signup) booda kara siistama kenyaa seenaa (Login) </li>
                                <li>Tark. 2: Filannowwan jiraan kessaa CV Qopheessuu isa jedhuu fiiladhaa</li>
                                <li>Tark. 3: Odeeffanno barbaachisaan guutaa </li>
                                <li>Tark. 4: CV keessan buufadhaa(Download) </li>
                              </div>
                             )}
                            </ul>
                            <form>
                                <input type="submit" value="Build CV" className={styles.btnPrimary} />
                            </form>
                        </div>
                    </div>
                 </div>
                 
                
            
        </section>
    )
}
export default Services;