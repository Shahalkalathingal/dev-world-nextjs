import Link from 'next/link'
import styles from '../styles/Header.module.css'

function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link href='/'>
                    <a>Article World</a>
                </Link>
            </div>

            <nav>
                <ul>
                    <li>
                        <Link href='/articles'>
                            <a>Articles</a>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header
