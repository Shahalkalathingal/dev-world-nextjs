import Layout from "@/components/Layout"
import { API_URL } from "@/config/index"
import ArticleItem from '@/components/ArticleItem'
import Link from 'next/link'

export default function Home({articles}) {
  return (
    <Layout>
      <h2>Latest Articles</h2>
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


export async function getServerSideProps(){
  const res = await fetch(`${API_URL}/articles?_sort=created_at:DESC&_limit=3`)
  const articles = await res.json()
console.log(res);
  return {
    props:{articles},
  }
}