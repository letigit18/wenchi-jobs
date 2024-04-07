"use client"
import { useContext, useState } from 'react';
import styles from './category.module.css';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
const Category = ()=>{
  const [selected, setSelected] = useState(null)
  const dispatch = useDispatch();
  const isEnglish = useSelector((state)=> state.language.isEnglish)
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
                        {isEnglish ? 'Job categories' : 'Gosa Hojii'}
                    </div>
                    <div className={styles.accordion}>
                      <div className={styles.accordionMenuItem}>
                        <div className={selected === 1 ? `${styles.accordionItemHeader} ${styles.active}`: `${styles.accordionItemHeader}`} onClick={()=>handleToggle(1)}>
                        {isEnglish ? 'Organization Type' : 'Gosa Dhaabbataa'}
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
                        {isEnglish ? 'Employment type' : 'Gosa qacarrii'}
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
                           {isEnglish ? 'Company names' : 'Maqaa dhaabbataa'}
                        </div>
                        <div className={styles.accordionItemBody}>
                            <ul className={styles.accordioItemBodyContent}>
                                <li>Awash bank</li> 
                            </ul>
                        </div>
                      </div>
                      <div className={styles.accordionMenuItem}>
                        <div className={selected === 4 ? `${styles.accordionItemHeader} ${styles.active}`: `${styles.accordionItemHeader}`}  onClick={()=>handleToggle(4)}>
                           {isEnglish ? 'Location' : 'Bakka'}
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
                    <ul className={styles.gridContainer}>
                        <li>Information Technolog <span className={styles.counter}> 102</span></li>
                        <li>Computer Science <span className={styles.counter}> 102</span></li>
                        <li>Information Technology <span className={styles.counter}> 102</span></li>
                        <li>Information Technology <span className={styles.counter}> 102</span></li>
                        <li>Information Technology <span className={styles.counter}> 102</span></li>
                        
                        <li>Computer Science</li>
                        
                    </ul>
                </div>
            </div>
        </section>
    )
}
export default Category;