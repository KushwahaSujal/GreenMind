import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CreatePost() {
  const [caption, setCaption] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const navigate = useNavigate()

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Post created:', { caption, file: selectedFile })
    navigate('/feed')
  }

  return (
    <div className="container-lg mx-auto px-4">
      <div className="max-w-xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <textarea
            placeholder="Share your eco-friendly thoughts..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border-gray-200 resize-none focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
            rows={3}
          />

          {preview ? (
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="w-full rounded-lg"
              />
              <button
                type="button"
                onClick={() => {
                  setSelectedFile(null)
                  setPreview(null)
                }}
                className="absolute top-2 right-2 p-1 bg-black/50 rounded-full hover:bg-black/75"
              >
                <svg className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
                </svg>
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <div className="flex items-center gap-2 text-[var(--color-primary)]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Add Photo
                </div>
              </label>
            </div>
          )}

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="text-slate-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:opacity-90"
              disabled={!caption.trim()}
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
