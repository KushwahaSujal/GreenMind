import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PostCard from '../components/PostCard'
import { demoPosts as posts } from '../utils/dummyPosts'

export default function Feed() {
  const [activeFilter, setActiveFilter] = useState('all')
  
  const filteredPosts = posts.filter(post => {
    if (activeFilter === 'all') return true
    return post.tags.includes(activeFilter)
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container-lg mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
              Community Feed
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Discover inspiring eco-friendly stories, tips, and achievements from our growing community
            </p>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
      </div>

  <div className="container-lg mx-auto px-4 py-8">
        {/* Filter Tabs */}
    <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg border border-white/20 dark:border-slate-700">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">Explore Stories</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300">Filter by topics that inspire you</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {['all', 'urbangardening', 'zerowaste', 'sustainability', 'community'].map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                    activeFilter === filter
          ? 'bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white shadow-lg'
          : 'bg-white/50 dark:bg-slate-800/60 text-gray-700 dark:text-gray-200 hover:bg-white/80 dark:hover:bg-slate-700/70 border border-gray-200 dark:border-slate-700'
                  }`}
                >
                  {filter === 'all' ? 'All Posts' : `#${filter}`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid gap-8 max-w-4xl mx-auto">
          {filteredPosts.map((post, index) => (
            <div 
              key={post.id}
              className="group transform transition-all duration-500 hover:scale-[1.02] animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-white/80 dark:bg-slate-900/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/30 dark:border-slate-700 overflow-hidden hover:shadow-2xl transition-all duration-300">
                <PostCard post={post} />
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">No posts found</h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
              Try adjusting your filter or check back later for new content from the community.
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Share Your Eco Journey</h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Inspire others with your sustainable living tips, zero-waste achievements, or environmental actions.
            </p>
            <Link
              to="/create-post"
              className="inline-block bg-white text-[var(--color-primary)] px-8 py-3 rounded-full font-semibold hover:bg-white/90 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Create Post
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
