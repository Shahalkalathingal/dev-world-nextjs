import { createContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { NEXT_URL } from '@/config/index'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)

    const router = useRouter()

    // Register User
    const register = async (user) => {
        console.log(user);
    }
    useEffect(() => checkUserLoggedIn(), [])

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
        console.log('Logged Out');
    }


    // Check if user is logged in
    const checkUserLoggedIn = async (user) => {
        const res = await fetch(`${NEXT_URL}/api/user`)
        const data = await res.json()

        if (res.ok) {
            setUser(data.user)
        } else {
            setUser(null)
        }
    }


    return (
        <AuthContext.Provider value={{ register, login, user, logout, error }}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthContext