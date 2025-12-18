import React, { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import { auth } from '../FireBase/firebase.config'

const AuthProvider = ({children}) => {
   const [user,setUser] = useState(null)
  const [loading,setLoading] = useState(true)
  const registerUser=(email,password)=>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth,email,password)
  }
  const signInUser=(email,password)=>{
        setLoading(true)
    return signInWithEmailAndPassword(auth,email,password)
  }
  // const signInGoogle=()=>{
  //       setLoading(true)
  //   return signInWithPopup(auth,googleProvider)
  // }
  const logOut = ()=>{
    setLoading(true)
    return signOut(auth)
  }
  const updateUserProfile=(profile)=>{
    return updateProfile(auth.currentUser, profile)
  }
  // observe user
  useEffect(()=>{
    const unSubscribe = onAuthStateChanged(auth,(currentUser)=>{
      setUser(currentUser)
      setLoading(false)
    })
    return ()=>{
      unSubscribe()
    }
  },[])

  const authInfo = {
    registerUser,
    signInUser,
    logOut,
    updateUserProfile,
    user,
    loading
  }
  return (
    <AuthContext value={authInfo}>
      {children}
    </AuthContext>
  )
}

export default AuthProvider