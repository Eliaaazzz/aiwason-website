'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { blurProps } from '@/lib/imageProps'

interface Project {
  id: string
  title: string
  image: string
}

const projects: Project[] = [
  {
    id: '1',
    title: '深圳大中华喜来登酒店',
    image: '/projects/深圳-大中华喜来登酒店.jpg'
  },
  {
    id: '2', 
    title: '厦门世茂海峡大厦',
    image: '/projects/厦门世茂海峡大厦.jpg'
  },
  {
    id: '3',
    title: '深圳卓越世纪酒店',
    image: '/projects/深圳卓越世纪酒店.jpg'
  },
  {
    id: '4',
    title: '北京国贸中心',
    image: '/projects/北京国贸中心.jpg'
  },
  {
    id: '5',
    title: '前海金融中心',
    image: '/projects/前海金融中心.jpg'
  },
  {
    id: '6',
    title: '深圳四季酒店',
    image: '/projects/深圳四季酒店.jpg'
  },
  {
    id: '7',
    title: '东莞民盈国贸',
    image: '/projects/东莞民盈国贸.jpg'
  },
  {
    id: '8',
    title: '深圳机场',
    image: '/projects/深圳机场.jpg'
  },
  {
    id: '9',
    title: '青岛地铁',
    image: '/projects/青岛地铁.jpg'
  },
  {
    id: '10',
    title: '保利剧院',
    image: '/projects/保利剧院.jpg'
  },
  {
    id: '11',
    title: '汕头大学新图书馆',
    image: '/projects/汕头大学新图书馆—A.jpg'
  },
  {
    id: '12',
    title: '上海国金中心',
    image: '/projects/上海国金中心—A.jpg'
  }
]

function ProjectCard({ project, eager }: { project: Project; eager: boolean }) {
  const [imageError, setImageError] = useState(false)

  return (
    <motion.div
      className="flex-shrink-0 group"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="relative w-[clamp(220px,72vw,320px)] aspect-[4/3] rounded-2xl overflow-hidden border border-[#76B900]/20 shadow-lg bg-gray-100"
        role="group"
        aria-roledescription="slide"
        aria-label={project.title}
      >
        {!imageError ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 72vw, (max-width: 1024px) 50vw, 320px"
            quality={75}
            className="object-cover transition-transform duration-500 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            priority={eager}
            loading={eager ? 'eager' : 'lazy'}
            onError={() => setImageError(true)}
            {...blurProps(project.image)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="w-16 h-16 mx-auto mb-2 bg-gray-400 rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm">图片加载失败</p>
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/80 to-transparent">
          <h3 className="text-white text-base sm:text-lg font-semibold">
            {project.title}
          </h3>
        </div>
      </div>
    </motion.div>
  )
}

export default function ProjectShowcase({ lang = 'zh' }: { lang?: 'en' | 'zh' }) {
  const [paused, setPaused] = useState(false)
  const reduce = useReducedMotion()
  // Sum of card max-width (320px) + gap (24px) per slide.
  const slideStep = 344

  const heading = lang === 'en' ? 'Featured Projects' : '项目展示'
  const pauseLabel = paused
    ? lang === 'en' ? 'Play carousel' : '继续播放'
    : lang === 'en' ? 'Pause carousel' : '暂停播放'

  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-black tracking-tight text-black mb-8 sm:mb-12 text-center"
        >
          {heading}
        </motion.h2>

        <div
          className="relative overflow-hidden"
          role="region"
          aria-roledescription="carousel"
          aria-label={lang === 'en' ? 'Featured project gallery' : '精选项目轮播'}
          aria-live={paused || reduce ? 'polite' : 'off'}
        >
          <motion.div
            className="flex gap-4 sm:gap-6"
            animate={
              reduce || paused
                ? { x: 0 }
                : { x: [0, -slideStep * projects.length] }
            }
            transition={
              reduce || paused
                ? { duration: 0 }
                : {
                    x: {
                      repeat: Infinity,
                      repeatType: 'loop',
                      duration: 30,
                      ease: 'linear',
                    },
                  }
            }
          >
            {[...projects, ...projects].map((project, index) => (
              <ProjectCard key={`${project.id}-${index}`} project={project} eager={index < 4} />
            ))}
          </motion.div>

          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={pauseLabel}
            className="absolute right-4 bottom-4 z-20 rounded-full bg-black/60 hover:bg-black/80 text-white w-10 h-10 inline-flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#76B900]"
          >
            {paused ? (
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M5 4l11 6-11 6V4z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M5 4h3v12H5zM12 4h3v12h-3z" />
              </svg>
            )}
          </button>
        </div>

        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
      </div>
    </div>
  )
}