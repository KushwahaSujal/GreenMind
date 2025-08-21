import React from 'react'
import PostCard from '../components/PostCard'
import { demoPosts as posts } from '../utils/dummyPosts'

export default function Feed() {
  return (
    <div className="container-lg mx-auto py-8">
      <h1 className="text-2xl font-semibold mb-6">Your Feed</h1>
      <div className="space-y-6">
        {posts.map(post => (
          <div className="card" key={post.id}>
            <PostCard post={post} />
          </div>
        ))}
      </div>
    </div>
  )
}
