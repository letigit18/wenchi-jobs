import styles from './searchBar.module.css'
import { useState } from 'react'
const SearchBar = ({setResult})=>{
    const [search, setSearch] = useState('')
//fetching all the job data from server
   const fetchData = (value)=>{
    fetch('http://localhost:5000/fetch-jobs')
    .then(res=>{
     return res.json()
    })
    .then(data=>{
      const results = data.filter((job, index)=>{
        return (
            value && job && job.jobTitle && job.jobTitle.toLowerCase().includes(value) 
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
            <input type='text' value={search} size="33" id='searchText' className= {styles.formInput} placeholder='Search your job here' onChange={(e)=>{handleChange(e.target.value)}}  />
            <label className={styles.icon}>
            <i className='bx bx-search'></i>
            </label>
        
      </form>
    )
}
export default SearchBar;