const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aiwasontech.com'

export const siteUrl = rawSiteUrl.endsWith('/') ? rawSiteUrl.slice(0, -1) : rawSiteUrl
export const siteName = 'AMERSON'
export const siteDescription =
  'AMERSON — 耐火智能光电母线系统 | Fire-resistant intelligent optoelectronic busbars for data centers and smart buildings.'
export const siteSummary =
  'Fire-resistant intelligent optoelectronic busbar technology powering data centers and smart buildings.'
export const defaultOgImage = '/res/amerson_fireproof_busbar_hero.png'
export const siteLogo = `${siteUrl}/res/logo.png`
