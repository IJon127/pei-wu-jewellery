import type { BespokeDetail as BespokeDetailData } from '../sectionTypes'

export interface BespokeDetailProps {
    piece: BespokeDetailData
}

export function BespokeDetail({ piece }: BespokeDetailProps) {
    const { title, year, type, description, images } = piece
    const hasGallery = images && images.length > 0

    return (
        <article className="exhibition-detail bespoke-detail">
            <header className="exhibition-detail-header">
                <h2 id="section-detail-title" className="section-detail-title exhibition-detail-title">
                    {title}
                </h2>
                <time className="exhibition-detail-date" dateTime={year}>
                    {year}
                </time>
            </header>

            <p className="exhibition-detail-venue bespoke-type-subtitle">
                {type}
            </p>

            <div className="exhibition-detail-body">
                <p className="exhibition-detail-description">{description}</p>
            </div>

            {hasGallery && (
                <div className="exhibition-detail-gallery" aria-label={`${title} images`}>
                    {images.map((src, i) => (
                        <img
                            key={`${src}-${i}`}
                            className="exhibition-detail-gallery-img"
                            src={src}
                            alt={`${title} — image ${i + 1}`}
                        />
                    ))}
                </div>
            )}
        </article>
    )
}
