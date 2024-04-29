"use client"
import { useEffect, useState } from 'react';
import styles from './category.module.css';
import { useSelector, useDispatch } from 'react-redux';
const Category = ()=>{
  const [selected, setSelected] = useState(null)
  const dispatch = useDispatch();
  const isEnglish = useSelector((state)=> state.language.isEnglish)
  const [category, setCategory] = useState([])
  const [location, setLocation] = useState([])
  const [counterData, setCounterData] = useState([])
  const handleToggle = (index)=>{
    if(selected == index){
        return setSelected(null)
    }
    setSelected(index)
  }
  //fetch location 
  useEffect(() => {
    fetch('http://localhost:5000/fetch-location-data')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
       setLocation(data)
      });
  }, []);
  //fetch category from database 
  useEffect(() => {
    fetch('http://localhost:5000/fetch-job-category')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
       setCategory(data)

      });
  }, []);
  //fetch job counter by category
  useEffect(() => {
    fetch('http://localhost:5000/job-counter')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
    
       setCounterData(data)
     
      });
  }, []);
       
    return(
        <section className={styles.container} id="category">
            <div className={styles.card}>
                <div className={styles.category}>
                    <div className={styles.title}>
                        {isEnglish ? 'Job categories' : 'Gosa Hojii'}
                    </div>
                    <div className={styles.accordion}>
                      <div className={styles.accordionMenuItem}>
                        <div className={selected === 1 ? `${styles.accordionItemHeader} ${styles.active}`: `${styles.accordionItemHeader}`} onClick={()=>handleToggle(1)}>
                        {isEnglish ? 'Organization Type' : 'Gosa Dhaabbataa'}
                        </div>
                        <div className={styles.accordionItemBody}>
                            <ul className={styles.accordioItemBodyContent}>
                                <li><a href="#">Government Jobs</a></li>
                                <li>NGO Jobs</li>
                                <li>University Jobs</li>
                            </ul>
                        </div>
                      </div>
                      <div className={styles.accordionMenuItem}>
                        <div className={selected === 2 ? `${styles.accordionItemHeader} ${styles.active}`: `${styles.accordionItemHeader}`}  onClick={()=>handleToggle(2)}>
                        {isEnglish ? 'Employment type' : 'Gosa qacarrii'}
                        </div>
                        <div className={styles.accordionItemBody}>
                            <ul className={styles.accordioItemBodyContent}>    
                                <li>Contractual Jobs</li>
                                <li>Freelancers</li>
                                <li>Full time </li>
                                <li>Intern</li>
                                <li>Part time</li>
                                <li>Remote</li>
                            </ul>
                        </div>
                      </div>
                      <div className={styles.accordionMenuItem}>
                        <div className={selected === 3 ? `${styles.accordionItemHeader} ${styles.active}`: `${styles.accordionItemHeader}`}  onClick={()=>handleToggle(3)}>
                           {isEnglish ? 'Experience Level' : 'Sadarkaa Muuxannoo'}
                        </div>
                        <div className={styles.accordionItemBody}>
                            <ul className={styles.accordioItemBodyContent}>
                            
                                <div>
                                  <li>{isEnglish ? "Freesh Graduates" : "Eebbifamtoota Haaraa"} </li> 
                                  <li>{isEnglish ? "1 - 3 years " : "waggaa 1-3"} </li>
                                  <li>{isEnglish ? "3 - 5 years " : "waggaa 3-5"} </li>
                                  <li>{isEnglish ? "5 - 10 years " : "waggaa 5-10"} </li>
                                  <li>{isEnglish ?  "Greater than 10 years" : "waggaa 10 ol"}</li>
                                </div>
                           
                              
                              
                            </ul>
                        </div>
                      </div>
                      <div className={styles.accordionMenuItem}>
                        <div className={selected === 4 ? `${styles.accordionItemHeader} ${styles.active}`: `${styles.accordionItemHeader}`}  onClick={()=>handleToggle(4)}>
                           {isEnglish ? 'Location' : 'Bakka'}
                        </div>
                        <div className={styles.accordionItemBody}>
                            <ul className={styles.accordioItemBodyContent}>
                                {location.map((loc, index)=>{
                                  return <li key={index}><a >{loc.jobLocation}</a></li>
                                })}
                            </ul>
                        </div>
                      </div>
                      
                    </div>
                        
                </div>
                <div className={styles.jobContainer}>
                
                    <ul className={styles.gridContainer}>
                    {category?.map((cat, index)=>{
                      return  (<a href={`/browse-by-category/${cat.categoryName}`}><li key={index}>{isEnglish ? cat.categoryName : cat.categoryOromic}
                       
                           {counterData.map((job, index)=>{
                            if(job.jobCategory == cat.categoryName)
                            {
                              return (<span className={styles.counter}> {job.counter}</span>)
                            }
                           })}
                       </li></a>
                    )})}
                    </ul>
              
                </div>
            </div>
        </section>
    )
}
export default Category;