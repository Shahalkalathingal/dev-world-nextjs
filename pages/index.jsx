import Layout from "@/components/Layout"
import { API_URL } from "@/config/index"
import ArticleItem from '@/components/ArticleItem'
import Link from 'next/link'

export default function Home({articles}) {
  return (
    <Layout>
      <h1>Latest Articles</h1>
      {articles.length === 0 && <h3>No articles to show</h3>}
    
    {articles.map(article=>(
      <ArticleItem key={article.id} article={article}/>
    ))}

    {articles.length > 0 && (
      <Link href='/articles'>
        <a className="btn-secondary">View All Articles</a>
      </Link>
    )}
    
    </Layout>
  )
}


export async function getStaticProps(){
  const res = await fetch(`${API_URL}/api/articles`)
  const articles = await res.json()

  return {
    props:{articles:articles.slice(0,3)},
    revalidate:1,
  }
}