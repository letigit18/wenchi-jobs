import styles from './searchBar.module.css'
import { useState } from 'react'
const SearchBar = ({setResult})=>{
    const [search, setSearch] = useState('')
//fetching all the job data from server
   const fetchData = (value)=>{
    fetch(process.env.NEXT_PUBLIC_SERVER_ADDRESS+'/fetch-job-seekers')
    .then(res=>{
     return res.json()
    })
    .then(data=>{
      const results = data.filter((seeker, index)=>{
        return (
            value && seeker && seeker.skills && seeker.skills.toLowerCase().split(',').includes(value) 
        )
      })
      setResult(results)
    })
    .catch(err=> console.log(err))
   }
    const handleChange = (value)=>{
        setSearch(value)
        fetchData(value)
       }
    return(
        <form>
            <input type='text' value={search} size="33" id='searchText' className= {styles.formInput} placeholder='Search your talent here' onChange={(e)=>{handleChange(e.target.value)}}  />
            <label className={styles.icon}>
            <i className='bx bx-search'></i>
            </label>
        
      </form>
    )
}
export default SearchBar;