import React, { createContext, useState, useContext, useCallback } from 'react'
import api from '../services/api'

interface User {
    name: string
    email: string
}

interface AuthState {
    token: string
    user: User
}

interface SignInCredentials {
    email: string
    password: string
    remember: boolean
}

interface AuthContextData {
    user: User
    signIn(credentials: SignInCredentials): Promise<void>
    signOut(): void
    updateUser(user: User): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<AuthState>(() => {
        const token = localStorage.getItem('@Happy:token')
        const user = localStorage.getItem('@Happy:user')

        if(token && user) {
            api.defaults.headers.authorization = `Bearer ${token}`

            return { token, user: JSON.parse(user) }
        }

        return {} as AuthState
    })

    const signIn = useCallback(async ({ email, password, remember }) => {
        const response = await api.post('sessions', {
            email,
            password
        })

        const { token, user } = response.data

        if(remember) {
            localStorage.setItem('@Happy:token', token)
            localStorage.setItem('@Happy:user', JSON.stringify(user))
        }
        
        api.defaults.headers.authorization = `Bearer ${token}`

        setData({ token, user })
    }, [])

    const signOut = useCallback(async () => {
        localStorage.removeItem('@Happy:token')
        localStorage.removeItem('@Happy:user')

        setData({} as AuthState)
    }, [])

    const updateUser = useCallback(async (user: User) => {
        localStorage.setItem('@Happy:user', JSON.stringify(user))

        setData({
            token: data.token,
            user
        })
    }, [setData, data.token])

    return (
        <AuthContext.Provider value={{ user: data.user, signIn, signOut, updateUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(): AuthContextData {
    const context = useContext(AuthContext)

    return context
}