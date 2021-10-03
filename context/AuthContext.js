import { createContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { NEXT_URL } from '@/config/index'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)

    const router = useRouter()
    
    
    useEffect(() => checkUserLoggedIn(), [])

    
    // Register User
    const register = async (user) => {
        const res = await fetch(`${NEXT_URL}/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        })

        const data = await res.json()

        if (res.ok) {
            setUser(data.user)
            router.push('/account/dashboard')
        } else {
            setError(data.message)
            setError(false)
        }
    }

    // Login User
    const login = async ({ email: identifier, password }) => {
        const res = await fetch(`${NEXT_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ identifier, password }),
        })

        const data = await res.json()

        if (res.ok) {
            setUser(data.user)
            router.push('/account/dashboard')
        } else {
            setError(data.message)
            setError(null)
        }
    }


    // Logout User
    const logout = async () => {
        const res = await fetch(`${NEXT_URL}/api/logout`,{
            method:'POST'
        })

        if(res.ok){
            setUser(false)
            router.push('/')
        }
    }


    // Check if user is logged in
    const checkUserLoggedIn = async (user) => {
        const res = await fetch(`${NEXT_URL}/api/user`)
        const data = await res.json()

        if (res.ok) {
            setUser(data.user)
        } else {
            setUser(false)
        }
    }

if(user === null){
    return(
        <h4>loading...</h4>
    )
}else{
    return (
        <AuthContext.Provider value={{ register, login, user, logout, error }}>
            {children}
        </AuthContext.Provider>
    )
}

}


export default AuthContext