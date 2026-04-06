import type { PortfolioItem } from '../sectionTypes'

export interface ExhibitionDetailProps {
    exhibition: PortfolioItem
}

export function ExhibitionDetail({ exhibition }: ExhibitionDetailProps) {
    const { title, year, material, size, description, images } = exhibition
    const hasGallery = images.length > 0

    return (
        <article className="exhibition-detail">
            <header className="exhibition-detail-header">
                <h2 id="modal-title" className="modal-title exhibition-detail-title">
                    {title}
                </h2>
                <time className="exhibition-detail-date" dateTime={year}>
                    {year}
                </time>
            </header>

            <p className="exhibition-detail-venue">
                {material}{size ? `, ${size}` : ''}
            </p>

            <div className="exhibition-detail-body">
                <p className="exhibition-detail-description">{description}</p>
            </div>

            {hasGallery && (
                <div className="exhibition-detail-gallery" aria-label="Exhibition images">
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
