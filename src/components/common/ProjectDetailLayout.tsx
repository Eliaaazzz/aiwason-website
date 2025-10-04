// src/components/common/ProjectDetailLayout.tsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Globe, ExternalLink, Calendar, MapPin, Award } from 'lucide-react'
import LanguageSwitch from './LanguageSwitch'

export type ProjectDetail = {
  id: string
  title: { zh: string; en: string }
  subtitle?: { zh: string; en: string }
  location: { zh: string; en: string }
  completionDate: string
  category: { zh: string; en: string }
  heroImage: string
  description: {
    zh: string[]
    en: string[]
  }
  keyFeatures?: {
    zh: string[]
    en: string[]
  }
  specifications?: {
    label: { zh: string; en: string }
    value: { zh: string; en: string }
  }[]
  awards?: {
    name: { zh: string; en: string }
    year: string
    description?: { zh: string; en: string }
  }[]
  relatedLinks?: {
    label: { zh: string; en: string }
    href: string
  }[]
}

interface ProjectDetailLayoutProps {
  project: ProjectDetail
  lang: 'zh' | 'en'
}

export default function ProjectDetailLayout({ project, lang }: ProjectDetailLayoutProps) {
  const t = {
    zh: {
      backToHome: '返回首页',
      projectDetails: '项目详情',
      location: '项目位置',
      completionDate: '竣工时间',
      category: '项目类型',
      keyFeatures: '核心特色',
      specifications: '技术规格',
      awards: '获得荣誉',
      relatedLinks: '相关链接',
      exploreMore: '了解更多项目',
    },
    en: {
      backToHome: 'Back to Home',
      projectDetails: 'Project Details',
      location: 'Location',
      completionDate: 'Completion Date',
      category: 'Category',
      keyFeatures: 'Key Features',
      specifications: 'Specifications',
      awards: 'Awards & Recognition',
      relatedLinks: 'Related Links',
      exploreMore: 'Explore More Projects',
    },
  }

  const content = t[lang]

  return (
    <main className="bg-white text-gray-900">
      {/* Header */}
      <section className="border-b border-[#cde9aa]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <Link
                href={`/?lang=${lang}`}
                className="inline-flex items-center gap-2 text-gray-600 hover:text-[#76B900] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                {content.backToHome}
              </Link>
              <span className="text-gray-300">|</span>
              <span className="text-sm text-gray-500">{content.projectDetails}</span>
            </div>
            <LanguageSwitch defaultLang={lang} />
          </div>
        </div>
      </section>

      {/* Hero Section with Project Title */}
      <section className="bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="space-y-3">
              <h1 className="text-4xl lg:text-6xl font-black text-gray-900 leading-tight">
                {project.title[lang]}
              </h1>
              {project.subtitle && (
                <p className="text-xl lg:text-2xl font-semibold text-gray-700">
                  {project.subtitle[lang]}
                </p>
              )}
            </div>

            {/* Project Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#76B900]" />
                <span>{project.location[lang]}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#76B900]" />
                <span>{project.completionDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#76B900]" />
                <span>{project.category[lang]}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hero Image */}
      <section>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full"
        >
          <Image
            src={project.heroImage}
            alt={project.title[lang]}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </motion.div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
            {/* Main Content */}
            <div className="space-y-8">
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                {project.description[lang].map((paragraph, index) => (
                  <p key={index} className="text-lg leading-relaxed text-gray-700">
                    {paragraph}
                  </p>
                ))}
              </motion.div>

              {/* Key Features */}
              {project.keyFeatures && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="space-y-4"
                >
                  <h2 className="text-2xl font-bold text-gray-900">{content.keyFeatures}</h2>
                  <ul className="space-y-3">
                    {project.keyFeatures[lang].map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-[#76B900] rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Specifications */}
              {project.specifications && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-gray-50 rounded-xl p-6 space-y-4"
                >
                  <h3 className="text-lg font-semibold text-gray-900">{content.specifications}</h3>
                  <div className="space-y-3">
                    {project.specifications.map((spec, index) => (
                      <div key={index} className="border-b border-gray-200 pb-2 last:border-b-0">
                        <div className="text-sm font-medium text-gray-600">{spec.label[lang]}</div>
                        <div className="text-gray-900">{spec.value[lang]}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Awards */}
              {project.awards && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="bg-gradient-to-br from-[#76B900]/5 to-[#76B900]/10 rounded-xl p-6 space-y-4"
                >
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#76B900]" />
                    {content.awards}
                  </h3>
                  <div className="space-y-4">
                    {project.awards.map((award, index) => (
                      <div key={index} className="space-y-1">
                        <div className="font-medium text-gray-900">{award.name[lang]}</div>
                        <div className="text-sm text-gray-600">{award.year}</div>
                        {award.description && (
                          <div className="text-sm text-gray-600">{award.description[lang]}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Related Links */}
              {project.relatedLinks && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold text-gray-900">{content.relatedLinks}</h3>
                  <div className="space-y-2">
                    {project.relatedLinks.map((link, index) => (
                      <Link
                        key={index}
                        href={link.href}
                        className="flex items-center gap-2 text-[#76B900] hover:text-[#5a8a00] transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        {link.label[lang]}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">{content.exploreMore}</h2>
            <Link
              href={`/?lang=${lang}`}
              className="inline-flex items-center gap-2 bg-[#76B900] text-white px-8 py-3 rounded-lg font-semibold hover:brightness-110 transition"
            >
              {content.backToHome}
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}