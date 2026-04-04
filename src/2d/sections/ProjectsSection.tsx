import type { ProjectDetail, SectionProps } from '../sectionTypes'

export const projects: ProjectDetail[] = [
    {
        id: '01',
        title: 'Liminal Vessels',
        year: '2024',
        image: '/assets/images/projects/project1.jpg',
        aspectRatio: '3/4',
        width: 1,
        xOffset: 0,
        yOffset: 0,
        description:
            'Hollow silver forms that catch and hold light at their edges. The series asks where an object ends and the space it defines begins — jewellery as threshold rather than ornament.',
        otherImages: ['/assets/images/projects/project2.jpg', '/assets/images/projects/project3.jpg'],
    },
    {
        id: '02',
        title: 'Bone Lace',
        year: '2023',
        image: '/assets/images/projects/project2.jpg',
        aspectRatio: '3/4',
        width: 0.75,
        xOffset: 24,
        yOffset: 80,
        description:
            'Fine structures drawn from bone and textile memory, cast and woven in metal. Each piece carries the tension between fragility and permanence.',
        otherImages: ['/assets/images/projects/project4.png', '/assets/images/projects/project5.png'],
    },
    {
        id: '03',
        title: 'Still Water',
        year: '2023',
        image: '/assets/images/projects/project3.jpg',
        aspectRatio: '4/3',
        width: 1,
        xOffset: -16,
        yOffset: 40,
        description:
            'Surfaces polished to a quiet plane, like water held still. The work is about reflection — literal and emotional — and the calm before movement.',
        otherImages: ['/assets/images/projects/project6.png', '/assets/images/projects/project1.jpg'],
    },
    {
        id: '04',
        title: 'Echo Chamber',
        year: '2022',
        image: '/assets/images/projects/project4.png',
        aspectRatio: '1/1',
        width: 0.6,
        xOffset: 32,
        yOffset: -20,
        description:
            'Circular and resonant forms that repeat and answer each other. Worn on the body, they suggest sound made visible — repetition as comfort.',
        otherImages: ['/assets/images/projects/project5.png', '/assets/images/projects/project6.png'],
    },
    {
        id: '05',
        title: 'Veil & Bone',
        year: '2022',
        image: '/assets/images/projects/project5.png',
        aspectRatio: '3/4',
        width: 0.75,
        xOffset: 8,
        yOffset: 56,
        description:
            'Layered metal veils over solid core shapes. Concealment and reveal are built into the same object; the wearer chooses how much to show.',
        otherImages: ['/assets/images/projects/project9.png'],
    },
    {
        id: '06',
        title: 'Bone Lace',
        year: '2023',
        image: '/assets/images/projects/project6.png',
        aspectRatio: '3/4',
        width: 1,
        xOffset: -24,
        yOffset: -50,
        description:
            'A second chapter in the Bone Lace study: darker patinas and tighter weave. The body becomes a site where craft and anatomy meet.',
        otherImages: ['/assets/images/projects/project2.jpg', '/assets/images/projects/project5.png', '/assets/images/projects/project3.jpg'],
    },
    {
        id: '09',
        title: 'Veil & Bone',
        year: '2022',
        image: '/assets/images/projects/project9.png',
        aspectRatio: '3/4',
        width: 0.75,
        xOffset: 30,
        yOffset: -30,
        description:
            'Variant studies in veil weight and edge treatment. Each iteration tests how thin metal can become before it loses its voice.',
        otherImages: ['/assets/images/projects/project4.png', '/assets/images/projects/project6.png'],
    },
]

export function getProjectById(id: string): ProjectDetail | undefined {
    return projects.find(p => p.id === id)
}

export function ProjectsSection({ scrollTop, align = 'left', onOpenModal }: SectionProps) {
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
