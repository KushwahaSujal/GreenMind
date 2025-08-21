import React, { createContext, useContext } from 'react'
import { demoUser, demoHistory } from '../utils/dummyData'

const AuthContext = createContext()

export function AuthProvider({children}){
  const value = {
    user: demoUser,
    history: demoHistory,
    loggedIn: true,
    signIn: ()=>{},
    signOut: ()=>{}
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(){
  return useContext(AuthContext)
}
