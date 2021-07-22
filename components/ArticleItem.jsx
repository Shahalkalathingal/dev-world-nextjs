import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/ArticleItem.module.css'
import moment from 'moment'

function ArticleItem({ article }) {

    return (
        <Link href={`/articles/${article.slug}`}>
            <a className={styles.link}>
                <div className={styles.h3}>

                    <div className={styles.article}>

                        <div className={styles.info}>
                            <span>
                                {moment(article.created_at).format('DD/MM/YYYY')} at {moment(article.created_at).format('hh:mm A')}
                            </span>
                            <h3>{article.name.length > 50 ? `${article.name.substr(0,50)}...` : article.name}</h3>
                        </div>

                    </div>
                </div>
            </a>
        </Link>
    )
}

export default ArticleItem
