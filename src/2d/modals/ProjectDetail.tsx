import { useState } from 'react'
import type { PortfolioItem } from '../sectionTypes'
import { Lightbox } from '../components/Lightbox'

export interface ProjectDetailProps {
    project: PortfolioItem
}

export function ProjectDetail({ project }: ProjectDetailProps) {
    const { title, year, description, images, size, material, photoby } = project
    const hasGallery = images.length > 0
    const materials = material.split(',').map(m => m.trim())

    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

    return (
        <article className="project-detail">
            <header className="project-detail-header">
                <h2 id="modal-title" className="project-detail-title">
                    {title}
                </h2>
                <div className="project-detail-meta">
                    <div className="project-detail-meta-row">
                        <span className="project-detail-label">Year</span>
                        <span className="project-detail-value">{year}</span>
                    </div>
                    {size && (
                        <div className="project-detail-meta-row">
                            <span className="project-detail-label">Size</span>
                            <span className="project-detail-value">{size}</span>
                        </div>
                    )}
                    {material && (
                        <div className="project-detail-meta-row">
                            <span className="project-detail-label">Materials</span>
                            {materials.map((m, i) => <span key={i} className="project-detail-material">{m}</span>)}
                        </div>
                    )}
                </div>
            </header>

            <div className="project-detail-body">
                <p className="project-detail-description">{description}</p>
            </div>

            {hasGallery && (
                <div className="project-detail-gallery" aria-label="More images">
                    {images.map((src, i) => (
                        <button
                            key={`${src}-${i}`}
                            type="button"
                            className="lightbox-trigger"
                            onClick={() => setLightboxIndex(i)}
                            aria-label={`View image ${i + 1}`}
                        >
                            <img
                                className="project-detail-gallery-img"
                                src={src}
                                alt={`${title} — detail ${i + 1}`}
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
