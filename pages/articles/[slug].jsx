import Layout from "@/components/Layout"
import { API_URL } from "@/config/index"
import styles from '@/styles/Article.module.css'
import Image from "next/image"
import {FaPencilAlt,FaTimes} from 'react-icons/fa'
import Link from "next/link"
import ReactMarkdown from "react-markdown"

function ArticlePage({ article }) {
    const deleteArticle = (e)=>{
        console.log('delete');
    }
    return (
        <Layout title={`${article.name} | Dev World`} description={article.name}>
            <div className={styles.article}>
                <div className={styles.controls}>
                    <Link href={`/articles/edit/${article.id}`}>
                        <a>
                            <FaPencilAlt/> Edit Article
                        </a>
                    </Link>
                    <a href="#" className={styles.delete} onClick={deleteArticle}>
                        <FaTimes/> Delete Article
                    </a>
                </div>

                <span>
                    {new Date(article.date).toLocaleDateString(('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }))} at {article.time}
                </span>
                <h1>{article.name}</h1>
                {article.image && (
                    <div className={styles.image}>
                        <Image src={article.image.formats.medium.url} width={960} height={600} alt="a"/>
                    </div>
                )}

                <h4>Author:</h4>
                <p>{article.author}</p>
                <h3>Description:</h3>
<ReactMarkdown>
                {article.description}
</ReactMarkdown>

                <Link href="/articles">
                    <a className={styles.back}>{'<'} Go Back </a>
                </Link>
            </div>
        </Layout>
    )
}



export async function getStaticPaths() {
    const res = await fetch(`${API_URL}/articles`)
    const articles = await res.json()

    const paths = articles.map((article) => ({
        params: { slug: article.slug }
    }))
    return {
        paths,
        fallback: true
    }
}


export async function getStaticProps({ params: { slug } }) {
    const res = await fetch(`${API_URL}/articles?slug=${slug}`)
    const articles = await res.json()
    return {
        props: {
            article: articles[0]
        },
        revalidate: 1
    }
}



// export async function getServerSideProps({query:{slug}}){
//     const res = await fetch(`${API_URL}/api/articles/${slug}`)
//     const articles = await res.json()
//     return{
//         props:{
//             article:articles[0]
//         }
//     }
// }

export default ArticlePage
