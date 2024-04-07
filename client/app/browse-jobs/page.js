"use client"
import {useEffect, useState, useRouter } from 'react';
import styles from './finder.module.css';
import Link from 'next/link';
import { useSelector} from 'react-redux';
const JobFinder = ()=>{
  const [selected, setSelected] = useState(null)
  const isEnglish = useSelector((state)=> state.language.isEnglish)

  const [data, setData] = useState(null);
 
  useEffect(() => {
      fetchData().then((result) => {
          setData(result);
      });
  }, []);

  const fetchData = async () => {
      try {
          const response = await
              fetch('https://jsonplaceholder.typicode.com/posts/1');
          const jsonData = await response.json();
          return jsonData;
      } catch (error) {
          console.error('Error fetching data:', error);
          return null;
      }
  };
  //handle the accordion toggle
  const handleToggle = (index)=>{
    if(selected == index){
        return setSelected(null)
    }
    setSelected(index)
  }
 
       
    return(
        <section className={styles.container} id="category">
            <div className={styles.card}>
                <div className={styles.category}>
                    <div className={styles.title}>
                        Job categories
                    </div>
                    <div className={styles.accordion}>
                      <div className={styles.accordionMenuItem}>
                        <div className={selected === 1 ? `${styles.accordionItemHeader} ${styles.active}`: `${styles.accordionItemHeader}`} onClick={()=>handleToggle(1)}>
                            Organization Type
                        </div>
                        <div className={styles.accordionItemBody}>
                            <ul className={styles.accordioItemBodyContent}>
                                <li><Link href="#">Government Jobs</Link></li>
                                <li>NGO Jobs</li>
                                <li>University Jobs</li>
                            </ul>
                        </div>
                      </div>
                      <div className={styles.accordionMenuItem}>
                        <div className={selected === 2 ? `${styles.accordionItemHeader} ${styles.active}`: `${styles.accordionItemHeader}`}  onClick={()=>handleToggle(2)}>
                            Job Type
                        </div>
                        <div className={styles.accordionItemBody}>
                            <ul className={styles.accordioItemBodyContent}>
                                <li>Contractual Jobs </li>
                                <li>Permanent Jobs</li>
                                <li>Remote Jobs</li>
                                <li>Contractual Jobs</li>
                                <li>Permanent Jobs</li>
                                <li>Remote Jobs</li>
                                <li>Contractual Jobs</li>
                                <li>Permanent Jobs</li>
                                <li>Remote Jobs</li>
                                <li>Contractual Jobs</li>
                                <li>Permanent Jobs</li>
                                <li>Remote Jobs</li>
                            </ul>
                        </div>
                      </div>
                      <div className={styles.accordionMenuItem}>
                        <div className={selected === 3 ? `${styles.accordionItemHeader} ${styles.active}`: `${styles.accordionItemHeader}`}  onClick={()=>handleToggle(3)}>
                            Company names
                        </div>
                        <div className={styles.accordionItemBody}>
                            <ul className={styles.accordioItemBodyContent}>
                                <li>Awash bank</li> 
                            </ul>
                        </div>
                      </div>
                      <div className={styles.accordionMenuItem}>
                        <div className={selected === 4 ? `${styles.accordionItemHeader} ${styles.active}`: `${styles.accordionItemHeader}`}  onClick={()=>handleToggle(4)}>
                            Location
                        </div>
                        <div className={styles.accordionItemBody}>
                            <ul className={styles.accordioItemBodyContent}>
                                <li>Addis Ababa</li> 
                            </ul>
                        </div>
                      </div>
                      
                    </div>
                        
                </div>
                <div className={styles.jobContainer}>
                    <div className={styles.searchBar}>
                      <input type="text" placeholder='Enter your search term eg. Software Developer' name="job" />
                    </div>
            
                      
                    <div className={styles.box}>
                            <div className={styles.header}>
                                <h3>Application Developer</h3>
                                <p>2 days left</p>
                            </div>
                            <ul>
                                <li className={styles.company}>Awash Bank</li>
                                <li><b>Salary:</b> 12000 </li>
                                <li><b>Employment Type:</b> </li>
                                <li><b>Posted:</b> March 13</li> 
                            </ul>
                            <img src='logo.jpg' alt='company logo' className={styles.logo} />
                            <div className={styles.tooltip}>
                               {isEnglish ? 'Click to view detail': `Cuqaasii`} 
                            </div>
                    </div>
                        
                    <div className={styles.box}>
                            <div className={styles.header}>
                                <h3>{isEnglish ? 'Application Developer' : 'Guddisaa Teeknoologii'}</h3>
                                <p>2 days left</p>
                            </div>
                            <ul>
                                <li className={styles.company}>Awash Bank</li>
                                <li><b>Salary:</b> 12000 </li>
                                <li><b>Posted:</b> March 13</li>
                                <li><b>Employment Type:</b> </li>
                                {data ? (
                <div>
                    <h2>Title: {data.title}</h2>
                    <p>Body: {data.body}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
                            </ul>
                            <img src='logo.jpg' alt='company logo' className={styles.logo} />
                            <div className={styles.tooltip}>
                                Click to view detail!
                            </div>
                    </div>
                        

                          <div className={styles.box}>
                            <div className={styles.header}>
                                <h3>Application Developer</h3>
                                <p>2 days left</p>
                            </div>
                            <ul>
                                <li className={styles.company}>Awash Bank</li>
                                <li><b>Salary:</b> 12000 </li>
                                <li><b>Posted:</b> March 13</li>
                                <li><b>Employment Type:</b> </li>
                            </ul>
                            <img src='logo.jpg' alt='company logo' className={styles.logo} />
                            <div className={styles.tooltip}>
                                Click to view detail!
                            </div>
                        </div>
                        <div className={styles.box}>
                            <div className={styles.header}>
                                <h3>Application Developer</h3>
                                <p>2 days left</p>
                            </div>
                            <ul>
                                <li className={styles.company}>Awash Bank</li>
                                <li><b>Salary:</b> 12000 </li>
                                <li><b>Posted:</b> March 13</li>
                                <li><b>Employment Type:</b> </li>
                            </ul>
                            <img src='logo.jpg' alt='company logo' className={styles.logo} />
                            <div className={styles.tooltip}>
                                Click to view detail!
                            </div>
                    </div>
                        
                    <div className={styles.box}>
                            <div className={styles.header}>
                                <h3>Application Developer</h3>
                                <p>2 days left</p>
                            </div>
                            <ul>
                                <li className={styles.company}>Awash Bank</li>
                                <li><b>Salary:</b> 12000 </li>
                                <li><b>Posted:</b> March 13</li>
                                <li><b>Employment Type:</b> </li>
                            </ul>
                            <img src='logo.jpg' alt='company logo' className={styles.logo} />
                            <div className={styles.tooltip}>
                                Click to view detail!
                            </div>
                    </div>
                        
                        
                         

                
                   
                        
                    
                </div>
            </div>
        </section>
    )
}
export default JobFinder;
