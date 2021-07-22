import Layout from "@/components/Layout"
import { API_URL } from "@/config/index"
import styles from '@/styles/Article.module.css'
import Image from "next/image"
import { FaPencilAlt, FaTimes } from 'react-icons/fa'
import Link from "next/link"
import moment from "moment"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from "next/router"
import NotFoundPage from "pages/404"
import HTMLReactParser from "html-react-parser"

function ArticlePage({ article }) {
    const router = useRouter()
    const deleteArticle = async (e) => {
        if (confirm('Are you sure?')) {
            const res = await fetch(`${API_URL}/articles/${article.id}`, {
                method: 'DELETE'
            })
            const data = await res.json()

            if (!res.ok) {
                toast.error(data.message)
            } else {
                router.push('/articles')
            }
        }
    }

    return (
        <>
            {article ? <Layout title={`${article.name && article} | Dev World`} description={article.name}>
                <div className={styles.article}>
                    <div className={styles.controls}>
                        <Link href={`/articles/edit/${article.id}`}>
                            <a>
                                <FaPencilAlt /> Edit Article
                            </a>
                        </Link>
                        <a href="#" className={styles.delete} onClick={deleteArticle}>
                            <FaTimes /> Delete Article
                        </a>
                    </div>

                    {article.image && (
                        <div className={styles.image}>
                            <Image src={article.image.formats.medium.url} width={960} height={600} alt="a" />
                        </div>
                    )
                    }
                    <span>
                        <b>{moment(article.created_at).format('DD/MM/YYYY')} at {moment(article.created_at).format('hh:mm A')}</b>
                    </span>
                    <p>Author : {article.author}</p>
                    <h2 style={{ textAlign:'justify',overflow:'auto'}}>{article.name}</h2>
                    <ToastContainer />
                    <div>
                        {HTMLReactParser(article.description)}
                    </div>
                 
                      

                    <Link href="/articles">
                        <a className={styles.back}>{'<'} Go Back </a>
                    </Link>
                </div>
            </Layout> :
                <NotFoundPage />
            }

        </>
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
    if (articles[0]) {
        return {
            props: {
                article: articles[0]
            },
            revalidate: 1
        }
    } else {
        return {
            props: {
                article: false
            },
            revalidate: 1
        }
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
