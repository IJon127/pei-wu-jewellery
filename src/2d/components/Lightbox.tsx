import { useEffect, useCallback, useState } from 'react'
import { createPortal } from 'react-dom'

export interface LightboxProps {
    images: string[]
    initialIndex?: number
    photoby?: string[]
    onClose: () => void
}

export function Lightbox({ images, initialIndex = 0, photoby, onClose }: LightboxProps) {
    const [index, setIndex] = useState(initialIndex)

    const prev = useCallback(() => setIndex(i => (i - 1 + images.length) % images.length), [images.length])
    const next = useCallback(() => setIndex(i => (i + 1) % images.length), [images.length])

    useEffect(() => {
        const prevOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'

        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
            if (e.key === 'ArrowLeft') prev()
            if (e.key === 'ArrowRight') next()
        }
        window.addEventListener('keydown', onKey)
        return () => {
            document.body.style.overflow = prevOverflow
            window.removeEventListener('keydown', onKey)
        }
    }, [onClose, prev, next])

    const hasMult = images.length > 1

    return createPortal(
        <div
            className="lightbox-backdrop"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
        >
            {/* Main image — stop propagation so clicking it doesn't close */}
            <div className="lightbox-content" onClick={e => e.stopPropagation()}>
                <img
                    key={images[index]}
                    className="lightbox-img"
                    src={images[index]}
                    alt={`Image ${index + 1} of ${images.length}`}
                />

                {hasMult && (
                    <>
                        <button
                            type="button"
                            className="lightbox-nav lightbox-nav--prev"
                            onClick={prev}
                            aria-label="Previous image"
                        >
                            ‹
                        </button>
                        <button
                            type="button"
                            className="lightbox-nav lightbox-nav--next"
                            onClick={next}
                            aria-label="Next image"
                        >
                            ›
                        </button>
                        <span className="lightbox-counter">{index + 1} / {images.length}</span>
                    </>
                )}

                {photoby && photoby[index] && (
                    <p className="lightbox-photoby">Photo — {photoby[index]}</p>
                )}
            </div>

            <button
                type="button"
                className="lightbox-close"
                onClick={onClose}
                aria-label="Close lightbox"
            >
                ×
            </button>
        </div>,
        document.body
    )
}
