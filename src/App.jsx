import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Feed from './pages/Feed'
import { useAuth } from './context/AuthContext'
import { aiRecommendations, ecoTrends } from './utils/recommendations'

export default function App(){
  return (
    <div className="min-h-screen">
      <header className="py-6">
        <div className="container-lg flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-[var(--color-primary)]">GreenMind</Link>
          <nav className="space-x-6 hidden md:block">
            <Link to="/" className="text-muted">Home</Link>
            <Link to="/feed" className="text-muted">Feed</Link>
            <Link to="/dashboard" className="text-muted">Dashboard</Link>
          </nav>
          <div className="flex items-center gap-3">
            <input placeholder="Search trends, posts..." className="px-3 py-2 rounded-lg border text-sm hidden lg:inline-block" />
            <Link to="/dashboard" className="px-3 py-2 rounded-lg bg-white border text-sm text-muted">Profile</Link>
          </div>
        </div>
      </header>

      <main className="container-lg mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/feed" element={<Feed/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
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
        <div className="mt-6">
          <Link to="/feed" className="btn-primary mr-3">Go to Feed</Link>
          <Link to="/dashboard" className="btn-primary/80">Open Dashboard</Link>
        </div>
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
