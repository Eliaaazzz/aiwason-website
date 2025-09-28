// src/types/news.ts
export type Localised<T> = { en: T; zh: T }
export type VideoItem = {
  id: string
  type: 'standard' | 'interview'
  title: Localised<string>
  description?: Localised<string>
  thumbnail: string
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
}
export type WeChatPost = {
  id: string
  title: Localised<string>
  description?: Localised<string>
  thumbnail: string
  link: string
  date: string
}
export type WeChatAccount = {
  name: Localised<string>
  qr: string
  homepage?: string
  intro?: Localised<string>
}
export type NewsPayload = {
  videos: VideoItem[]
  news: NewsItem[]
  wechat: WeChatPost[]
  wechatAccount: WeChatAccount
}
