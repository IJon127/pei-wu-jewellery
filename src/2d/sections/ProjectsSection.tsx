import { useScrollReveal } from '../../hooks/useScrollReveal'
import type { SectionProps } from '../sectionTypes'

export function ProjectsSection({ scrollTop, align = 'left', portfolioData, onOpenModal }: SectionProps) {
    const allProjects = portfolioData?.projects || []

    const selectedProjects = (portfolioData?.selected?.projects || []).map(ref => {
        const byId = allProjects.find(p => p.id === String(ref) || p.id === `0${ref}`);
        if (byId) return byId;
        return allProjects[ref] || allProjects[0]
    }).filter(Boolean)

    const ref = useScrollReveal<HTMLDivElement>()

    return (
        <div className={`scroll-section section-tall section-align-${align}`} style={{ top: `${scrollTop}vh` }}>
            <div className="section-projects" ref={ref}>
                <div className="section-header-row" style={{ marginBottom: '8rem' }}>
                    <span className="section-idx" data-reveal data-reveal-delay="0">02</span>
                    <h2 className="section-title" data-reveal data-reveal-delay="0">Projects</h2>
                </div>

                <div className="projects-grid">
                    {selectedProjects.map((p, i) => {
                        const mainImage = p.images && p.images[0] ? p.images[0] : p.image
                        return (
                            <div key={`${p.id}-${i}`} className="project-item" data-reveal data-reveal-delay={String(i + 1)}>
                                <button className="project-item-btn" onClick={() => onOpenModal?.('project', p.id)}>
                                    <img className="project-item-img" src={mainImage} alt={p.title} />
                                    <div className="project-item-info">
                                        <h3 className="project-item-title">{p.title}</h3>
                                        <div className="project-item-divider" />
                                        <span className="project-item-subtitle">{p.year}</span>
                                    </div>
                                </button>
                            </div>
                        )
                    })}

                    <button
                        type="button"
                        className="project-item project-item--more"
                        data-reveal
                        data-reveal-delay={String(selectedProjects.length + 1)}
                        onClick={() => onOpenModal?.('allProjects')}
                    >
                        <div className="project-more-btn">More →</div>
                    </button>
                </div>
            </div>
        </div>
    )
}
