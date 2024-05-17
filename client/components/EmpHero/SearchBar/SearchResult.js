import styles from './searchResult.module.css'
const SearchResult = ({result})=>{
    return(
        <div className={styles.resultContainer}>
          <ul>
          {result.map((seeker, index)=>{
            return <a href={`/view-job-seekers/${seeker.userId}`}><li key={index}>{seeker.userFirstName} {seeker.userLastName} <span style={{color: 'gray', fontSize: "10pt"}}>({seeker.skills})</span></li></a>
          })}
            
          </ul>
        </div>  
    )
}
export default SearchResult;