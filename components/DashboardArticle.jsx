import Link from "next/link"
import { FaPencilAlt, FaTimes } from "react-icons/fa"
import styles from '@/styles/DashboardArticle.module.css'

function DashboardArticle({article,handleDelete}) {
    
    return (
        <div className={styles.article}>
            <h4>
                <Link href={`/article/${article.slug}`}>
                    <a>{article.name}</a>
                </Link>
            </h4>
            <Link href={`/articles/edit/${article.id}`}>
                <a className={styles.edit}>
                <FaPencilAlt/> <span>Edit</span>
                </a>
            </Link>
            <a href="#" className={styles.delete} onClick={()=>handleDelete(article.id)}><FaTimes/> <span>Delete</span></a>
        </div>
    )
}

export default DashboardArticle
