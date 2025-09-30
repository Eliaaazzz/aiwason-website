# AIWASON Website - AI Agent Instructions

## Project Overview
This is a professional corporate website for AIWASON, a company specializing in fire-resistant intelligent optoelectronic busbar systems for data centers and smart buildings. The site features a modern, NVIDIA-inspired dark theme with green technology accents.

## Technology Stack & Key Patterns

### Core Architecture
- **Next.js 15** with App Router and Server Components
- **TypeScript** for type safety throughout
- **Tailwind CSS** for styling with custom green theme (`#76B900`)
- **Framer Motion** for animations and transitions
- **React Three Fiber** for 3D components

### Component Structure
```
src/components/
├── common/          # Shared UI components (LanguageSwitch, CardImage)
├── home/           # Homepage-specific components (HomeShell)
├── news/           # News and media components
├── products/       # Product showcase components
└── about/          # About page components
```

### Bilingual Implementation Pattern
All text content uses the translations object pattern:
```typescript
const translations = {
  en: { key: 'English text' },
  zh: { key: '中文文本' }
} as const

const language: 'zh' | 'en' = (searchParams.get('lang') as any) || 'zh'
const t = translations[language]
```

### Image Versioning Strategy
Static assets use query parameter versioning for cache busting:
```typescript
const IMG_VER = '20250921'
const imageSrc = `/res/image.jpg?v=${IMG_VER}`
```

### Animation Patterns
- Use Framer Motion for page transitions and scroll-triggered animations
- Consistent viewport once: true for performance
- Staggered delays for list items (index * 0.1)
- Motion components with initial, whileInView, and transition props

## Development Guidelines

### File Organization
- Component files use PascalCase with `.tsx` extension
- Type definitions in `src/lib/types/` directory
- Static data in `data/` directory at project root
- Images in `public/res/` with descriptive names

### Styling Conventions
- Use Tailwind classes exclusively, avoid custom CSS
- Dark theme default with `bg-black/40 backdrop-blur-sm` for glassmorphism
- Green accent color: `text-green-400`, `border-green-400/30`
- Responsive design with `lg:` breakpoint as primary

### TypeScript Patterns
- Define interfaces for all prop types
- Use `as const` for translation objects
- LocalizedText type for bilingual content: `{ zh: string; en: string }`

### Performance Considerations
- Use `next/image` with proper sizing and lazy loading
- Priority loading for above-fold images only
- Minimize bundle size with dynamic imports where needed
- Server components by default, use 'use client' only when necessary

## Key Components to Understand

### HomeShell (`src/components/home/HomeShell.tsx`)
- Main homepage component with slide-based navigation
- Implements complex layout with video background
- Manages language switching via URL search params
- Uses setTimeout for slide transitions with proper cleanup

### News Components (`src/components/news/`)
- `NewsGrid`: Standard grid layout for news items
- `NewsHeroMosaic`: Hero section with mosaic layout
- `NewsSectionsSlideIn`: Animated sections with slide-in effects

### Common Components
- `LanguageSwitch`: Toggle between English and Chinese
- `CardImage`: Standardized image component with overlay effects

## Content Management

### News Data Structure
Located in `data/news.ts`, follows this pattern:
```typescript
export type NewsItem = {
  id: string
  slug: string
  date: string
  cover: string
  title: LocalizedText
  summary?: LocalizedText
  tags?: string[]
  url?: string
}
```

### Image Assets
- Product images: `/res/gallery-*.jpg`
- Background images: `/res/background.png`, `/res/company.jpg`
- Logo and branding: `/res/logo.png`
- Hero images: `/res/aiwason_fireproof_busbar_hero.png`

## Common Tasks

### Adding New Pages
1. Create route in `src/app/[page-name]/page.tsx`
2. Follow bilingual pattern with search params
3. Use consistent layout and animation patterns
4. Add navigation links with `?lang=${language}` parameters

### Adding Components
1. Create in appropriate subdirectory under `src/components/`
2. Use TypeScript interfaces for props
3. Implement responsive design with mobile-first approach
4. Add Framer Motion animations for visual consistency

### Working with Translations
1. Define translations object with `zh` and `en` keys
2. Extract language from search params: `const language = (sp.get('lang') as 'zh' | 'en') || 'zh'`
3. Access translations: `const t = translations[language]`
4. Update navigation links to include language parameter

### Best Practices
- Always test both language versions
- Ensure animations don't block user interaction
- Use semantic HTML for accessibility
- Optimize images before adding to `/public/res/`
- Follow the established dark theme color palette
- Test on mobile devices for responsive design

## Build & Deployment
- Development: `npm run dev --turbopack`
- Production build: `npm run build`
- Bundle analysis: `npm run analyze`
- Deployed on Vercel with automatic deployments from main branch