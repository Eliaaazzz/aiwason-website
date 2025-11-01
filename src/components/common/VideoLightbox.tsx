'use client'

import * as React from 'react'

export type VideoSrc = { src: string; type: string }

export interface VideoLightboxProps {
  open: boolean
  onClose: () => void
  title?: string
  poster: string
  sources?: VideoSrc[]
  embedUrl?: string
}

export default function VideoLightbox({
  open,
  onClose,
  title = 'Video',
  poster,
  sources,
  embedUrl,
}: VideoLightboxProps) {
  const closeRef = React.useRef<HTMLButtonElement>(null)
  const videoRef = React.useRef<HTMLVideoElement>(null)

  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const id = window.setTimeout(() => closeRef.current?.focus(), 0)
    return () => {
      document.removeEventListener('keydown', onKey)
      window.clearTimeout(id)
    }
  }, [open, onClose])

  React.useEffect(() => {
    if (!open) return
    if (!sources?.length) return
    const video = videoRef.current
    if (!video) return
    video.currentTime = 0
    video.load()
    const playPromise = video.play()
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        // Autoplay may be blocked; controls remain available for manual playback.
      })
    }
  }, [open, sources])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-black rounded-2xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <h2 className="text-white font-semibold">{title}</h2>
          <button
            ref={closeRef}
            onClick={onClose}
            className="rounded-md px-3 py-1.5 text-sm font-semibold bg-white/10 hover:bg-white/20 text-white"
          >
            ×
          </button>
        </div>

        <div className="px-4 pb-4">
          <div className="relative w-full aspect-video overflow-hidden rounded-lg bg-black">
            {embedUrl ? (
              <iframe
                key={embedUrl}
                src={embedUrl}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full"
              />
            ) : sources?.length ? (
              <video
                controls
                playsInline
                preload="metadata"
                poster={poster}
                className="h-full w-full object-contain bg-black"
                ref={videoRef}
                key={sources.map((s) => s.src).join('|')}
              >
                {sources.map((s) => (
                  <source key={s.src} src={s.src} type={s.type} />
                ))}
                Sorry, your browser doesn’t support HTML5 video.
              </video>
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm text-white/70">
                Video source unavailable.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
