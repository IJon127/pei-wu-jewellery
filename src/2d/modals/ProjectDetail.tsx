import type { PortfolioItem } from '../sectionTypes'

export interface ProjectDetailProps {
    project: PortfolioItem
}

export function ProjectDetail({ project }: ProjectDetailProps) {
    const { title, year, description, images } = project
    const otherImages = images.slice(1)
    const hasGallery = otherImages.length > 0

    return (
        <article className="single-project">
            <header className="single-project-header">
                <h2 id="modal-title" className="modal-title single-project-title">
                    {title}
                </h2>
                <time className="single-project-date" dateTime={year}>
                    {year}
                </time>
            </header>

            <div className="single-project-body">
                <p className="single-project-description">{description}</p>
            </div>

            {hasGallery && (
                <div className="single-project-gallery" aria-label="More images">
                    {otherImages.map((src, i) => (
                        <img
                            key={`${src}-${i}`}
                            className="single-project-gallery-img"
                            src={src}
                            alt={`${title} — detail ${i + 1}`}
                        />
                    ))}
                </div>
            )}
        </article>
    )
}
