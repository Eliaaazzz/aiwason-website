import { ImageResponse } from 'next/og'
import { isLocale } from '@/lib/i18n'

export const alt = 'AIWASON — Fire-Resistant Intelligent Optoelectronic Busbars'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const lang = isLocale(locale) ? locale : 'zh'
  const headline =
    lang === 'zh' ? '耐火智能光电母线系统' : 'Fire-Resistant Intelligent Optoelectronic Busbars'
  const sub =
    lang === 'zh'
      ? '为数据中心与房地产提供革命性配电技术'
      : 'Revolutionary power tech for data centers and real estate'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px 96px',
          background:
            'radial-gradient(ellipse at top right, rgba(118,185,0,0.35), transparent 55%), linear-gradient(135deg, #000000 0%, #0a1a0a 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            fontSize: 40,
            fontWeight: 900,
            letterSpacing: '-0.02em',
            color: '#76B900',
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 12,
              background: '#76B900',
              color: '#000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: 34,
            }}
          >
            A
          </div>
          AIWASON
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 86,
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            maxWidth: 940,
          }}
        >
          {headline}
        </div>
        <div
          style={{
            marginTop: 32,
            fontSize: 32,
            color: 'rgba(255,255,255,0.78)',
            maxWidth: 900,
            lineHeight: 1.35,
          }}
        >
          {sub}
        </div>
        <div
          style={{
            marginTop: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontSize: 22,
            color: 'rgba(255,255,255,0.6)',
          }}
        >
          aiwasontech.com
          <div style={{ width: 6, height: 6, borderRadius: 3, background: '#76B900' }} />
          {lang === 'zh' ? '艾默森电器' : 'AIWASON Electric'}
        </div>
      </div>
    ),
    { ...size },
  )
}
