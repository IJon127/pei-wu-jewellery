import { useState } from 'react'
import type { PortfolioItem } from '../sectionTypes'
import { Lightbox } from '../components/Lightbox'

export interface BespokeDetailProps {
    piece: PortfolioItem
}

export function BespokeDetail({ piece }: BespokeDetailProps) {
    const { title, year, introduction, description, material, images, photoby } = piece
    const mainImage = images && images.length > 0 ? images[0] : ''
    const galleryImages = images.slice(1)
    const materials = material ? material.split(',').map(m => m.trim()).filter(Boolean) : []

    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

    return (
        <article className="bespoke-detail">
            {/* Two-col header: image left, meta right */}
            <header className="bespoke-detail-header">
                <div className="bespoke-detail-header-left">
                    {mainImage && (
                        <button
                            type="button"
                            className="lightbox-trigger"
                            onClick={() => setLightboxIndex(0)}
                            aria-label="View main image"
                        >
                            <img src={mainImage} className="bespoke-detail-main-img" alt={title} />
                        </button>
                    )}
                </div>
                <div className="bespoke-detail-header-right">
                    <h2 id="modal-title" className="bespoke-detail-title">
                        {title}
                    </h2>
                    {introduction && (
                        <p className="bespoke-detail-introduction">{introduction}</p>
                    )}
                    <div className="bespoke-detail-meta">
                        {year && (
                            <div className="project-detail-meta-row">
                                <span className="project-detail-label">Year</span>
                                <span className="project-detail-value">{year}</span>
                            </div>
                        )}
                        {materials.length > 0 && (
                            <div className="project-detail-meta-row">
                                <span className="project-detail-label">Materials</span>
                                <span className="project-detail-value">{materials.join(', ')}</span>
                            </div>
                        )}
                        {photoby && photoby.length > 0 && (
                            <div className="project-detail-meta-row">
                                <span className="project-detail-label">Photo by</span>
                                <span className="project-detail-value">{photoby.join(', ')}</span>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Description body */}
            {description && (
                <div className="bespoke-detail-body">
                    <p className="bespoke-detail-description">{description}</p>
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
