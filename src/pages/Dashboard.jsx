import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Dashboard(){
  const { user, history } = useAuth()
  const [activeFilter, setActiveFilter] = useState('all')

  // Calculate stats
  const totalImpact = history.reduce((sum, h) => sum + h.impact, 0)
  const monthlyImpact = history
    .filter(h => new Date(h.date).getMonth() === new Date().getMonth())
    .reduce((sum, h) => sum + h.impact, 0)

  // Sort history by date
  const sortedHistory = [...history].sort((a, b) => new Date(b.date) - new Date(a.date))

  // Filter posts for the grid layout
  const displayHistory = activeFilter === 'posts' 
    ? sortedHistory.filter(h => h.type === 'post')
    : sortedHistory.filter(h => activeFilter === 'all' || h.type === activeFilter)

  return (
    <div className="space-y-6 pb-8">
      {/* Profile Header */}
      <div className="card bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] text-white">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <img 
              src={user.avatarUrl} 
              alt="avatar" 
              className="w-28 h-28 rounded-full border-4 border-white/30 object-cover shadow-lg" 
            />
            <div className="absolute -bottom-2 right-0 bg-white rounded-full p-2 shadow-lg">
              <svg className="w-5 h-5 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-white/80">{user.email}</p>
            <p className="mt-2 text-sm text-white/90 max-w-md">{user.bio}</p>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-full">
                <div className="text-xs text-white/80">Daily Streak</div>
                <div className="font-bold text-lg flex items-center gap-1">
                  <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.06l1.06-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM5.404 6.464a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 10-1.061 1.06l1.06 1.06z"/>
                  </svg>
                  {user.streak}d
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-full">
                <div className="text-xs text-white/80">Total Impact</div>
                <div className="font-bold text-lg flex items-center gap-1">
                  <svg className="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {user.impactPoints}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-full">
                <div className="text-xs text-white/80">This Month</div>
                <div className="font-bold text-lg">+{monthlyImpact}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Badges Section */}
      <section className="card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold">Achievement Badges</h2>
            <p className="text-sm text-muted mt-1">Milestones in your eco-journey</p>
          </div>
          <button className="text-sm text-[var(--color-primary)] hover:underline">View All</button>
        </div>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {user.badges.map((b, i) => (
            <div key={i} className="group relative overflow-hidden rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <img 
                src={b.icon} 
                alt={b.title}
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1580407196238-dac33f57c410?w=400&auto=format&fit=crop&q=60';
                }}
                className="w-full aspect-square rounded-xl object-cover transform group-hover:scale-110 transition-transform duration-500" 
              />
              <div className="absolute top-3 right-3">
                <div className={`px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                  b.level === 'Gold' ? 'bg-yellow-500/90 text-white' :
                  b.level === 'Silver' ? 'bg-slate-300/90 text-slate-900' :
                  'bg-orange-600/90 text-white'
                }`}>
                  {b.level}
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/90 to-transparent">
                <div className="font-semibold text-sm">{b.title}</div>
                <div className="text-xs text-white/90 mt-1">{b.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        {/* Activity Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              label: 'Total Activities',
              value: history.length,
              icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              )
            },
            { 
              label: 'Posts',
              value: history.filter(h => h.type === 'post').length,
              icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              )
            },
            { 
              label: 'Eco Actions',
              value: history.filter(h => h.type === 'action').length,
              icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4" />
                </svg>
              )
            },
            { 
              label: 'Monthly Impact',
              value: monthlyImpact,
              icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19l3 3V12m0 0l3-3m-3 3l-3-3m12 0l-3-3m0 0l-3 3m3-3v10" />
                </svg>
              )
            },
          ].map((stat, i) => (
            <div key={i} className="card bg-white hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-5 p-6">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary)]/80 flex items-center justify-center w-16 h-16">
                  <div className="text-white">
                    {stat.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-slate-500">{stat.label}</div>
                  <div className="text-3xl font-bold text-slate-900 mt-1 tabular-nums">{stat.value}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Activity Feed */}
        <div className="card">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-semibold">Activity Feed</h2>
              <p className="text-sm text-muted mt-1">Your eco-journey timeline</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 text-sm rounded-full transition-colors ${
                  activeFilter === 'all' 
                    ? 'bg-[var(--color-primary)] text-white' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                All
              </button>
              <button 
                onClick={() => setActiveFilter('posts')}
                className={`px-4 py-2 text-sm rounded-full transition-colors ${
                  activeFilter === 'posts' 
                    ? 'bg-[var(--color-primary)] text-white' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Recent Posts
              </button>
            </div>
          </div>

          <div className={`grid gap-4 ${
            activeFilter === 'posts' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1 md:grid-cols-2'
          }`}>
            {displayHistory.map((h, idx) => {
                const isImagePost = h.image && h.type === 'post';
                const isActionWithImage = h.image && h.type === 'action';
                const heightClass = isImagePost 
                  ? 'row-span-2' 
                  : isActionWithImage 
                    ? 'row-span-1'
                    : 'row-span-1';

                return (
                  <div 
                    key={idx} 
                    className={`group relative bg-white border rounded-xl overflow-hidden hover:border-[var(--color-primary)] hover:shadow-lg transition-all duration-300 ${heightClass}`}
                  >
                    <div className="absolute top-3 right-3 z-10 flex gap-2">
                      {h.type === 'post' && (
                        <div className="bg-black/50 backdrop-blur-sm px-2 py-1 rounded-lg">
                          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          </svg>
                        </div>
                      )}
                      <div className="px-2 py-1 rounded-lg bg-[var(--color-accent)]/90 backdrop-blur-sm text-white text-xs font-medium">
                        +{h.impact}
                      </div>
                    </div>

                    {h.image ? (
                      <>
                        <div className={`relative ${isImagePost ? 'h-[300px]' : 'h-48'} overflow-hidden bg-slate-100`}>
                          <img 
                            src={h.image} 
                            alt={h.title}
                            loading="lazy"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://images.unsplash.com/photo-1580407196238-dac33f57c410?w=400&auto=format&fit=crop&q=60';
                            }}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                            <h3 className="font-medium text-lg">{h.title}</h3>
                            <p className="mt-1 text-sm text-white/90 line-clamp-2">{h.description}</p>
                            <div className="mt-2 flex items-center gap-2 text-xs">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {new Date(h.date).toLocaleDateString(undefined, { 
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </div>
                          </div>
                        </div>
                        {h.type === 'action' && (
                          <div className="absolute top-3 left-3 flex items-center gap-2 px-2 py-1 rounded-lg bg-[var(--color-primary)]/90 backdrop-blur-sm text-white text-xs font-medium">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Verified
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="font-medium text-slate-900 group-hover:text-[var(--color-primary)] transition-colors line-clamp-1">
                              {h.title}
                            </h3>
                            <div className="mt-1 flex items-center gap-2 text-xs text-muted">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {new Date(h.date).toLocaleDateString(undefined, { 
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </div>
                          </div>
                        </div>
                        <p className="mt-2 text-sm text-slate-600 line-clamp-3">{h.description}</p>
                        {h.type === 'action' && (
                          <div className="mt-3 flex items-center gap-2 text-xs font-medium text-[var(--color-primary)]">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Verified eco-action
                          </div>
                        )}
                      </div>
                    )}
                    <div className="absolute inset-0 border-2 border-[var(--color-primary)] opacity-0 group-hover:opacity-100 rounded-xl transition-opacity pointer-events-none" />
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </div>
  )
}
