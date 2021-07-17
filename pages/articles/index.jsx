import Layout from "@/components/Layout"
import { API_URL } from "@/config/index"
import ArticleItem from '@/components/ArticleItem'

export default function ArticlesPage({articles}) {
  return (
    <Layout>
      <h2>Articles</h2>
      {articles.length === 0 && <h3>No articles to show</h3>}
    
    {articles.map(article=>(
      <ArticleItem key={article.id} article={article}/>
    ))}
    
    </Layout>
  )
}


export async function getServerSideProps(){
  const res = await fetch(`${API_URL}/articles?_sort=date:ASC`)
  const articles = await res.json()
  return {
    props:{articles},
  }
} 