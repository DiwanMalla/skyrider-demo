'use client'

import { motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import gsap from 'gsap'

export interface MemoryProps {
  id?: string | number
  title?: string
  subtitle?: string
  content?: string
  accent?: 'emerald' | 'sky' | 'indigo'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  removable?: boolean
  onRemove?: (id: string | number) => void
  className?: string
}

const accentClasses = {
  emerald: 'from-emerald-50 to-emerald-100 border-emerald-200 hover:shadow-emerald-100',
  sky: 'from-sky-50 to-sky-100 border-sky-200 hover:shadow-sky-100',
  indigo: 'from-indigo-50 to-indigo-100 border-indigo-200 hover:shadow-indigo-100',
}

const accentBorderClasses = {
  emerald: 'bg-emerald-600',
  sky: 'bg-sky-600',
  indigo: 'bg-indigo-600',
}

const sizeClasses = {
  sm: 'p-3 text-sm',
  md: 'p-4 text-base',
  lg: 'p-6 text-lg',
}

const prefersReducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Framer Motion variants for enter/exit
const variants = {
  hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 6 },
  enter: prefersReducedMotion
    ? { opacity: 1, transition: { duration: 0 } }
    : {
        opacity: 1,
        y: 0,
        transition: { type: 'spring', stiffness: 260, damping: 20, duration: 0.3 },
      },
  exit: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 6, transition: { duration: 0.18 } },
}

export const Memory = ({
  id,
  title,
  subtitle,
  content,
  accent = 'emerald',
  size = 'md',
  onClick,
  removable = false,
  onRemove,
  className = '',
}: MemoryProps) => {
  const [showRemove, setShowRemove] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const borderRef = useRef<HTMLDivElement>(null)

  const handleRemove = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      if (onRemove && id) {
        onRemove(id)
      }
    },
    [onRemove, id],
  )

  const bgClass = accentClasses[accent]
  const borderClass = accentBorderClasses[accent]
  const paddingClass = sizeClasses[size]

  return (
    <motion.div
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      whileHover="hover"
      whileTap="tap"
      initial_="rest"
      animate_="rest"
      variants_={{
        ...hoverVariants,
        ...tapVariants,
      }}
      className={`group relative overflow-hidden rounded-lg border-2 cursor-pointer transition-all ${bgClass} ${paddingClass} ${className}`}
      onClick={onClick}
      onMouseEnter={() => setShowRemove(true)}
      onMouseLeave={() => setShowRemove(false)}
      role="button"
      tabIndex={0}
      aria-label={title}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick?.()
        }
      }}
    >
      {/* Left accent bar */}
      <div className={`absolute left-0 top-0 w-1 h-full ${borderClass}`} />

      {/* Remove button */}
      {removable && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: showRemove ? 1 : 0, scale: showRemove ? 1 : 0.8 }}
          transition={{ duration: 0.15 }}
          onClick={handleRemove}
          className="absolute top-2 right-2 p-1 rounded-md bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
          aria-label={`Remove ${title || 'memory'}`}
        >
          <X size={16} />
        </motion.button>
      )}

      {/* Content */}
      <div className="flex flex-col gap-1 pr-8">
        {title && <h3 className="font-semibold text-slate-900 leading-tight">{title}</h3>}

        {subtitle && <p className="text-xs text-slate-600 leading-tight">{subtitle}</p>}

        {content && (
          <p className="text-slate-700 line-clamp-2 leading-relaxed text-sm mt-1">{content}</p>
        )}
      </div>

      {/* Hover indicator (subtle) */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.05 }}
        className="absolute inset-0 bg-gradient-to-r from-slate-900 to-transparent pointer-events-none rounded-lg"
      />
    </motion.div>
  )
}

export default Memory
