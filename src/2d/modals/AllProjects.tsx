import type { SectionDetailKind } from '../sectionTypes'
import { projects } from '../sections/ProjectsSection'

export interface AllProjectsProps {
    onOpenDetail: (kind: SectionDetailKind) => void
}

export function AllProjects({ onOpenDetail }: AllProjectsProps) {
    return (
        <ul className="all-projects-grid">
            {projects.map(p => (
                <li key={p.id} className="section-detail-project-card">
                    <button type="button" className="section-detail-project-card--btn" onClick={() => onOpenDetail('projects')}>
                        <img src={p.image} alt={p.title} />
                    </button>
                </li>
            ))}
        </ul>
    )
}
