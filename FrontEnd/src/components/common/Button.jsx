import { Link } from 'react-router-dom';

const VARIANTS = {
  primary:
    'bg-brand-500 text-ink-950 hover:bg-brand-400 focus-visible:outline-brand-400',
  outline:
    'border border-cream-50/25 text-cream-50 hover:border-brand-400 hover:text-brand-400 focus-visible:outline-brand-400',
  ghost: 'text-brand-400 hover:text-brand-300',
};

export default function Button({ to, href, variant = 'primary', className = '', children, ...rest }) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-semibold tracking-wide transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${VARIANTS[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
