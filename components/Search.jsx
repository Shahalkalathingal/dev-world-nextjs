import styles from '@/styles/Search.module.css'
import { useState } from 'react'
import { useRouter } from 'next/router'

function Search() {
    const [term, setTerm] = useState('')

    const router = useRouter()


    const handleSubmit = (e)=>{
        e.preventDefault()
        router.push(`/articles/search?term=${term}`)
    }
    return (
        <div className={styles.search}>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={(e) => setTerm(e.target.value)} placeholder="Search Articles" />
            </form>
        </div>
    )
}

export default Search
