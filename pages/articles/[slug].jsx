import Layout from "@/components/Layout"
import { API_URL } from "@/config/index"

function ArticlePage({ article }) {
    return (
        <Layout>
            <h1>{article.name}</h1>
        </Layout>
    )
}



export async function getStaticPaths() {
    const res = await fetch(`${API_URL}/api/articles`)
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
    const res = await fetch(`${API_URL}/api/articles/${slug}`)
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
