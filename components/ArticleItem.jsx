import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/ArticleItem.module.css'

function ArticleItem({article}) {
    
    return (
        <div className={styles.article}>
            <div className={styles.img}>
                <Image src={article.image ? article.image.formats.thumbnail.url : '/images/event-default.png'} width={170} height={100}/>
            </div>

            <div className={styles.info}>
                <span>
                    {new Date(article.date).toLocaleDateString(('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }))} at {article.time}
                </span>
                <h3>{article.name}</h3>
            </div>

            <div className={styles.link}>
                <Link href={`/articles/${article.slug}`}>
                    <a className="btn">Details</a>
                </Link>
            </div>
        </div>
    )
}

export default ArticleItem
