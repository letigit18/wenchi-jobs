import { useSelector } from 'react-redux'
import styles from './leftMenu.module.css'
import { useEffect, useState } from 'react'
const LeftMenu = ()=>{
  const [selected, setSelected] = useState(null)
  const isEnglish = useSelector((state)=> state.language.isEnglish)
  const [location, setLocation] = useState([])

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
    return(
        <div className={styles.category}>
        <div className={styles.title}>
        {isEnglish == "English" ? "Job Categories" : isEnglish =="Oromic" ? "Gosa Hojii" : "የስራ አይነቶች"}
        </div>
        <div className={styles.accordion}>
          <div className={styles.accordionMenuItem}>
            <div className={selected === 1 ? `${styles.accordionItemHeader} ${styles.active}`: `${styles.accordionItemHeader}`} onClick={()=>handleToggle(1)}>
            {isEnglish == "English" ? "Organization Type" : isEnglish =="Oromic" ? "Gosa Dhaabbataa" : "የተቋሙ አይነት"}
            </div>
            <div className={styles.accordionItemBody}>
                <ul className={styles.accordioItemBodyContent}>
                <li><a href={`/browse-by-organization/Banks or Insurance`}>{isEnglish == "English" ? "Banks & Insurance" : isEnglish =="Oromic" ? "Baankii fi Inshuuraansii" : "ባንክና ኢንሹራንስ"}</a></li>
                    <li><a href={`/browse-by-organization/Government`}>{isEnglish == "English" ? "Govenment Jobs" : isEnglish =="Oromic" ? "Gosa Hojii" : "የመንግስት ተቋም ስራዎች"}</a></li>
                    <li><a href={`/browse-by-organization/Higher-education`}>{isEnglish == "English" ? "Higher Education Institution" : isEnglish =="Oromic" ? "Dhaabbata Barnoota Olaanoo" : "የከፍተኛ ት/ት ተቋማት"}</a></li>
                    <li><a href={`/browse-by-organization/NGO`}>{isEnglish == "English" ? "N.G.O Jobs" : isEnglish =="Oromic" ? "Hojiiwwan N.G.O" : "የ N.G.O ስራዎች"}</a></li>
                    <li><a href={`/browse-by-organization/PLC`}>{isEnglish == "English" ? "P.L.C Jobs" : isEnglish =="Oromic" ? "Hojiiwwan Dhaabbata dhuunfaa" : "የግል ተቋማት ስራዎች"}</a></li>
                  
                </ul>
            </div>
          </div>
          <div className={styles.accordionMenuItem}>
            <div className={selected === 2 ? `${styles.accordionItemHeader} ${styles.active}`: `${styles.accordionItemHeader}`}  onClick={()=>handleToggle(2)}>
             {isEnglish == "English" ? "Employment type" : isEnglish =="Oromic" ? "Haala Qacarrii" : "የቅጥር አይነት"}
            </div>
            <div className={styles.accordionItemBody}>
                <ul className={styles.accordioItemBodyContent}>    
                    <li><a href={`/browse-by-emp-type/contractual`}>{isEnglish == "English" ? "Contractual Jobs" : isEnglish =="Oromic" ? "Hojiiwwan Koontiraataa" : "የኮንትራት ስራዎች"}</a></li>
                    <li><a href={`/browse-by-emp-type/freelancing`}>{isEnglish == "English" ? "Freelancing Jobs" : isEnglish =="Oromic" ? "Hojiiwwan Bilisaa" : "የፍሪላንሲንግ ስራዎች"}</a></li>
                    <li><a href={`/browse-by-emp-type/full-time`}>{isEnglish == "English" ? "Full Time Jobs" : isEnglish =="Oromic" ? "Hojiiwwan Yero Guutuu" : "የሙሉ ጊዜ ስራዎች"}</a></li>
                    <li><a href={`/browse-by-emp-type/intern`}>{isEnglish == "English" ? "Internship Jobs" : isEnglish =="Oromic" ? "Hojiiwwan Intarnishippi" : "የኢንተርንሺፕ ስራዎች"}</a></li>
                    <li><a href={`/browse-by-emp-type/part-time`}>{isEnglish == "English" ? "Part Time Jobs" : isEnglish =="Oromic" ? "Hojiiwwan Yero Muraasaa " : "የፓርት ታይም ስራዎች"}</a></li>
                    <li><a href={`/browse-by-emp-type/remote`}>{isEnglish == "English" ? "Remo Jobs" : isEnglish =="Oromic" ? "Hojiiwwan Toora Intarneetii" : "የሪሞት ስራዎች"}</a></li>
                </ul>
            </div>
          </div>
          <div className={styles.accordionMenuItem}>
            <div className={selected === 3 ? `${styles.accordionItemHeader} ${styles.active}`: `${styles.accordionItemHeader}`}  onClick={()=>handleToggle(3)}>
              {isEnglish == "English" ? "Experience Level" : isEnglish =="Oromic" ? "Sadarkaa Muuxannoo" : "የስራ ልምድ ደረጃ"}
            </div>
            <div className={styles.accordionItemBody}>
                <ul className={styles.accordioItemBodyContent}>
                
                    <div>
                    
                      <li><a href={`/browse-by-experience/fresh-graduates`}>{isEnglish == "English" ? "Fresh Graduates" : isEnglish =="Oromic" ? "Eebbiiffamtoota Haaraa" : "አዲስ ተመራቂዎች"}</a> </li> 
                      <li><a href={`/browse-by-experience/1-3-years`}>{isEnglish == "English" ? "1-3 Years" : isEnglish =="Oromic" ? "Waggaa 1-3" : "1-3 አመት"} </a> </li>
                      <li><a href={`/browse-by-experience/3-5-years`}>{isEnglish == "English" ? "3-5 Years" : isEnglish =="Oromic" ? "Wagga 3-5" : "3-5 አመት"} </a></li>
                      <li><a href={`/browse-by-experience/5-10-years`}>{isEnglish == "English" ? "5-10 Years" : isEnglish =="Oromic" ? "Wagga 5-10" : "5-10 አመት"}</a></li>
                      <li><a href={`/browse-by-experience/above-10-years`}>{isEnglish == "English" ? "Above 10 Years" : isEnglish =="Oromic" ? "Wagga 10 Ol" : "ክ10 አመት በላይ"}</a></li>
                    </div>
               
                  
                  
                </ul>
            </div>
          </div>
          <div className={styles.accordionMenuItem}>
            <div className={selected === 4 ? `${styles.accordionItemHeader} ${styles.active}`: `${styles.accordionItemHeader}`}  onClick={()=>handleToggle(4)}>
            {isEnglish == "English" ? "Location" : isEnglish =="Oromic" ? "Bakka Hojii" : "የስራ ቦታ"}
            </div>
            <div className={styles.accordionItemBody}>
                <ul className={styles.accordioItemBodyContent}>
                    {location.map((loc, index)=>{
                      return <li key={index}><a href={`/browse-by-location/`.concat(loc.jobLocation.split(",")[0])}>{loc.jobLocation.split(",")[0]}</a></li>
                    })}
                </ul>
            </div>
          </div>
          
        </div>
            
    </div>
    )
}
export default LeftMenu;