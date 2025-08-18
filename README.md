# AIWASON Official Website
**Fire-Resistant Intelligent Optoelectronic Busbar Systems**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-0055FF?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![License](https://img.shields.io/badge/License-Proprietary-red)](LICENSE)

> Professional corporate website for AIWASON, a leading manufacturer of fire-resistant intelligent optoelectronic busbar systems, specializing in power distribution solutions for real estate developments and data centers.

## 🚀 Live Demo

- **Production**: [https://aiwason.com](https://aiwason.com) *(Coming Soon)*
- **Staging**: [https://staging.aiwason.com](https://staging.aiwason.com) *(Coming Soon)*

---

## 🌟 Key Features

### 🎨 Modern Design System
- **NVIDIA-Inspired Interface** - Sophisticated dark theme with green technology accents
- **Responsive Design** - Optimized for mobile, tablet, and desktop experiences
- **Smooth Animations** - Framer Motion powered micro-interactions and page transitions
- **Glassmorphism Effects** - Modern UI elements with backdrop blur and transparency

### 🌍 Bilingual Support
- **Dynamic Language Switching** - Seamless English ⇄ Chinese translation
- **Localized Content** - Industry-specific terminology and cultural adaptation
- **SEO Optimized** - Multi-language meta tags and structured data

### 🏢 Industry Focus
- **Real Estate Solutions** - Commercial buildings, residential complexes, mixed-use developments
- **Data Center Infrastructure** - Cloud facilities, colocation centers, edge computing
- **Smart Building Integration** - IoT-enabled systems and intelligent building management

### ⚡ Performance Optimized
- **Next.js 15** - Latest React framework with App Router and Server Components
- **Core Web Vitals** - Optimized for speed, accessibility, and user experience
- **Image Optimization** - Automatic WebP conversion and lazy loading
- **Bundle Analysis** - Optimized JavaScript and CSS delivery

---

## 🛠️ Technology Stack

### Frontend Framework
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[React 18](https://react.dev/)** - Latest React with concurrent features

### Styling & Animation
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - Production-ready motion library
- **[Lucide React](https://lucide.dev/)** - Modern icon library

### Development Tools
- **[ESLint](https://eslint.org/)** - Code quality and consistency
- **[Prettier](https://prettier.io/)** - Code formatting
- **[TypeScript](https://www.typescriptlang.org/)** - Static type checking

### Deployment & Hosting
- **[Vercel](https://vercel.com/)** - Serverless deployment platform
- **[GitHub Actions](https://github.com/features/actions)** - CI/CD pipelines

---

## 📦 Installation & Setup

### Prerequisites
- **Node.js** 18.0 or later
- **npm**, **yarn**, or **pnpm**
- **Git** for version control

### Quick Start
```bash
# Clone the repository
git clone https://github.com/Eliaaazzz/aiwason-website.git
cd aiwason-website

# Install dependencies
npm install
# or
yarn install
# or
pnpm install

# Start development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

### Environment Setup
```bash
# Copy environment variables
cp .env.example .env.local

# Edit environment variables
# Add your configuration values to .env.local
```

---

## 🏗️ Project Structure

```
aiwason-website/
├── public/                 # Static assets
│   ├── images/            # Company images and graphics
│   ├── models/            # 3D models and textures
│   └── documents/         # Technical documentation
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── (pages)/       # Route groups
│   │   ├── api/           # API routes
│   │   └── globals.css    # Global styles
│   ├── components/        # React components
│   │   ├── ui/            # Reusable UI components
│   │   ├── sections/      # Page sections
│   │   └── forms/         # Form components
│   ├── lib/               # Utility functions
│   ├── hooks/             # Custom React hooks
│   ├── types/             # TypeScript type definitions
│   └── data/              # Static data and constants
├── docs/                  # Project documentation
└── .github/               # GitHub workflows and templates
```

---

## 📝 Available Scripts

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

### Code Quality
```bash
npm run format       # Format code with Prettier
npm run lint:fix     # Fix ESLint issues
npm run analyze      # Analyze bundle size
```

---

## 🎯 Core Pages & Features

### Homepage (`/`)
- **Hero Section** - Company introduction with animated elements
- **Statistics** - Key performance indicators and achievements
- **Features** - Core technology and product benefits
- **Industries** - Target market segments and applications

### Product Catalog (`/products`)
- **3D Product Viewer** - Interactive product demonstrations
- **Technical Specifications** - Detailed product information
- **Configuration Tools** - Custom solution builders

### Solutions (`/solutions`)
- **Industry Solutions** - Real estate and data center applications
- **Case Studies** - Successful implementation examples
- **ROI Calculators** - Cost-benefit analysis tools

---

## 🌐 Internationalization

### Supported Languages
- **English** - Primary business language
- **Chinese (Simplified)** - Local market communication

### Translation Management
```typescript
// Translation structure
const translations = {
  en: { /* English translations */ },
  zh: { /* Chinese translations */ }
}

// Usage in components
const t = translations[language]
return <h1>{t.hero.title}</h1>
```

---

## 🚀 Deployment

### Production Deployment
```bash
# Build for production
npm run build

# Deploy to Vercel (recommended)
npx vercel --prod

# Deploy to other platforms
npm run export  # Static export for CDN deployment
```

### Environment Variables
```bash
# Required for production
NEXT_PUBLIC_APP_URL=https://aiwason.com
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
```

---

## 📊 Performance Metrics

### Target Metrics
- **Lighthouse Score**: 95+ across all categories
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

### Optimization Features
- Image optimization with WebP format
- Code splitting and lazy loading
- Service worker caching
- Critical CSS inlining

---

## 🤝 Contributing

### Development Workflow
1. **Create Feature Branch**: `git checkout -b feature/new-component`
2. **Make Changes**: Follow coding standards and conventions
3. **Test Thoroughly**: Ensure all functionality works correctly
4. **Commit**: Use conventional commit messages
5. **Push & PR**: Submit pull request for review

### Coding Standards
- **TypeScript**: Strict mode enabled
- **ESLint**: Enforce code quality rules
- **Prettier**: Consistent code formatting
- **Conventional Commits**: Structured commit messages

---

## 📄 License

This project is proprietary and confidential. All rights reserved by AIWASON.

**Unauthorized copying, distribution, or use is strictly prohibited.**

---

## 📞 Contact & Support

### Business Inquiries
- **Website**: [www.aiwason.com](https://www.aiwason.com)
- **Email**: [business@aiwason.com](mailto:business@aiwason.com)
- **Phone**: +86-XXX-XXXX-XXXX

### Technical Support
- **Developer**: [Eliaaazzz](https://github.com/Eliaaazzz)
- **Issues**: [GitHub Issues](https://github.com/Eliaaazzz/aiwason-website/issues)
- **Documentation**: [Project Wiki](https://github.com/Eliaaazzz/aiwason-website/wiki)

---

**Built with ❤️ for the future of intelligent power distribution**

*Last updated: January 2025*
