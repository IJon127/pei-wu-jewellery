import type { PortfolioItem } from '../sectionTypes'

export interface BespokeDetailProps {
    piece: PortfolioItem
}

export function BespokeDetail({ piece }: BespokeDetailProps) {
    const { title, year, introduction, description, material, images, photoby } = piece
    const mainImage = images && images.length > 0 ? images[0] : ''
    const galleryImages = images.slice(1)
    const materials = material ? material.split(',').map(m => m.trim()).filter(Boolean) : []

    return (
        <article className="bespoke-detail">
            {/* Two-col header: image left, meta right */}
            <header className="bespoke-detail-header">
                <div className="bespoke-detail-header-left">
                    {mainImage && <img src={mainImage} className="bespoke-detail-main-img" alt={title} />}
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
                        <img
                            key={`${src}-${i}`}
                            className="bespoke-detail-gallery-img"
                            src={src}
                            alt={`${title} — image ${i + 1}`}
                        />
                    ))}
                </div>
            )}
        </article>
    )
}
