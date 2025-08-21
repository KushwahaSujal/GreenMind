import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Feed from './pages/Feed'
import CreatePost from './pages/CreatePost'
import { useAuth } from './context/AuthContext'
import { aiRecommendations, ecoTrends } from './utils/recommendations'

export default function App(){
  return (
    <div className="min-h-screen">
      <header className="py-6 border-b bg-white">
        <div className="container-lg flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-[var(--color-primary)]">GreenMind</Link>
          
          <div className="flex items-center gap-4">
            <nav className="flex items-center gap-6">
              <Link to="/" className="text-muted hover:text-slate-900">Home</Link>
              <Link to="/feed" className="text-muted hover:text-slate-900">Feed</Link>
              <Link to="/dashboard" className="text-muted hover:text-slate-900">Dashboard</Link>
              <Link 
                to="/create-post"
                className="text-[var(--color-primary)] hover:text-slate-900 font-medium"
              >
                + Post
              </Link>
            </nav>

            <div className="relative">
              <input 
                type="search"
                placeholder="Search..."
                className="w-64 px-4 py-2 pr-8 rounded-lg border text-sm focus:outline-none focus:border-[var(--color-primary)]"
              />
              <svg className="w-4 h-4 text-gray-400 absolute right-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </header>

      <main className="container-lg mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/feed" element={<Feed/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/create-post" element={<CreatePost/>} />
        </Routes>
      </main>

      <footer className="py-8 text-center text-sm text-muted">
        © GreenMind 2025
      </footer>
    </div>
  )
}

function Home(){
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <div className="card">
        <h1 className="text-3xl font-bold text-primary">Welcome back, {user.name.split(' ')[0]}</h1>
        <p className="mt-3 text-muted">Personalized AI recommendations and current eco trends.</p>
      </div>

      <section className="card">
        <h2 className="text-xl font-semibold">AI Recommendations for you</h2>
        <div className="mt-4 grid gap-3">
          {aiRecommendations.map(r => (
            <div key={r.id} className="p-3 border rounded-md">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium">{r.title}</div>
                  <div className="text-sm text-muted">{r.summary}</div>
                </div>
                <div className="text-xs text-green-700">{r.tags.join(', ')}</div>
              </div>
              <p className="mt-2 text-sm text-slate-700">{r.rationale}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="card">
        <h2 className="text-xl font-semibold">Trending in sustainability</h2>
        <div className="mt-4 space-y-3">
          {ecoTrends.map(t => (
            <div key={t.id} className="p-3 border rounded-md">
              <div className="font-medium">{t.headline}</div>
              <div className="text-sm text-muted mt-1">{t.detail}</div>
              <div className="mt-2 text-xs text-slate-700">Impact: {t.impact}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function Placeholder({name}){
  return (
    <div className="card">
      <h2 className="text-2xl font-semibold">{name}</h2>
      <p className="text-muted mt-2">This page is scaffolded as a placeholder.</p>
    </div>
  )
}
