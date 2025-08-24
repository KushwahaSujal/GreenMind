import React, { createContext, useContext, useEffect, useState } from 'react'
import { demoUser, demoHistory } from '../utils/dummyData'

const AuthContext = createContext()

export function AuthProvider({children}){
  const [user, setUser] = useState(() => {
    try{
      const saved = localStorage.getItem('gm_user')
      return saved ? JSON.parse(saved) : demoUser
    }catch{
      return demoUser
    }
  })

  // Persist user
  useEffect(() => {
    try{
      localStorage.setItem('gm_user', JSON.stringify(user))
    }catch{
      // ignore
    }
  }, [user])

  const loggedIn = !!user

  const signIn = async ({ email, password }) => {
    // Demo implementation: accept any email/password and create a simple profile if needed
    setUser(prev => {
      if (prev && prev.email === email) return prev
      const nameFromEmail = email?.split('@')[0] || 'Green User'
      return {
        id: 'user_local',
        name: nameFromEmail.replace(/\./g,' ').replace(/\b\w/g, c => c.toUpperCase()),
        email,
        avatarUrl: prev?.avatarUrl || 'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=400&auto=format&fit=crop',
        bio: prev?.bio || 'Aspiring eco-warrior 🌿',
        streak: prev?.streak ?? 0,
        impactPoints: prev?.impactPoints ?? 0,
        badges: prev?.badges ?? []
      }
    })
  }

  const signUp = async ({ name, email, password, bio, avatarDataUrl }) => {
    // Demo implementation: create a new user profile
    setUser({
      id: 'user_local',
      name,
      email,
      avatarUrl: avatarDataUrl || 'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=400&auto=format&fit=crop',
      bio: bio || 'Excited to start my sustainable journey!',
      streak: 0,
      impactPoints: 0,
      badges: []
    })
  }

  const updateProfile = async (updates) => {
    setUser(prev => ({ ...prev, ...updates }))
  }

  const signOut = async () => {
    // For demo, keep the demo user rather than null to avoid breaking pages
    setUser(demoUser)
  }

  const value = {
    user,
    history: demoHistory,
    loggedIn,
    signIn,
    signUp,
    updateProfile,
    signOut
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(){
  return useContext(AuthContext)
}
