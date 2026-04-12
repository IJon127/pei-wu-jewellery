import { useState } from 'react'
import type { PortfolioItem } from '../sectionTypes'
import { Lightbox } from '../components/Lightbox'

export interface BespokeDetailProps {
    piece: PortfolioItem
}

export function BespokeDetail({ piece }: BespokeDetailProps) {
    const { title, description, images, photoby, illustration } = piece
    const mainImage = images && images.length > 0 ? images[0] : ''
    const galleryImages = images.slice(1)

    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

    return (
        <article className="bespoke-detail">
            {/* Two-col header: image left, meta right */}
            <header className="bespoke-detail-header">
                <h2 className="modal-detail-title">{title}</h2>
                <img src={mainImage} className="bespoke-detail-main-img" alt={title} />
            </header>

            {/* Description body */}
            {description && (
                <div className="bespoke-detail-body">
                    <p className="bespoke-detail-description">{description}</p>
                    {illustration && (
                        <img src={illustration} className="bespoke-detail-illustration" />
                    )}
                </div>
            )}



            {/* Additional gallery images */}
            {galleryImages.length > 0 && (
                <div className="bespoke-detail-gallery" aria-label={`${title} images`}>
                    {galleryImages.map((src, i) => (
                        <button
                            key={`${src}-${i}`}
                            type="button"
                            className="lightbox-trigger"
                            onClick={() => setLightboxIndex(i + 1)} // +1 because mainImage is index 0
                            aria-label={`View image ${i + 2}`}
                        >
                            <img
                                className="bespoke-detail-gallery-img"
                                src={src}
                                alt={`${title} — image ${i + 1}`}
                            />
                        </button>
                    ))}
                </div>
            )}

            {lightboxIndex !== null && (
                <Lightbox
                    images={images}
                    initialIndex={lightboxIndex}
                    photoby={photoby}
                    onClose={() => setLightboxIndex(null)}
                />
            )}
        </article>
    )
}
