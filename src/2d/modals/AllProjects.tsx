import type { ModalKind, PortfolioItem } from '../sectionTypes'

export interface AllProjectsProps {
    projects: PortfolioItem[]
    onOpenModal: (kind: ModalKind, id?: string) => void
}

export function AllProjects({ projects, onOpenModal }: AllProjectsProps) {
    return (
        <ul className="all-projects-grid">
            {projects.map(p => {
                const mainImage = p.images && p.images.length > 0 ? p.images[0] : ''
                return (
                    <li key={p.id} className="project-item">
                        <button className="project-item-btn" onClick={() => onOpenModal?.('project', p.id)}>
                            <img className="project-item-img" src={mainImage} alt={p.title} />
                            <div className="project-item-info">
                                <h3 className="project-item-title">{p.title}</h3>
                                <div className="project-item-divider" />
                                <span className="project-item-subtitle">{p.year}</span>
                            </div>
                        </button>
                    </li>
                )
            })}
        </ul>
    )
}
