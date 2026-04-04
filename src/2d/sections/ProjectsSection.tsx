import type { ProjectCard, SectionProps } from '../sectionTypes'

export const projects: ProjectCard[] = [
    { id: '01', title: 'Liminal Vessels', year: '2024', image: '/assets/images/projects/project1.jpg', aspectRatio: '3/4', width: 1, xOffset: 0, yOffset: 0 },
    { id: '02', title: 'Bone Lace', year: '2023', image: '/assets/images/projects/project2.jpg', aspectRatio: '3/4', width: 0.75, xOffset: 24, yOffset: 80 },
    { id: '03', title: 'Still Water', year: '2023', image: '/assets/images/projects/project3.jpg', aspectRatio: '4/3', width: 1, xOffset: -16, yOffset: 40 },
    { id: '04', title: 'Echo Chamber', year: '2022', image: '/assets/images/projects/project4.png', aspectRatio: '1/1', width: 0.6, xOffset: 32, yOffset: -20 },
    { id: '05', title: 'Veil & Bone', year: '2022', image: '/assets/images/projects/project5.png', aspectRatio: '3/4', width: 0.75, xOffset: 8, yOffset: 56 },
    { id: '06', title: 'Bone Lace', year: '2023', image: '/assets/images/projects/project6.png', aspectRatio: '3/4', width: 1, xOffset: -24, yOffset: -50 },
    // { id: '07', title: 'Still Water', year: '2023', image: '/assets/images/projects/project7.png', aspectRatio: '4/3', width: 1, xOffset: -16, yOffset: 40 },
    // { id: '08', title: 'Echo Chamber', year: '2022', image: '/assets/images/projects/project8.png', aspectRatio: '1/1', width: 0.8, xOffset: 32, yOffset: -20 },
    { id: '09', title: 'Veil & Bone', year: '2022', image: '/assets/images/projects/project9.png', aspectRatio: '3/4', width: 0.75, xOffset: 30, yOffset: -30 },
]

export function ProjectsSection({ scrollTop, align = 'left', onOpenDetail }: SectionProps) {
    return (
        <div className={`scroll-section section-tall section-align-${align}`} style={{ top: `${scrollTop}vh` }}>
            <div className="section-projects">
                <div className="section-header-row" style={{ marginBottom: '15rem' }}>
                    <span className="section-idx">02</span>
                    <h2 className="section-title">Projects</h2>
                </div>

                <div className="projects-mosaic">
                    {projects.map(p => (
                        <div
                            key={p.id}
                            className={`project-block`}
                            style={{
                                width: p.width != null ? `${p.width * 100}%` : undefined,
                                transform: `translate(${p.xOffset ?? 0}px, ${p.yOffset ?? 0}px)`,
                            }}
                        >
                            <img
                                className="project-block-img"
                                src={p.image}
                                alt={p.title}
                                style={p.aspectRatio ? { aspectRatio: p.aspectRatio } : undefined}
                            />
                            <div className="project-block-meta">
                                <span className="project-block-id">{p.id}</span>
                                <span className="project-block-year">{p.year}</span>
                                <p className="project-block-title">{p.title}</p>
                            </div>
                        </div>
                    ))}

                    {/* "More" glass card */}
                    <button
                        type="button"
                        className="project-block project-block--more"
                        onClick={() => onOpenDetail?.('projects')}
                    >
                        <div className="project-more-btn">More →</div>
                    </button>
                </div>
            </div>
        </div>
    )
}
