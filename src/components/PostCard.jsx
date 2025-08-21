import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { LikeIcon, CommentIcon, SaveIcon, ShareIcon } from './Icons'

export default function PostCard({ post }){
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [comment, setComment] = useState('')
  const [showComments, setShowComments] = useState(false)
  const { user } = useAuth()

  const handleLike = () => {
    setIsLiked(!isLiked)
    // In a real app, this would call an API
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
    // In a real app, this would call an API
  }

  const handleShare = () => {
    // In a real app, this would open a share dialog
    alert('Share feature coming soon!')
  }

  const handleComment = (e) => {
    e.preventDefault()
    if (!comment.trim()) return
    // In a real app, this would add the comment via API
    alert('Comment feature coming soon!')
    setComment('')
  }

  const formatDate = (date) => {
    const d = new Date(date)
    const now = new Date()
    const diff = (now - d) / 1000 // seconds
    
    if (diff < 60) return 'just now'
    if (diff < 3600) return `${Math.floor(diff/60)}m ago`
    if (diff < 86400) return `${Math.floor(diff/3600)}h ago`
    return `${Math.floor(diff/86400)}d ago`
  }

  return (
    <article className="card">
      {/* Author header */}
      <div className="flex items-center gap-3 mb-4">
        <img 
          src={post.author.avatar} 
          alt={post.author.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <h3 className="font-medium">{post.author.name}</h3>
          <time className="text-xs text-muted">{formatDate(post.date)}</time>
        </div>
      </div>

      {/* Content */}
      <p className="mb-4">{post.content}</p>
      {post.image && (
        <img 
          src={post.image} 
          alt="Post content"
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map(tag => (
          <span key={tag} className="text-xs px-2 py-1 bg-cream rounded-full">
            #{tag}
          </span>
        ))}
      </div>

      {/* Interaction stats */}
      <div className="flex items-center gap-6 text-sm text-muted mb-4">
        <span>{post.likes + (isLiked ? 1 : 0)} likes</span>
        <span>{post.comments.length} comments</span>
        <span>{post.saves + (isSaved ? 1 : 0)} saves</span>
        <span>{post.shares} shares</span>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-4 border-t border-b py-2 mb-4">
        <button 
          onClick={handleLike}
          className={`flex items-center gap-2 px-4 py-2 rounded-md hover:bg-cream ${isLiked ? 'text-primary' : ''}`}
        >
          <LikeIcon filled={isLiked} />
          Like
        </button>
        <button 
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-cream"
        >
          <CommentIcon />
          Comment
        </button>
        <button 
          onClick={handleSave}
          className={`flex items-center gap-2 px-4 py-2 rounded-md hover:bg-cream ${isSaved ? 'text-primary' : ''}`}
        >
          <SaveIcon filled={isSaved} />
          Save
        </button>
        <button 
          onClick={handleShare}
          className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-cream"
        >
          <ShareIcon />
          Share
        </button>
      </div>

      {/* Comments section */}
      {showComments && (
        <div className="space-y-4">
          {/* Comment form */}
          <form onSubmit={handleComment} className="flex gap-2">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 px-3 py-2 rounded-md border focus:outline-none focus:border-primary"
            />
            <button 
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md hover:opacity-90"
            >
              Post
            </button>
          </form>

          {/* Comments list */}
          <div className="space-y-3">
            {post.comments.map(c => (
              <div key={c.id} className="flex gap-2">
                <div className="flex-1 p-3 bg-cream rounded-md">
                  <div className="flex justify-between">
                    <span className="font-medium">{c.author}</span>
                    <time className="text-xs text-muted">{formatDate(c.date)}</time>
                  </div>
                  <p className="text-sm mt-1">{c.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}
