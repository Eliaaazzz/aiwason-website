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
        'h-10 w-10 grid place-items-center rounded-[8px]',
        'bg-[#9BE15D] text-[#0f2100]',
        'border border-black/10 shadow-[0_1px_0_rgba(0,0,0,0.06),0_8px_16px_rgba(0,0,0,0.10)]',
        'transition-[background,box-shadow,transform] duration-150',
        'enabled:hover:bg-[#88d84a] enabled:hover:shadow-[0_2px_6px_rgba(0,0,0,0.08),0_12px_22px_rgba(0,0,0,0.14)]',
        'enabled:active:translate-y-[1px] enabled:active:shadow-[0_0px_0_rgba(0,0,0,0.08),0_6px_14px_rgba(0,0,0,0.12)]',
        'enabled:focus:outline-none enabled:focus-visible:ring-2 enabled:focus-visible:ring-[#4ca233]/45 enabled:focus-visible:ring-offset-2 enabled:focus-visible:ring-offset-white',
        'disabled:cursor-not-allowed disabled:opacity-60',
        'motion-reduce:transition-none motion-reduce:hover:translate-y-0',
        className,
      ].join(' ')}
    >
      <Icon className="h-5 w-5" strokeWidth={2.5} />
    </button>
  )
}
