import { useState } from 'react'
import type { PortfolioItem } from '../sectionTypes'
import { Lightbox } from '../components/Lightbox'

export interface ProjectDetailProps {
    project: PortfolioItem
}

export function ProjectDetail({ project }: ProjectDetailProps) {
    const { title, year, description, images, photoby, names, sizes, materials } = project
    const hasGallery = images.length > 0
    // const materialArray = materials.split(',').map(m => m.trim())
    const descriptionLines = description.split('\n').map(line => line.trim())

    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

    return (
        <article className="project-detail">
            <header className="project-detail-header">
                <h2 className="modal-detail-title">{title}</h2>
                <div className="project-detail-meta">{year}</div>
            </header>

            <div className="project-detail-body">
                {descriptionLines.map((line, i) => (
                    <p key={i} className="project-detail-description">{line}</p>
                ))}
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
                    names={names}
                    sizes={sizes}
                    materials={materials}
                    onClose={() => setLightboxIndex(null)}
                />
            )}
        </article>
    )
}
