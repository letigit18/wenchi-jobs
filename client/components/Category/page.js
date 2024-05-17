"use client"
import { useEffect, useState } from 'react';
import styles from './category.module.css';
import { useSelector, useDispatch } from 'react-redux';
import LeftMenu from './LeftMenu/LeftMenu';
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
    fetch(process.env.NEXT_PUBLIC_SERVER_ADDRESS+'/fetch-location-data')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
       setLocation(data)
      });
  }, []);
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
  //fetch job counter by category
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_SERVER_ADDRESS+'/job-counter')
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
                <LeftMenu />
                <div className={styles.jobContainer}>
                
                    <ul className={styles.gridContainer}>
                    {category?.map((cat, index)=>{
                      return  (<a href={`/browse-by-category/${cat.categoryName}`}><li key={index}> {isEnglish == "English" ? cat.categoryName : isEnglish =="Oromic" ? cat.categoryOromic : cat.categoryAhmaric}
                       
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