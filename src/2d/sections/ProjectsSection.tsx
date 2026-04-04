interface Props { scrollTop: number }

const projects = [
    { id: '01', title: 'Liminal Vessels', year: '2024', material: 'Silver, Oxidised Copper' },
    { id: '02', title: 'Bone Lace', year: '2023', material: 'Gold, Textile' },
    { id: '03', title: 'Still Water', year: '2023', material: 'Resin, Steel Wire' },
    { id: '04', title: 'Echo Chamber', year: '2022', material: 'Bronze, Pearls' },
]

export function ProjectsSection({ scrollTop }: Props) {
    return (
        <div className="scroll-section section-tall" style={{ top: `${scrollTop}vh` }}>
            <div className="section-projects">
                <div className="section-header-row">
                    <span className="section-idx">02</span>
                    <h2 className="section-title">Projects</h2>
                </div>
                <div className="projects-grid">
                    {projects.map(p => (
                        <div key={p.id} className="project-card">
                            <div className="project-img-placeholder" />
                            <div className="project-meta">
                                <span className="project-year">{p.year}</span>
                                <h3 className="project-name">{p.title}</h3>
                                <p className="project-material">{p.material}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
