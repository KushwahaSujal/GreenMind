import React, { createContext, useContext, useState } from 'react'

const UIContext = createContext()

export function UIProvider({children}){
  const [modal, setModal] = useState(null)
  return <UIContext.Provider value={{modal, setModal}}>{children}</UIContext.Provider>
}

export function useUI(){
  return useContext(UIContext)
}
