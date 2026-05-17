'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import React from 'react'

type Props = {
  logoSrc: string
  className?: string
}

export default function LogoNeonCard({ logoSrc, className }: Props) {
  const reduce = useReducedMotion()

  // simple bezier curves for neon trails
  const curves = [
    'M -5 20 C 25 10, 55 30, 105 15',   // top gentle
    'M -5 50 C 25 55, 55 40, 105 55',   // middle
    'M -5 80 C 25 70, 55 90, 105 85',   // bottom
  ]

  return (
    <div
      className={[
        'relative aspect-[16/9] rounded-2xl overflow-hidden',
        'bg-gray-900/75 border border-white/10',
        'shadow-[0_40px_120px_-40px_rgba(124,255,203,0.25)]',
        className || '',
      ].join(' ')}
    >
      {/* green atmospheric orbs */}
      <motion.div
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full"
        animate={reduce ? {} : { x: [0, 18, 0], y: [0, -12, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background:
            'radial-gradient(closest-side, rgba(124,255,203,0.14), rgba(124,255,203,0) 70%)',
          filter: 'blur(28px)',
        }}
      />
      <motion.div
        className="absolute -bottom-28 -left-20 w-80 h-80 rounded-full"
        animate={reduce ? {} : { x: [0, -16, 0], y: [0, 14, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background:
            'radial-gradient(closest-side, rgba(118,185,0,0.14), rgba(118,185,0,0) 70%)',
          filter: 'blur(32px)',
        }}
      />

      {/* subtle “fire” glow */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={reduce ? {} : { opacity: [0.18, 0.34, 0.18] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background:
            'radial-gradient(60% 60% at 50% 110%, rgba(255,120,0,0.25), rgba(255,120,0,0) 60%)',
          mixBlendMode: 'screen',
          filter: 'blur(18px)',
        }}
      />

      {/* animated neon trails (SVG strokes) */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="trail" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#76B900" />
            <stop offset="60%" stopColor="#7CFFCB" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {curves.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            stroke="url(#trail)"
            strokeWidth="1.2"
            fill="none"
            filter="url(#glow)"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, pathOffset: 0 }}
            animate={
              reduce
                ? { pathLength: 1, pathOffset: 0 }
                : { pathLength: 1, pathOffset: [0, -1] }
            }
            transition={{
              duration: 5 + i * 0.8,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{ opacity: 0.85 - i * 0.2 }}
          />
        ))}
      </svg>

      {/* orange embers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 14 }).map((_, i) => {
          const left = Math.random() * 100
          const delay = Math.random() * 3
          const dur = 3 + Math.random() * 4
          const size = 1 + Math.random() * 2
          return (
            <motion.span
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${left}%`,
                bottom: '-8%',
                width: size,
                height: size,
                background:
                  'radial-gradient(circle, rgba(255,200,120,0.9), rgba(255,200,120,0) 70%)',
              }}
              animate={reduce ? {} : { y: ['0%', '-110%'], opacity: [0, 0.9, 0] }}
              transition={{ duration: dur, delay, repeat: Infinity, ease: 'easeOut' }}
            />
          )
        })}
      </div>

      {/* centered logo with glow */}
      <div className="relative w-full h-full">
        <Image
          src={logoSrc}
          alt="Brand Logo"
          fill
          priority
          sizes="(max-width: 768px) 80vw, 720px"
          className="object-contain p-10 md:p-12 lg:p-16"
          style={{
            filter:
              'drop-shadow(0 0 12px rgba(124,255,203,0.45)) drop-shadow(0 0 40px rgba(118,185,0,0.25))',
            mixBlendMode: 'screen',
          }}
        />
      </div>
    </div>
  )
}
