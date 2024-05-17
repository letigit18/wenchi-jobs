"use client"
import {useEffect, useState} from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import { useSelector} from 'react-redux';
import LeftMenu from '@/components/Category/LeftMenu/LeftMenu';
const ViewJobSeekers = ({params})=>{
  const [selected, setSelected] = useState(null)
  const [clicked, setClicked] = useState(false)
  const isEnglish = useSelector((state)=> state.language.isEnglish)
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/view-job-seekers/${params.userId}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
       setData(data)
      });
  }, []);
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
                <LeftMenu />
                <div className={styles.jobContainer}>
                {data.map((seeker, index)=>{
                return  <div className={styles.profileCard}>
                          <div className={styles.header}>
                            <img  src={`${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/uploads/`+seeker.userImage} alt='profile-img'/>
                            <h2>{seeker.userFirstName} {seeker.userMiddleName}</h2>
                            <p><i className='bx bx-current-location'> </i> {seeker.userLocation}, Ethiopia</p>
                            <p><i className='bx bxs-phone'> </i> {seeker.phoneNumber}</p>
                          </div>
                         
                          <div className={styles.skillContainer}>
                            <h2>Skills</h2>
                            <ul>
                                {seeker.skills.split(',').map((skill, index)=>{
                                    return <li>{skill}</li>
                                })}
                            </ul>
                          </div>
                          <div className={styles.buttonContainer}>
                            <button  className={clicked ? styles.btnSuccess : styles.btnInvite} onClick={()=>{setClicked(true)}} >{clicked ? <p><i style={{fontSize: '16px', fontWeight: 'bold'}} className='bx bx-check'></i> Invitation Sent</p> : "Invite for Job"}</button>
                            <button className={styles.btnDetail}>View Detail</button>
                          </div>
                        </div>
                   })}
                
                </div>
               
            </div>
        </section>
    )
}
export default ViewJobSeekers;
