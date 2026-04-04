import type { SectionProps } from '../ScrollContent'

interface ProjectCard {
    id: string
    title: string
    year: string
    /** horizontal nudge in px — positive shifts right */
    xOffset?: number
    /** vertical nudge in px — positive shifts down */
    yOffset?: number
    /** aspect ratio class: 'portrait' | 'landscape' */
    aspect?: 'portrait' | 'square' | 'landscape'
}

const projects: ProjectCard[] = [
    { id: '01', title: 'Liminal Vessels', year: '2024', xOffset: 0, yOffset: 0 },
    { id: '02', title: 'Bone Lace', year: '2023', xOffset: 24, yOffset: 80 },
    { id: '03', title: 'Still Water', year: '2023', xOffset: -16, yOffset: 40 },
    { id: '04', title: 'Echo Chamber', year: '2022', xOffset: 32, yOffset: -20 },
    { id: '05', title: 'Veil & Bone', year: '2022', xOffset: -8, yOffset: 56 },
]

export function ProjectsSection({ scrollTop, align = 'left' }: SectionProps) {
    return (
        <div className={`scroll-section section-tall section-align-${align}`} style={{ top: `${scrollTop}vh` }}>
            <div className="section-projects">
                <div className="section-header-row">
                    <span className="section-idx">02</span>
                    <h2 className="section-title">Projects</h2>
                </div>

                <div className="projects-mosaic">
                    {projects.map(p => (
                        <div
                            key={p.id}
                            className={`project-block`}
                            style={{
                                transform: `translate(${p.xOffset ?? 0}px, ${p.yOffset ?? 0}px)`,
                            }}
                        >
                            <div className="project-block-img" />
                            <div className="project-block-meta">
                                <span className="project-block-id">{p.id}</span>
                                <span className="project-block-year">{p.year}</span>
                                <p className="project-block-title">{p.title}</p>
                            </div>
                        </div>
                    ))}

                    {/* Empty "More" card */}
                    <div
                        className="project-block project-block--more"
                        style={{ transform: 'translate(16px, 32px)' }}
                    >
                        <div className="project-block-img" />
                        <button className="project-more-btn">More →</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
