import type { SectionProps } from '../sectionTypes'

const LAYOUT_SPECS = [
    { aspectRatio: '3/4', width: 1, xOffset: 0, yOffset: 0 },
    { aspectRatio: '3/4', width: 0.75, xOffset: 24, yOffset: 80 },
    { aspectRatio: '4/3', width: 1, xOffset: -16, yOffset: 40 },
    { aspectRatio: '1/1', width: 0.6, xOffset: 32, yOffset: -20 },
    { aspectRatio: '3/4', width: 0.75, xOffset: 8, yOffset: 56 },
    { aspectRatio: '3/4', width: 1, xOffset: -24, yOffset: -50 },
    { aspectRatio: '3/4', width: 0.75, xOffset: 30, yOffset: -30 }
]

export function ProjectsSection({ scrollTop, align = 'left', portfolioData, onOpenModal }: SectionProps) {
    // Determine the 7 projects to show by matching the 'selected' indices.
    // Assuming the number refers to the array index (or row number - 2).
    const allProjects = portfolioData?.projects || []

    // Attempt to resolve by ID string (e.g. '03' or '3') or fallback to row index arithmetic 
    const selectedProjects = (portfolioData?.selected?.projects || []).map(ref => {
        const byId = allProjects.find(p => p.id === String(ref) || p.id === `0${ref}`);
        if (byId) return byId;
        // fallback to array index if it was a row number
        return allProjects[ref] || allProjects[0]
    }).filter(Boolean)

    // Ensure we don't exceed the number of layouts available
    const displayProjects = selectedProjects.slice(0, LAYOUT_SPECS.length)
    return (
        <div className={`scroll-section section-tall section-align-${align}`} style={{ top: `${scrollTop}vh` }}>
            <div className="section-projects">
                <div className="section-header-row" style={{ marginBottom: '15rem' }}>
                    <span className="section-idx">02</span>
                    <h2 className="section-title">Projects</h2>
                </div>

                <div className="projects-mosaic">
                    {displayProjects.map((p, i) => {
                        const layout = LAYOUT_SPECS[i]
                        const mainImage = p.images && p.images[0] ? p.images[0] : ''
                        return (
                            <div
                                key={`${p.id}-${i}`}
                                className={`project-block`}
                                style={{
                                    width: layout.width != null ? `${layout.width * 100}%` : undefined,
                                    transform: `translate(${layout.xOffset ?? 0}px, ${layout.yOffset ?? 0}px)`,
                                }}
                            >
                                <button className="project-block-inner-btn" onClick={() => onOpenModal?.('project', p.id)}>
                                    <img
                                        className="project-block-img"
                                        src={mainImage}
                                        alt={p.title}
                                        style={layout.aspectRatio ? { aspectRatio: layout.aspectRatio } : undefined}
                                    />
                                    <div className="project-block-meta">
                                        <span className="project-block-year">{p.year}</span>
                                        <p className="project-block-title">{p.title}</p>
                                    </div>
                                </button>
                            </div>
                        )
                    })}

                    <button
                        type="button"
                        className="project-block project-block--more"
                        onClick={() => onOpenModal?.('allProjects')}
                    >
                        <div className="project-more-btn">More →</div>
                    </button>
                </div>
            </div>
        </div>
    )
}
