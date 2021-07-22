import Link from 'next/link'
import styles from '@/styles/Header.module.css'
import Search from './Search'
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import AuthContext from '@/context/AuthContext'
import { useContext } from 'react'

function Header() {
    const { user, logout } = useContext(AuthContext)
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link href='/'>
                    <a>Dev World</a>
                </Link>
            </div>
            <Search />
            <nav>
                <ul>
                    <li>
                        <Link href='/articles'>
                            <a>Articles</a>
                        </Link>
                    </li>
                    {user ? 
                    // If Logged IN
                    <>
                        <li>
                            <Link href='/articles/add'>
                                <a>Add</a>
                            </Link>
                        </li>
                        <li>
                            <Link href='/account/dashboard'>
                                <a>Dashboard</a>
                            </Link>
                        </li>
                        <li>
                            <button onClick={()=>logout()} className="btn-secondary btn-icon">
                            <FaSignOutAlt/> Logout
                            </button>
                        </li>
                    </> :
                    // If Logged Out
                    <>
                    <li>
                        <Link href='/account/login'>
                            <a className='btn-secondary btn-icon'>
                                <FaSignInAlt />
                                Login</a>
                        </Link>
                    </li>
                    </>}

                    
                </ul>
            </nav>
        </header>
    )
}

export default Header
