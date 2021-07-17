import Layout from "@/components/Layout"
import { API_URL } from "@/config/index"

export default function Home({articles}) {
  return (
    <Layout>
      <h1>Latest Articles</h1>
      {articles.length === 0 && <h3>No articles to show</h3>}
    
    {articles.map(article=>(
      <h3 key={article.id}>{article.name}</h3>
    ))}
    
    </Layout>
  )
}


export async function getStaticProps(){
  const res = await fetch(`${API_URL}/api/articles`)
  const articles = await res.json()

  return {
    props:{articles},
    revalidate:1,
  }
}