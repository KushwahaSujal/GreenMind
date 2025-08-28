import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { LikeIcon, CommentIcon, SaveIcon, ShareIcon } from './Icons'

export default function PostCard({ post, variant }){
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [comment, setComment] = useState('')
  const [showComments, setShowComments] = useState(false)
  const { user } = useAuth()

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
  }

  const handleShare = () => {
    alert('Share feature coming soon!')
  }

  const handleComment = (e) => {
    e.preventDefault()
    if (!comment.trim()) return
    alert('Comment feature coming soon!')
    setComment('')
  }

  const formatDate = (date) => {
    const d = new Date(date)
    const now = new Date()
    const diff = (now - d) / 1000
    
    if (diff < 60) return 'just now'
    if (diff < 3600) return `${Math.floor(diff/60)}m ago`
    if (diff < 86400) return `${Math.floor(diff/3600)}h ago`
    return `${Math.floor(diff/86400)}d ago`
  }

  const actionsRowClass = variant === 'preview'
    ? 'grid grid-cols-4 items-center gap-2 py-3 border-t border-gray-100 dark:border-slate-800'
    : 'flex items-center justify-between py-3 border-t border-gray-100 dark:border-slate-800'

  const btnBase = 'flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:bg-gray-50 dark:hover:bg-slate-800'
  const btnCenter = variant === 'preview' ? 'justify-center w-full' : ''

  return (
  <article className="p-6 text-gray-900 dark:text-gray-100">
      {/* Author header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <img 
            src={post.author.avatar} 
            alt={post.author.name}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-white dark:ring-slate-900 shadow-lg"
          />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-900"></div>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">{post.author.name}</h3>
          <div className="flex items-center gap-2">
            <time className="text-sm text-gray-500 dark:text-gray-400">{formatDate(post.date)}</time>
            <span className="w-1 h-1 bg-gray-300 dark:bg-slate-700 rounded-full"></span>
            <span className="text-sm text-[var(--color-primary)] font-medium">Eco Contributor</span>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors">
          <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="mb-6">
        <p className="text-gray-800 dark:text-gray-200 text-lg leading-relaxed mb-4">{post.content}</p>
        {post.image && (
          <div className="relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-slate-900/60 group">
            <img 
              src={post.image} 
              alt="Post content"
              className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {post.tags.map(tag => (
          <span 
            key={tag} 
            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/30 transition-all duration-300 cursor-pointer"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Interaction stats */}
      <div className="flex items-center justify-between py-4 border-t border-gray-100 dark:border-slate-800">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1">
            <div className="flex -space-x-1">
              <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">{post.likes + (isLiked ? 1 : 0)} people liked this</span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <span>{post.comments.length} comments</span>
          <span>{post.shares} shares</span>
        </div>
      </div>

    {/* Action buttons */}
    <div className={actionsRowClass}>
        <button 
          onClick={handleLike}
      className={`${btnBase} ${btnCenter} ${
            isLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
          }`}
        >
          <LikeIcon filled={isLiked} />
          <span>Like</span>
        </button>
        <button 
          onClick={() => setShowComments(!showComments)}
      className={`${btnBase} ${btnCenter} text-gray-600 hover:text-[var(--color-primary)]`}
        >
          <CommentIcon />
          <span>Comment</span>
        </button>
        <button 
          onClick={handleSave}
      className={`${btnBase} ${btnCenter} ${
            isSaved ? 'text-[var(--color-primary)]' : 'text-gray-600 hover:text-[var(--color-primary)]'
          }`}
        >
          <SaveIcon filled={isSaved} />
          <span>Save</span>
        </button>
        <button 
          onClick={handleShare}
      className={`${btnBase} ${btnCenter} text-gray-600 hover:text-[var(--color-primary)]`}
        >
          <ShareIcon />
          <span>Share</span>
        </button>
      </div>

      {/* Comments section */}
      {showComments && (
  <div className="mt-6 pt-6 border-t border-gray-100 dark:border-slate-800 space-y-4 animate-fade-in">
          {/* Comment form */}
          <form onSubmit={handleComment} className="flex gap-3">
            <img 
              src={user?.avatarUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=40'} 
              alt="Your avatar"
              className="w-8 h-8 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a thoughtful comment..."
                className="flex-1 px-4 py-2 rounded-full border border-gray-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent bg-gray-50 dark:bg-slate-900/60 dark:text-gray-100 transition-all duration-300"
              />
              <button 
                type="submit"
                disabled={!comment.trim()}
                className="px-6 py-2 bg-green-600 text-white rounded-full font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
              >
                Post
              </button>
            </div>
          </form>

          {/* Comments list */}
          <div className="space-y-4">
            {post.comments.map(c => (
              <div key={c.id} className="flex gap-3 group">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                  {c.author[0]}
                </div>
                <div className="flex-1">
                  <div className="bg-gray-50 dark:bg-slate-900/60 rounded-2xl px-4 py-3 group-hover:bg-gray-100 dark:group-hover:bg-slate-800 transition-colors duration-300">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{c.author}</span>
                      <time className="text-xs text-gray-500 dark:text-gray-400">{formatDate(c.date)}</time>
                    </div>
                    <p className="text-gray-700 dark:text-gray-200 text-sm leading-relaxed">{c.content}</p>
                  </div>
                  <div className="flex items-center gap-4 mt-2 ml-4">
                    <button className="text-xs text-gray-500 dark:text-gray-400 hover:text-[var(--color-primary)] font-medium transition-colors">
                      Like
                    </button>
                    <button className="text-xs text-gray-500 dark:text-gray-400 hover:text-[var(--color-primary)] font-medium transition-colors">
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}
