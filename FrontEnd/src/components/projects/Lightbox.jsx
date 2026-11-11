import { useCallback, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

// Ask the image CDN for a larger rendition than the gallery tiles use.
const fullSize = (url) => url.replace(/([?&])w=\d+/, '$1w=2400');

/**
 * Full-screen photo viewer.
 * Arrow keys / on-screen arrows / swipe move between photos, Esc or a click
 * on the backdrop closes it.
 */
export default function Lightbox({ images, index, title, onChange, onClose }) {
  const touchStartX = useRef(null);
  const total = images.length;

  const go = useCallback(
    (step) => onChange((index + step + total) % total),
    [index, total, onChange]
  );

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') go(1);
      if (event.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    // Stop the page behind from scrolling while the viewer is open.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [go, onClose]);

  const onTouchEnd = (event) => {
    if (touchStartX.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) go(delta < 0 ? 1 : -1);
    touchStartX.current = null;
  };

  const arrowClass =
    'absolute top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/25';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} photo gallery`}
      className="fixed inset-0 z-[100] flex flex-col bg-black/95"
      onClick={onClose}
      onTouchStart={(event) => (touchStartX.current = event.touches[0].clientX)}
      onTouchEnd={onTouchEnd}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-4 text-white" onClick={(e) => e.stopPropagation()}>
        <p className="text-sm font-medium">
          {title}
          <span className="ml-3 text-white/60">
            {index + 1} / {total}
          </span>
        </p>
        <button
          type="button"
          aria-label="Close gallery"
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/25"
        >
          <X size={20} />
        </button>
      </div>

      {/* Photo */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center">
        {total > 1 && (
          <button
            type="button"
            aria-label="Previous photo"
            className={`${arrowClass} left-3 sm:left-5`}
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
          >
            <ChevronLeft size={24} />
          </button>
        )}
        <img
          key={images[index]}
          src={fullSize(images[index])}
          alt={`${title} — photo ${index + 1}`}
          className="h-full w-full object-contain"
          onClick={(e) => e.stopPropagation()}
        />
        {total > 1 && (
          <button
            type="button"
            aria-label="Next photo"
            className={`${arrowClass} right-3 sm:right-5`}
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>

      {/* Thumbnails */}
      <div className="flex justify-center gap-2 overflow-x-auto px-4 py-4" onClick={(e) => e.stopPropagation()}>
        {images.map((image, i) => (
          <button
            key={image}
            type="button"
            aria-label={`Show photo ${i + 1}`}
            aria-current={i === index}
            onClick={() => onChange(i)}
            className={`h-14 w-20 shrink-0 overflow-hidden rounded-md border-2 transition ${
              i === index ? 'border-white opacity-100' : 'border-transparent opacity-50 hover:opacity-80'
            }`}
          >
            <img src={image} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
