// src/components/common/NavButton.tsx
import { ChevronLeft, ChevronRight } from 'lucide-react'

type NavBtnProps = {
  dir: 'prev' | 'next'
  onClick?: () => void
  disabled?: boolean
  className?: string
  ariaLabel?: string
}

export default function NavButton({
  dir,
  onClick,
  disabled,
  className = '',
  ariaLabel,
}: NavBtnProps) {
  const Icon = dir === 'prev' ? ChevronLeft : ChevronRight
  return (
    <button
      type="button"
      aria-label={ariaLabel ?? (dir === 'prev' ? 'Previous' : 'Next')}
      onClick={onClick}
      disabled={disabled}
      className={[
        // shape
        'h-10 w-10 grid place-items-center rounded-[3px]',
        // NVIDIA green (fixed color whether disabled or not)
        'bg-[#32CD32] text-black',
        // border & elevation
        'border border-black/10 shadow-[0_1px_0_rgba(0,0,0,0.08),0_6px_12px_rgba(0,0,0,0.10)]',
        // transitions
        'transition-[background,box-shadow,transform] duration-150',
        // only when enabled do we change on hover/active
        'enabled:hover:bg-[#32CD32] enabled:hover:shadow-[0_1px_0_rgba(0,0,0,0.08),0_10px_18px_rgba(0,0,0,0.14)]',
        'enabled:active:translate-y-[1px] enabled:active:shadow-[0_0px_0_rgba(0,0,0,0.08),0_6px_12px_rgba(0,0,0,0.12)]',
        // focus ring only when enabled (disabled keeps same color)
        'enabled:focus:outline-none enabled:focus-visible:ring-2 enabled:focus-visible:ring-[#76B900]/40 enabled:focus-visible:ring-offset-2 enabled:focus-visible:ring-offset-white',
        // disabled: keep color, just block interaction/cursor
        'disabled:cursor-not-allowed',
        // motion reduce
        'motion-reduce:transition-none motion-reduce:hover:translate-y-0',
        className,
      ].join(' ')}
    >
      <Icon className="h-5 w-5" strokeWidth={2.5} />
    </button>
  )
}
