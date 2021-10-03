import Layout from "@/components/Layout"
import { API_URL } from "@/config/index"
import { parseCookies } from "helpers"
import styles from '@/styles/Dashboard.module.css'
import DashboardArticle from "@/components/DashboardArticle"
import { useRouter } from "next/router"




function Dashboard({articles,token}) {
    const router = useRouter()
    const deleteArticle = async (id) => {
        if (confirm('Are you sure?')) {
            const res = await fetch(`${API_URL}/articles/${id}`, {
                method: 'DELETE',
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            const data = await res.json()
    
            if (!res.ok) {
                toast.error(data.message)
            } else {
                router.reload()
            }
        }
    }

    return (
        <Layout title='Dashboard'>
            <div className={styles.dash}>
                <h1>Dashboard</h1>
                {articles.length > 0 && <h3>My Articles</h3>}

                {articles.length > 0 ? articles.map((article)=>(
                    <DashboardArticle handleDelete={deleteArticle} key={article.id} article={article}/>
                ))
            :
      <h4>No articles to show</h4>
            }
            </div>
        </Layout>
    )
}

export default Dashboard



export async function getServerSideProps({req}){
    const {token} = parseCookies(req)

    const res = await fetch(`${API_URL}/articles/me`,{
        method:'GET',
        headers:{
            Authorization:`Bearer ${token}`
        }
    })

    const articles = await res.json()

    return{
        props:{articles,token}
    }
}