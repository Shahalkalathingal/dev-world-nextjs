import Head from 'next/head'
import styles from '../styles/Layout.module.css'
import Footer from './Footer'
import Header from './Header'

function Layout({ title, keywords, description, children }) {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name='description' content={description} />
                <meta name='keywords' content={keywords} />
            </Head>
            <Header/>
            <div className={styles.container}>
                {children}
            </div>
            <Footer/>
        </div>
    )
}

Layout.defaultProps = {
    title: 'Article world | Find the best articles',
    description: 'Find the latest articles and blogs',
    keywords: 'blog, article, articleworld, blogs, shahal, shahalkalathingal, articles, shahalk, shahalblog, blogshahal, posts, allposts'
}


export default Layout
