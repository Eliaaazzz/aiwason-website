// src/types/news.ts
import type { StaticImageData } from 'next/image'

export type Localised<T> = { en: T; zh: T }

export type VideoItem = {
  id: string
  type: 'standard' | 'interview'
  title: Localised<string>
  description?: Localised<string>
  thumbnail: string | StaticImageData
  videoUrl: string
  date?: string
  duration?: string
}

export type NewsItem = {
  id: string
  title: Localised<string>
  description?: Localised<string>
  source: string
  link: string
  date: string
  image: string | StaticImageData
}

export type WeChatPost = {
  id: string
  title: Localised<string>
  description?: Localised<string>
  thumbnail: string | StaticImageData
  link: string
  date: string
}

export type WeChatAccount = {
  name: Localised<string>
  qr: string | StaticImageData
  homepage?: string
  intro?: Localised<string>
}

export type NewsPayload = {
  videos: VideoItem[]
  news: NewsItem[]
  wechat: WeChatPost[]
  wechatAccount: WeChatAccount
}
