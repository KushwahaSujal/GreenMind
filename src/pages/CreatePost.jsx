import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import PostCard from '../components/PostCard'

export default function CreatePost() {
  const navigate = useNavigate()
  const { user } = useAuth()

  // form state
  const [caption, setCaption] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [fileMeta, setFileMeta] = useState({ name: '', sizeKB: 0, width: 0, height: 0 })
  const [tags, setTags] = useState(['sustainability'])
  const [newTag, setNewTag] = useState('')
  const [visibility, setVisibility] = useState('public')
  const [location, setLocation] = useState('')
  const [altText, setAltText] = useState('')
  const [allowComments, setAllowComments] = useState(true)
  const [impactEstimate, setImpactEstimate] = useState(5)
  const [category, setCategory] = useState('Action')

  const captionLimit = 300

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setPreview(url)
      setFileMeta({ name: file.name, sizeKB: Math.round(file.size / 1024), width: 0, height: 0 })
      // get dimensions
      const img = new Image()
      img.onload = () => {
        setFileMeta(prev => ({ ...prev, width: img.width, height: img.height }))
      }
      img.src = url
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = {
      caption,
      file: selectedFile,
      tags,
      visibility,
      location,
      altText,
      allowComments,
      impactEstimate,
      category,
    }
    console.log('Post created:', payload)
    navigate('/feed')
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setPreview(url)
      setFileMeta({ name: file.name, sizeKB: Math.round(file.size / 1024), width: 0, height: 0 })
      const img = new Image()
      img.onload = () => setFileMeta(prev => ({ ...prev, width: img.width, height: img.height }))
      img.src = url
    }
  }

  const addTag = (t) => {
    const tag = (t || newTag).trim().replace(/^#/, '')
    if (!tag) return
    if (!tags.includes(tag)) setTags([...tags, tag])
    setNewTag('')
  }

  const removeTag = (tag) => setTags(tags.filter(t => t !== tag))

  const canPost = caption.trim().length >= 10

  // Build a live preview post structure for PostCard
  const previewPost = useMemo(() => ({
    author: { name: user?.name || 'You', avatar: user?.avatarUrl },
    date: new Date().toISOString(),
    content: caption || 'Share something inspiring about your eco-journey…',
    image: preview || null,
    tags,
    likes: 0,
    comments: [],
    shares: 0,
  }), [user, caption, preview, tags])

  const tagSuggestions = ['recycle', 'plasticfree', 'plantatree', 'greenenergy', 'compost', 'bikelife', 'upcycle']

  return (
  <div className="container-lg py-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Composer */}
    <div className="card p-6">
          <div className="mb-6">
      <h1 className="text-2xl font-bold">Create a Post</h1>
      <p className="text-sm text-muted mt-1">Share your impact, inspire others, and grow the GreenMind community.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Caption */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Caption</label>
              <div className="relative">
                <textarea
                  placeholder="Tell your story… What did you do today for the planet?"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value.slice(0, captionLimit))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 resize-y focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)] bg-gray-50 dark:bg-slate-900/60 dark:text-gray-100"
                  rows={4}
                />
                <div className="absolute bottom-2 right-3 text-xs text-gray-500">{caption.length}/{captionLimit}</div>
              </div>
            </div>

            {/* Image uploader */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Photo</label>
              {!preview ? (
                <label
                  onDragOver={(e)=>{e.preventDefault()}}
                  onDrop={handleDrop}
                  className="flex flex-col items-center justify-center gap-3 h-40 rounded-2xl border-2 border-dashed border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/60 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <input type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
                  <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center shadow">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M16 7h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                  </div>
                  <div className="text-sm text-slate-700 dark:text-slate-200">Drag & drop an image here, or <span className="text-[var(--color-primary)] font-medium">browse</span></div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">JPG, PNG up to ~5MB</div>
                </label>
              ) : (
        <div className="relative rounded-2xl overflow-hidden group bg-gray-100 dark:bg-slate-900/60">
                  <img src={preview} alt={altText || 'Selected image preview'} className="w-full max-h-96 object-cover" />
                  <button
                    type="button"
                    onClick={() => { setSelectedFile(null); setPreview(null); setFileMeta({ name: '', sizeKB: 0, width: 0, height: 0 }) }}
          className="absolute top-2 right-2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70"
                    aria-label="Remove image"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/></svg>
                  </button>
                </div>
              )}
              {preview && (
                <div className="mt-2 text-xs text-muted">
                  {fileMeta.name} • {fileMeta.sizeKB} KB • {fileMeta.width}×{fileMeta.height}px
                </div>
              )}
            </div>

            {/* Alt text */}
            {preview && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Alt text</label>
                <input
                  type="text"
                  value={altText}
                  onChange={(e)=>setAltText(e.target.value)}
                  placeholder="Describe the image for better accessibility"
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)] bg-gray-50 dark:bg-slate-900/60 dark:text-gray-100"
                />
              </div>
            )}

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Tags</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map(tag => (
                  <span key={tag} className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                    #{tag}
                    <button type="button" onClick={()=>removeTag(tag)} className="hover:text-red-500" aria-label={`Remove ${tag}`}>
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e)=>setNewTag(e.target.value)}
                  onKeyDown={(e)=>{ if(e.key==='Enter'){ e.preventDefault(); addTag() } }}
                  placeholder="Add a tag"
                  className="flex-1 px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/60 dark:text-gray-100 focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)]"
                />
                <button type="button" onClick={()=>addTag()} className="px-4 py-2 rounded-xl bg-[var(--color-primary)] text-white">Add</button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {tagSuggestions.map(s => (
                  <button key={s} type="button" onClick={()=>addTag(s)} className="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-slate-800/60 hover:bg-gray-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200">#{s}</button>
                ))}
              </div>
            </div>

            {/* Meta controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Visibility</label>
                <select value={visibility} onChange={(e)=>setVisibility(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/60 dark:text-gray-100 focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)]">
                  <option value="public">Public</option>
                  <option value="friends">Friends</option>
                  <option value="private">Private</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
                <input value={location} onChange={(e)=>setLocation(e.target.value)} placeholder="e.g., Delhi, India" className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/60 dark:text-gray-100 focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Allow comments</label>
                <div className="flex items-center gap-2">
                  <input id="allowComments" type="checkbox" checked={allowComments} onChange={(e)=>setAllowComments(e.target.checked)} className="w-4 h-4" />
                  <label htmlFor="allowComments" className="text-sm text-slate-700 dark:text-slate-200">Enable comments for this post</label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Estimated Impact</label>
                <input type="range" min="0" max="100" value={impactEstimate} onChange={(e)=>setImpactEstimate(Number(e.target.value))} className="w-full" />
                <div className="text-xs text-muted mt-1">+{impactEstimate} eco points</div>
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
              <div className="flex flex-wrap gap-2">
                {['Action','Tip','Event','Question'].map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={()=>setCategory(c)}
                    className={`px-3 py-1 rounded-full text-sm border ${category===c ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]' : 'bg-white dark:bg-slate-900/60 text-slate-700 dark:text-slate-200 border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800'}`}
                  >{c}</button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
              <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800">Cancel</button>
              <button type="submit" disabled={!canPost} className="px-6 py-2 rounded-xl text-white bg-green-600 shadow disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transform hover:scale-[1.02] transition-all">Post</button>
            </div>
          </form>
        </div>

        {/* Right: Live Preview */}
        <div className="lg:sticky lg:top-24 self-start">
          <div className="card overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 dark:border-slate-800 bg-green-100 dark:bg-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold leading-tight">Live Preview</h2>
                  <p className="text-xs text-muted">See how your post will look in the feed</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-white/70 dark:bg-slate-800/60 border border-white dark:border-slate-700 text-slate-700 dark:text-slate-200">
                    {visibility.charAt(0).toUpperCase()+visibility.slice(1)}
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-white/70 dark:bg-slate-800/60 border border-white dark:border-slate-700 text-slate-700 dark:text-slate-200">
                    {category}
                  </span>
                </div>
              </div>
            </div>
            <PostCard post={previewPost} variant="preview" />
            <div className="px-6 py-4 border-t border-gray-100 dark:border-slate-800 text-xs text-muted grid grid-cols-3 items-center">
              <div className="flex items-center gap-1 min-w-0">
                {location && (
                  <>
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5s-3 1.343-3 3 1.343 3 3 3z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.5 9c0 7.5-7.5 12-7.5 12S4.5 16.5 4.5 9a7.5 7.5 0 1115 0z"/></svg>
                    <span className="truncate">{location}</span>
                  </>
                )}
              </div>
              <div className="flex items-center justify-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <span>Now</span>
              </div>
              <div className="flex items-center justify-end gap-1 text-slate-700 dark:text-slate-200">
                <span className="font-medium">+{impactEstimate}</span>
                <span>impact</span>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="mt-6 card p-4 text-sm text-slate-700 dark:text-slate-200">
            <div className="font-semibold mb-2">Tips for a great post</div>
            <ul className="list-disc pl-5 space-y-1 text-muted">
              <li>Start with an action verb and keep it friendly.</li>
              <li>Add a clear photo to boost engagement.</li>
              <li>Use 2–4 specific tags (e.g., recycle, bikelife).</li>
              <li>Share a practical takeaway others can try.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
