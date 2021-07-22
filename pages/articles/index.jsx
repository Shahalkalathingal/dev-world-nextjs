import Layout from "@/components/Layout"
import { API_URL, PER_PAGE } from "@/config/index"
import ArticleItem from '@/components/ArticleItem'
import Pagination from "@/components/Pagination"

export default function ArticlesPage({articles,page,total}) {
  
  
  return (
    <Layout>
      <h2>Articles</h2>
      {articles.length === 0 && <h3>No articles to show</h3>}
    
    {articles.map(article=>(
      <ArticleItem key={article.id} article={article}/>
    ))}

    <Pagination page={page} total={total}/>
    </Layout>
  )
}


export async function getServerSideProps({query:{page = 1}}){
  if(!page){
    page = 1
  }
  // calc start page
  const start = +page === 1 ? 0 : (+page -1) * PER_PAGE

  // Fetch total/count
  const totalRes = await fetch(`${API_URL}/articles/count`)
  const total = await totalRes.json()


  // Fetch articles
  const articleRes = await fetch(`${API_URL}/articles?_sort=created_at:DESC&_limit=${PER_PAGE}&_start=${start}`)
  const articles = await articleRes.json()

  return {
    props:{articles,page:+page,total},
  }
} 