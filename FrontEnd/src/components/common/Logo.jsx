/**
 * Brand logo: an arched "N" standing on a floor line — a doorway and the
 * studio's initial in one mark — next to the wordmark.
 */
export function LogoMark({ size = 40, className = '' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <rect width="64" height="64" rx="14" className="fill-brand-500" />
      <g fill="none" stroke="#ffffff" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 46V27a14 14 0 0 1 28 0v19" />
        <path d="M18 27l28 19" />
        <path d="M13 53h38" strokeWidth="3" opacity="0.55" />
      </g>
    </svg>
  );
}

export default function Logo({ size = 40 }) {
  return (
    <span className="flex items-center gap-3" aria-label="Nyulo Interior">
      <LogoMark size={size} />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.45rem] font-semibold tracking-tight text-cream-50">Nyulo</span>
        <span className="mt-1 text-[0.6rem] font-bold uppercase tracking-[0.42em] text-brand-400">Interior</span>
      </span>
    </span>
  );
}
