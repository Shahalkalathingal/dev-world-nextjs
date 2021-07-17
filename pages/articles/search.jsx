import Layout from "@/components/Layout"
import { API_URL } from "@/config/index"
import ArticleItem from '@/components/ArticleItem'
import qs from "qs"
import Link from 'next/link'
import {useRouter} from 'next/router'

export default function SearchPage({articles}) {
    const router = useRouter()
  return (
    <Layout title={`Search Results | ${router.query.term}`}>
      <Link href='/articles'><a>{'<'} Go Back </a></Link>
      <h2>Search Results for <span style={{color:'red'}}>"{router.query.term}"</span></h2>
      {articles.length === 0 && <h4>No articles to show</h4>}
    
    {articles.map(article=>(
      <ArticleItem key={article.id} article={article}/>
    ))}
    
    </Layout>
  )
}


export async function getServerSideProps({query:{term}}){
    const query = qs.stringify({
        _where:{
            _or:[
                {name_contains:term},
                {author_contains:term},
                {description_contains:term},
            ]
        }
    })
  const res = await fetch(`${API_URL}/articles?${query}`)
  const articles = await res.json()
  return {
    props:{articles},
  }
} 