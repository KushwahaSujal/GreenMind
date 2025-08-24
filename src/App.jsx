import React, { useEffect, useState } from 'react'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Feed from './pages/Feed'
import CreatePost from './pages/CreatePost'
import { useAuth } from './context/AuthContext'
import { aiRecommendations, ecoTrends } from './utils/recommendations'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

export default function App(){
  const [isDark, setIsDark] = useState(() => {
    try {
      const saved = localStorage.getItem('gm_theme')
      if (saved) return saved === 'dark'
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    } catch { return false }
  })

  useEffect(() => {
    try { localStorage.setItem('gm_theme', isDark ? 'dark' : 'light') } catch {}
    const root = document.documentElement
    if (isDark) root.classList.add('dark')
    else root.classList.remove('dark')
  }, [isDark])

  const toggleTheme = () => setIsDark(v => !v)
  const headerTheme = isDark ? 'bg-gray-900/95 border-gray-800' : 'bg-white/95 border-gray-200/50'
  const searchInputClass = isDark
    ? 'w-48 pl-10 pr-4 py-2 rounded-full border border-gray-700 bg-gray-800/50 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)] focus:bg-gray-900 placeholder:text-gray-400'
    : 'w-48 pl-10 pr-4 py-2 rounded-full border border-gray-200 bg-gray-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] focus:bg-white transition-all duration-300 placeholder:text-gray-400'

  return (
    <div className="min-h-screen">
      <header className={`sticky top-0 z-40 ${headerTheme} backdrop-blur-lg border-b shadow-sm`}>
        <div className="container-lg mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" aria-label="GreenMind Home" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shadow-lg flex items-center justify-center transition-all duration-300 group-hover:shadow-xl group-hover:scale-105">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {/* Leaf outline (nature) */}
                    <path d="M12 3c-4.2 2.1-6.5 5.8-6.5 9.2 0 3.6 2.6 6.9 6.5 8.9 3.9-2 6.5-5.3 6.5-8.9 0-3.4-2.2-7.1-6.5-9.2z" />
                    {/* Midrib */}
                    <path d="M12 5v14" />
                    {/* Veins (mind connections) */}
                    <path d="M12 9c-1.6.6-2.8 1.5-3.8 2.7" />
                    <path d="M12 9c1.6.6 2.8 1.5 3.8 2.7" />
                    <path d="M12 12.5c-1.2.5-2.2 1.1-3 2" />
                    <path d="M12 12.5c1.2.5 2.2 1.1 3 2" />
                    {/* Neuron dots */}
                    <circle cx="9" cy="12" r="0.6" fill="currentColor" />
                    <circle cx="15" cy="12" r="0.6" fill="currentColor" />
                    <circle cx="10" cy="14.5" r="0.6" fill="currentColor" />
                    <circle cx="14" cy="14.5" r="0.6" fill="currentColor" />
                  </svg>
                </div>
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-white/30"></span>
              </div>
              <div className="leading-tight">
                <span className="text-[20px] md:text-[22px] font-extrabold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent tracking-tight">
                  GreenMind
                </span>
                <span className="hidden md:block text-[10px] text-gray-500 tracking-widest uppercase">Grow • Act • Inspire</span>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              <NavLink to="/" label="Home" isDark={isDark} />
              <NavLink to="/feed" label="Feed" isDark={isDark} />
              <NavLink to="/dashboard" label="Dashboard" isDark={isDark} />
              <NavLink to="/create-post" label="+ Post" primary isDark={isDark} />
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* Search Bar - Hidden on mobile */}
              <div className="hidden lg:flex relative">
                <input 
                  type="search"
                  placeholder="Search..."
                  className={searchInputClass}
                />
                <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Dark mode toggle */}
              <button
                onClick={toggleTheme}
                className={`hidden sm:inline-flex items-center justify-center p-2 rounded-full border transition-colors ${isDark ? 'border-gray-700 text-gray-300 hover:bg-gray-800' : 'border-gray-200 text-gray-600 hover:bg-gray-100'}`}
                aria-label="Toggle dark mode"
                title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDark ? (
                  // Sun icon
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364l-1.414-1.414M7.05 7.05 5.636 5.636m12.728 0-1.414 1.414M7.05 16.95l-1.414 1.414" /><circle cx="12" cy="12" r="4" /></svg>
                ) : (
                  // Moon icon
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
                )}
              </button>

              {/* Create Account Button (smaller) */}
              <Link 
                to="/signup"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white text-xs font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create account
              </Link>

              {/* Auth Actions */}
              <AuthActions isDark={isDark} />

              {/* Mobile Menu Button */}
              <MobileMenuButton isDark={isDark} />
            </div>
          </div>
        </div>
      </header>

      <main className="container-lg mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/feed" element={<Feed/>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
          <Route path="/create-post" element={<ProtectedRoute><CreatePost/></ProtectedRoute>} />
          <Route path="/signin" element={<SignIn/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/reset" element={<Reset/>} />
          <Route path="*" element={<Navigate to="/" replace />} />
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
  <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 -mx-4 -my-8">
      {/* Hero Section */}
  <div className="relative overflow-hidden bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container-lg mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 animate-fade-in">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Welcome back!</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up">
              Hello, {user.name.split(' ')[0]} 👋
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up" style={{animationDelay: '200ms'}}>
              Your personalized dashboard for sustainable living, AI-powered recommendations, and the latest eco trends to help you make a positive impact.
            </p>
            <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up" style={{animationDelay: '400ms'}}>
              <Link
                to="/dashboard"
                className="bg-white text-[var(--color-primary)] px-8 py-3 rounded-full font-semibold hover:bg-white/90 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                View Dashboard
              </Link>
              <Link
                to="/feed"
                className="bg-white/20 backdrop-blur-sm text-white border border-white/30 px-8 py-3 rounded-full font-semibold hover:bg-white/30 transform hover:scale-105 transition-all duration-300"
              >
                Explore Feed
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-36 translate-x-36"></div>
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/5 rounded-full translate-y-28 -translate-x-28"></div>
      </div>

      <div className="container-lg mx-auto px-4 py-12">
        {/* AI Recommendations Section */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">🤖 AI Recommendations</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Personalized suggestions powered by artificial intelligence to boost your sustainable lifestyle
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiRecommendations.map((r, index) => (
              <div 
                key={r.id}
                className="group bg-white/80 dark:bg-slate-900/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30 dark:border-slate-700 hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-fade-in-up"
                style={{animationDelay: `${index * 150}ms`}}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg">
                    🎯
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {r.tags.map(tag => (
                      <span key={tag} className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                  {r.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 leading-relaxed">
                  {r.summary}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 italic border-l-3 border-[var(--color-primary)] pl-3">
                  {r.rationale}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Trending Section */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">📈 Trending in Sustainability</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Stay updated with the latest environmental trends and impactful initiatives making waves globally
            </p>
          </div>

          <div className="space-y-6">
            {ecoTrends.map((t, index) => (
              <div 
                key={t.id}
                className="group bg-white/80 dark:bg-slate-900/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30 dark:border-slate-700 hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                style={{animationDelay: `${index * 200}ms`}}
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg flex-shrink-0">
                    🌍
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                      {t.headline}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                      {t.detail}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[var(--color-primary)]">Impact:</span>
                      <span className="text-sm text-gray-600 dark:text-gray-300 bg-green-50 dark:bg-emerald-900/30 px-3 py-1 rounded-full border border-green-200 dark:border-emerald-800/50">
                        {t.impact}
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <button className="w-10 h-10 bg-gray-100 hover:bg-[var(--color-primary)] hover:text-white rounded-full flex items-center justify-center transition-all duration-300 group">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Make an Impact?</h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Join thousands of eco-warriors making a difference. Track your progress, share your journey, and inspire others.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/create-post"
                className="bg-white text-[var(--color-primary)] px-8 py-3 rounded-full font-semibold hover:bg-white/90 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Share Your Story
              </Link>
              <Link
                to="/dashboard"
                className="bg-white/20 backdrop-blur-sm text-white border border-white/30 px-8 py-3 rounded-full font-semibold hover:bg-white/30 transform hover:scale-105 transition-all duration-300"
              >
                Track Progress
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AuthActions({ isDark = false }){
  const { loggedIn, user } = useAuth()
  if (!loggedIn) {
    return (
      <Link 
        to="/signin" 
        className={`flex items-center gap-2 px-3 py-2 rounded-full border transition-all duration-300 text-sm font-medium ${isDark ? 'border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-gray-600' : 'border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'}`}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
        </svg>
        Sign in
      </Link>
    )
  }
  return (
    <Link 
      to="/dashboard?edit=1" 
      className="flex items-center group relative"
      aria-label="Edit profile"
    >
      <div className="relative">
        <img 
          src={user.avatarUrl} 
          alt="Profile" 
          className="w-9 h-9 rounded-full object-cover ring-2 ring-white shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300" 
        />
        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
      </div>
      <div className={`absolute -bottom-10 right-0 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap ${isDark ? 'bg-gray-700' : 'bg-gray-800'}`}>
        Edit profile
      </div>
    </Link>
  )
}

function NavLink({ to, label, primary = false, isDark = false }) {
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
        primary
          ? 'text-[var(--color-primary)] bg-[var(--color-primary)]/10 hover:bg-[var(--color-primary)]/20'
          : isDark
            ? 'text-gray-300 hover:text-white hover:bg-gray-800'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
      }`}
    >
      {label}
    </Link>
  )
}

function MobileMenuButton({ isDark = false }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="md:hidden relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-lg transition-colors ${isDark ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'}`}
        aria-label="Menu"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>
      {isOpen && (
        <div className={`absolute right-0 top-12 w-48 rounded-xl shadow-lg border py-2 z-50 ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
          <Link to="/" className={`block px-4 py-2 text-sm ${isDark ? 'text-gray-200 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-50'}`} onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/feed" className={`block px-4 py-2 text-sm ${isDark ? 'text-gray-200 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-50'}`} onClick={() => setIsOpen(false)}>Feed</Link>
          <Link to="/dashboard" className={`block px-4 py-2 text-sm ${isDark ? 'text-gray-200 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-50'}`} onClick={() => setIsOpen(false)}>Dashboard</Link>
          <Link to="/create-post" className={`block px-4 py-2 text-sm font-medium ${isDark ? 'text-[var(--color-primary)] hover:bg-gray-800' : 'text-[var(--color-primary)] hover:bg-gray-50'}`} onClick={() => setIsOpen(false)}>+ Post</Link>
          <hr className={`my-2 ${isDark ? 'border-gray-800' : ''}`} />
          <Link to="/signup" className={`block px-4 py-2 text-sm sm:hidden ${isDark ? 'text-gray-200 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-50'}`} onClick={() => setIsOpen(false)}>Create account</Link>
        </div>
      )}
    </div>
  )
}

function ProtectedRoute({ children }){
  const { loggedIn } = useAuth()
  if (!loggedIn) return <Navigate to="/signin" replace />
  return children
}

function Placeholder({name}){
  return (
    <div className="card">
      <h2 className="text-2xl font-semibold">{name}</h2>
      <p className="text-muted mt-2">This page is scaffolded as a placeholder.</p>
    </div>
  )
}

function Reset(){
  useEffect(() => {
    try { localStorage.removeItem('gm_user') } catch {}
    // Full page reload to ensure clean state
    window.location.replace('/')
  }, [])
  return null
}
