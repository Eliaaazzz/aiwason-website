'use client'

import { useEffect, useRef, useState } from 'react'

export type VideoSource = { src: string; type: string }

type Props = {
  poster: string
  sources: VideoSource[]
  className?: string
  title?: string
}

export default function HeroVideoInline({
  poster,
  sources,
  className,
  title = 'Hero video',
}: Props) {
  const vRef = useRef<HTMLVideoElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const v = vRef.current
    if (!v) return
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    v.addEventListener('play', onPlay)
    v.addEventListener('pause', onPause)
    return () => {
      v.removeEventListener('play', onPlay)
      v.removeEventListener('pause', onPause)
    }
  }, [])

  const togglePlay = () => {
    const v = vRef.current
    if (!v) return
    if (v.paused) void v.play()
    else v.pause()
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      {/* 内联播放器：不自动播放，填满父容器（父容器决定尺寸） */}
      <div className={`relative overflow-hidden rounded-2xl bg-black ${className ?? ''}`}>
        <video
          ref={vRef}
          className="h-full w-full object-cover"
          title={title}
          poster={poster}
          preload="none"
          playsInline
          controls={false}
        >
          {sources.map((s) => (
            <source key={s.src} src={s.src} type={s.type} />
          ))}
        </video>

        {/* 控件：Play / Zoom（键盘 Enter/Space 可触发） */}
        <div className="absolute inset-0 flex items-end justify-between p-3 pointer-events-none">
          <div className="pointer-events-auto flex gap-2">
            <button
              type="button"
              onClick={togglePlay}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  togglePlay()
                }
              }}
              className="rounded-md bg-white/90 hover:bg-white px-3 py-1.5 text-sm font-semibold text-black shadow"
              aria-label={playing ? 'Pause video' : 'Play video'}
            >
              {playing ? 'Pause' : 'Play'}
            </button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setOpen(true)
                }
              }}
              className="rounded-md bg-white/90 hover:bg-white px-3 py-1.5 text-sm font-semibold text-black shadow"
              aria-label="Zoom video"
            >
              Zoom
            </button>
          </div>
        </div>
      </div>

      {/* 放大 Modal：同一视频资源，不自动播放，原生 controls，可 Esc 关闭 */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Video modal"
          className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full overflow-hidden rounded-2xl bg-black">
              {/* 用 16:9 占位避免 CLS */}
              <div aria-hidden className="select-none" style={{ paddingTop: '56.25%' }} />
              <video
                className="absolute inset-0 h-full w-full object-contain bg-black"
                poster={poster}
                preload="none"
                controls
                playsInline
              >
                {sources.map((s) => (
                  <source key={`modal-${s.src}`} src={s.src} type={s.type} />
                ))}
              </video>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute -top-10 right-0 rounded-md bg-white/90 hover:bg-white px-3 py-1.5 text-sm font-semibold text-black shadow"
              aria-label="Close video"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}
