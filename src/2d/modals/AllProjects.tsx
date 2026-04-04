import type { ModalKind } from '../sectionTypes'
import { projects } from '../sections/ProjectsSection'

export interface AllProjectsProps {
    onOpenModal: (kind: ModalKind) => void
}

export function AllProjects({ onOpenModal }: AllProjectsProps) {
    return (
        <>
        <h2 id="section-detail-title" className="section-detail-title">
            Projects
        </h2>
        <ul className="all-projects-grid">
            {projects.map(p => (
                <li key={p.id} className="section-detail-project-card">
                    <button type="button" className="section-detail-project-card--btn" onClick={() => onOpenModal('project')}>
                        <img src={p.image} alt={p.title} />
                    </button>
                    </li>
                ))}
            </ul>
        </>
    )
}
