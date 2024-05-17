import styles from './searchResult.module.css'
const SearchResult = ({result})=>{
    return(
        <div className={styles.resultContainer}>
          <ul>
          {result.map((job, index)=>{
            return <a href={`/browse-by-title/${job.jobTitle}`}><li key={index}>{job.jobTitle}</li></a>
          })}
            
          </ul>
        </div>  
    )
}
export default SearchResult;