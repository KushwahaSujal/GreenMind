import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function SignUp(){
  const { signUp } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [bio, setBio] = useState('')
  const [avatarPreview, setAvatarPreview] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setAvatarPreview(reader.result)
    reader.readAsDataURL(file)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await signUp({ name, email, password, bio, avatarDataUrl: avatarPreview })
    navigate('/dashboard')
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/30 dark:border-slate-700">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Create your account</h1>
        <p className="text-sm text-muted mb-6">Join the community and start your sustainable journey</p>

        <form onSubmit={onSubmit} className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <label className="text-sm text-slate-700">Full name</label>
              <input value={name} onChange={e=>setName(e.target.value)} required
                className="mt-1 w-full border dark:border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"/>
            </div>
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
            <div>
              <label className="text-sm text-slate-700">Short bio</label>
              <textarea value={bio} onChange={e=>setBio(e.target.value)} rows={3}
                className="mt-1 w-full border dark:border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"/>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 border dark:border-slate-700">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="avatar preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">No image</div>
                )}
              </div>
              <label className="px-3 py-2 rounded-lg border dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
                <input type="file" accept="image/*" onChange={onFile} className="hidden" />
                Upload avatar
              </label>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-slate-700">City</label>
                <input placeholder="Optional" className="mt-1 w-full border dark:border-slate-700 rounded-lg px-4 py-2 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"/>
              </div>
              <div>
                <label className="text-sm text-slate-700">Country</label>
                <input placeholder="Optional" className="mt-1 w-full border dark:border-slate-700 rounded-lg px-4 py-2 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"/>
              </div>
              <div>
                <label className="text-sm text-slate-700">Interests</label>
                <input placeholder="e.g., gardening, zero waste" className="mt-1 w-full border dark:border-slate-700 rounded-lg px-4 py-2 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"/>
              </div>
              <div>
                <label className="text-sm text-slate-700">Website</label>
                <input placeholder="Optional" type="url" className="mt-1 w-full border dark:border-slate-700 rounded-lg px-4 py-2 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"/>
              </div>
            </div>

            <button disabled={loading} type="submit" className="w-full px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white hover:opacity-90">
              {loading ? 'Creating your account…' : 'Create account'}
            </button>

            <p className="text-sm text-center text-muted">
              Already have an account? <Link to="/signin" className="text-[var(--color-primary)] hover:underline">Sign in</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
