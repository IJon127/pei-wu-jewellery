import type { ModalKind } from '../sectionTypes'
import { projects } from '../sections/ProjectsSection'

export interface AllProjectsProps {
    onOpenModal: (kind: ModalKind, id?: string) => void
}

export function AllProjects({ onOpenModal }: AllProjectsProps) {
    return (
        <ul className="all-projects-grid">
            {projects.map(p => (
                <li key={p.id} className="section-detail-project-card">
                    <button
                        type="button"
                        className="section-detail-project-card--btn"
                        onClick={() => onOpenModal('project', p.id)}
                    >
                        <img src={p.image} alt={p.title} />
                    </button>
                </li>
            ))}
        </ul>
    )
}
