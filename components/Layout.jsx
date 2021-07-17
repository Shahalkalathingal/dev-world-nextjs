import Head from 'next/head'
import styles from '@/styles/Layout.module.css'
import Footer from './Footer'
import {useRouter} from 'next/router'
import Header from './Header'
import Showcase from './Showcase'

function Layout({ title, keywords, description, children }) {
    const router = useRouter()
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name='description' content={description} />
                <meta name='keywords' content={keywords} />
            </Head>

            <Header/>

            {router.pathname === '/' && <Showcase/>}

            <div className={styles.container}>
                {children}
            </div>
            <Footer/>
        </div>
    )
}

Layout.defaultProps = {
    title: 'Article world | Read the best articles',
    description: 'Read the latest articles and blogs',
    keywords: 'blog, article, articleworld, blogs, shahal, shahalkalathingal, articles, shahalk, shahalblog, blogshahal, posts, allposts'
}


export default Layout
