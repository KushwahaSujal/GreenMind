import React, { useState } from 'react'

export default function PostModal({ isOpen, onClose }) {
  const [caption, setCaption] = useState('')
  const [files, setFiles] = useState([])
  const [previewUrls, setPreviewUrls] = useState([])

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files)
    setFiles(selectedFiles)
    
    // Create preview URLs for images/videos
    const urls = selectedFiles.map(file => URL.createObjectURL(file))
    setPreviewUrls(urls)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here we would normally upload files and create post
    // For now, just log and close
    console.log('Post data:', { caption, files })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full mx-4 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create Post</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* File upload area */}
          <div className="border-2 border-dashed rounded-xl p-8 text-center">
            <input
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="space-y-2">
                <svg className="w-12 h-12 mx-auto text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div className="text-sm text-slate-500">
                  Click to upload photos or videos
                </div>
              </div>
            </label>
          </div>

          {/* Previews */}
          {previewUrls.length > 0 && (
            <div className="grid grid-cols-2 gap-2">
              {previewUrls.map((url, idx) => (
                <div key={idx} className="relative aspect-video rounded-lg overflow-hidden">
                  {files[idx].type.startsWith('image/') ? (
                    <img 
                      src={url} 
                      alt={`Preview ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video 
                      src={url}
                      className="w-full h-full object-cover"
                      controls
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      const newFiles = [...files]
                      const newUrls = [...previewUrls]
                      newFiles.splice(idx, 1)
                      newUrls.splice(idx, 1)
                      setFiles(newFiles)
                      setPreviewUrls(newUrls)
                    }}
                    className="absolute top-2 right-2 bg-black/50 rounded-full p-1 hover:bg-black/75"
                  >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Caption input */}
          <div>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write a caption..."
              className="w-full rounded-xl border-gray-200 p-4 h-32 resize-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:opacity-90"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
