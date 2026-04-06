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
                    <li key={p.id} className="modal-project-card">
                        <button
                            type="button"
                            className="modal-project-card--btn"
                            onClick={() => onOpenModal('project', p.id)}
                        >
                            {mainImage && <img src={mainImage} alt={p.title} />}
                        </button>
                    </li>
                )
            })}
        </ul>
    )
}
