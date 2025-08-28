import React, { useEffect, useState } from 'react'
import { fadeInOnScroll, parallaxHero, floatingParticles } from './effects';
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Feed from './pages/Feed'
import CreatePost from './pages/CreatePost'
import { useAuth } from './context/AuthContext'
import { aiRecommendations, ecoTrends } from './utils/recommendations'
import ecoDrop from './assets/eco-drop.svg';
import ecoSolar from './assets/eco-solar.svg';
import ecoTools from './assets/eco-tools.svg';
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

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    try { localStorage.setItem('gm_theme', isDark ? 'dark' : 'light') } catch {}
    const root = document.documentElement
    if (isDark) root.classList.add('dark')
    else root.classList.remove('dark')
    // Effects
    fadeInOnScroll();
    parallaxHero();
  // floatingParticles(); // Disabled: remove moving bubbles
  }, [isDark])

  const toggleTheme = () => setIsDark(v => !v)
  const toggleMobileMenu = () => setIsMobileMenuOpen(v => !v)
  
  const headerTheme = isDark
    ? 'bg-gray-900/95 border-b border-gray-700/50'
    : 'bg-white/95 border-b border-gray-200/50'
    
  const searchInputClass = isDark
    ? 'w-full md:w-48 pl-10 pr-4 py-2.5 rounded-xl border border-gray-600 bg-gray-800 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500 placeholder:text-gray-400 transition-all duration-300'
    : 'w-full md:w-48 pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 transition-all duration-300 placeholder:text-gray-400'

  return (
    <div className="min-h-screen">
      <header className={`sticky top-0 z-40 ${headerTheme} backdrop-blur-lg shadow-sm`}>
        <div className="container-lg">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" aria-label="GreenMind Home" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-green-600 shadow-lg flex items-center justify-center transition-all duration-300 group-hover:shadow-xl group-hover:scale-105">
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
                <span className="text-[20px] md:text-[22px] font-extrabold text-green-600 tracking-tight">
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
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-600 text-white text-xs font-semibold hover:bg-green-700 hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create account
              </Link>

              {/* Auth Actions */}

              {/* Mobile Menu Button */}
              <MobileMenuButton isDark={isDark} />
            </div>
          </div>
        </div>
      </header>

  <main className="container-lg py-8">
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

function Home() {
  const { user } = useAuth();
  return (
  <div className="min-h-screen bg-white dark:bg-gray-900 fade-in-on-scroll">
      {/* Hero Section */}
      <div className="hero-bg fade-in-on-scroll">
        <div className="relative z-10 w-full flex flex-col items-center justify-center py-12 md:py-20 px-4">
          <div className="inline-flex items-center gap-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-4 py-2 mb-6 animate-fade-in shadow-lg">
            <svg className="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2C7 7 2 12 12 22C22 12 17 7 12 2Z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1"/>
            </svg>
            <span className="text-sm font-medium text-green-700 dark:text-green-400">Welcome back!</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-gray-900 dark:text-white font-sans text-center leading-tight">
            Hello, {user?.name?.split(' ')[0] || 'User'} 👋
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8 font-sans text-center px-4">
            Your personalized dashboard for sustainable living, AI-powered recommendations, and the latest eco trends to help you make a positive impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up px-4 w-full sm:w-auto">
            <Link
              to="/dashboard"
              className="w-full sm:w-auto btn-primary flex items-center justify-center gap-3 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M8 12l2 2 4-4"/>
              </svg>
              View Dashboard
            </Link>
            <Link
              to="/feed"
              className="w-full sm:w-auto bg-gray-600 hover:bg-gray-700 text-white flex items-center justify-center gap-3 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="7" width="18" height="13" rx="2"/>
                <path d="M8 10h8M8 14h5"/>
              </svg>
              Explore Feed
            </Link>
          </div>
        </div>
      </div>
      
  <div className="container-lg py-8 md:py-12">
        {/* AI Recommendations Section */}
        <section className="mb-12 md:mb-16 fade-in-on-scroll">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-blue-600 dark:text-blue-400 drop-shadow-lg">
              🤖 AI Recommendations for You
            </h2>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 max-w-3xl mx-auto leading-relaxed px-4">
              Personalized, actionable tips powered by AI to help you live more sustainably every day
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {aiRecommendations.map((rec, idx) => (
              <div
                key={rec.id}
                className="relative group card border-l-8 border-blue-300 dark:border-blue-500 hover:scale-[1.02] md:hover:scale-[1.045] hover:shadow-2xl transition-all duration-300 fade-in-on-scroll bg-white dark:bg-gray-900/80 backdrop-blur-sm"
                style={{ animationDelay: `${idx * 180}ms` }}
              >
                {/* Indicator bar */}
                <div className="absolute left-0 top-0 h-full w-2 rounded-bl-3xl rounded-tl-3xl bg-blue-500 dark:bg-blue-400"></div>
                <div className="flex flex-col gap-3 pl-6 pr-4 py-4 md:py-6">
                  <h3 className="text-xl md:text-2xl font-bold text-blue-700 dark:text-blue-300 mb-2 group-hover:text-green-600 dark:group-hover:text-green-300 transition-colors leading-tight">
                    {rec.title}
                  </h3>
                  <div className="text-base md:text-lg font-medium text-gray-700 dark:text-gray-200 mb-2 leading-relaxed">
                    {rec.summary}
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base mb-3 italic leading-relaxed">
                    {rec.rationale}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {rec.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-full text-xs md:text-sm font-semibold bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 shadow-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trending in Sustainability Section */}
        <section className="mb-12 md:mb-16 fade-in-on-scroll">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-green-600 dark:text-green-400 drop-shadow-lg">
              🌈 Trending in Sustainability
            </h2>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 max-w-3xl mx-auto leading-relaxed px-4">
              Stay updated with the latest environmental trends and impactful initiatives making waves globally
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {ecoTrends.map((t, index) => {
              const trendColors = [
                'bg-green-500',
                'bg-yellow-500',
                'bg-lime-500',
              ];
              const color = trendColors[index % trendColors.length];
              return (
                <div
                  key={t.id}
                  className="relative group card border-l-8 border-green-300 dark:border-teal-300 hover:scale-[1.02] md:hover:scale-[1.045] hover:shadow-2xl transition-all duration-300 fade-in-on-scroll" 
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {/* Indicator bar */}
                  <div className={`absolute left-0 top-0 h-full w-2 rounded-bl-3xl rounded-tl-3xl ${color}`}></div>
                  <div className="flex flex-col gap-3 pl-6 pr-4 py-4 md:py-6">
                    <h3 className="text-2xl md:text-3xl font-extrabold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-green-600 dark:group-hover:text-green-300 transition-colors leading-tight">
                      {t.impact}
                    </h3>
                    <div className="text-lg md:text-xl font-semibold text-gray-700 dark:text-gray-200 mb-3 leading-relaxed">
                      {t.headline}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base md:text-lg">
                      {t.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

function NavLink({ to, label, primary = false, isDark = false }) {
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 relative group ${
        primary
          ? 'text-[var(--color-primary)] bg-[var(--color-primary)]/10 hover:bg-[var(--color-primary)]/20'
          : isDark
            ? 'text-gray-300 hover:text-white hover:bg-gray-800'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
      }`}
    >
      <span>{label}</span>
      <span className="absolute left-1/2 -bottom-1 w-0 group-hover:w-4/5 h-0.5 bg-green-500 rounded-full transition-all duration-300 -translate-x-1/2"></span>
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
