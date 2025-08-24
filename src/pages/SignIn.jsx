import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function SignIn(){
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try{
      await signIn({ email, password })
      navigate('/dashboard')
    }catch(err){
      setError('Invalid credentials')
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-md bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/30 dark:border-slate-700">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Welcome back</h1>
        <p className="text-sm text-muted mb-6">Sign in to continue your eco journey</p>

        {error && <div className="mb-4 text-sm text-red-600">{error}</div>}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-slate-700">Email</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required
              className="mt-1 w-full border dark:border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"/>
          </div>
          <div>
            <label className="text-sm text-slate-700">Password</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required
              className="mt-1 w-full border dark:border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"/>
          </div>
          <button disabled={loading} type="submit" className="w-full px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white hover:opacity-90">
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-muted">
          New here? <Link to="/signup" className="text-[var(--color-primary)] hover:underline">Create an account</Link>
        </p>
      </div>
    </div>
  )
}
