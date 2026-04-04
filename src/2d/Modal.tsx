import { useEffect } from 'react'
import { AllExhibitions } from './modals/AllExhibitions'
import { AllPress } from './modals/AllPress'
import { AllProjects } from './modals/AllProjects'
import { ProjectDetail } from './modals/ProjectDetail'
import { getProjectById } from './sections/ProjectsSection'
import type { ModalKind } from './sectionTypes'

// const titles: Record<ModalKind, string> = {
//     allProjects: 'Projects',
//     allExhibitions: 'Exhibitions',
//     allPress: 'Press',
// }

export interface ModalProps {
    kind: ModalKind | null
    selectedProjectId: string | null
    onClose: () => void
    onOpenModal: (kind: ModalKind, projectId?: string) => void
}

export function Modal({ kind, selectedProjectId, onClose, onOpenModal }: ModalProps) {
    useEffect(() => {
        if (!kind) return
        const prev = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        window.addEventListener('keydown', onKey)
        return () => {
            document.body.style.overflow = prev
            window.removeEventListener('keydown', onKey)
        }
    }, [kind, onClose])

    if (!kind) return null

    const projectDetail =
        kind === 'project' && selectedProjectId ? getProjectById(selectedProjectId) : undefined

    return (
        <div
            className="section-detail-overlay"
            role="dialog"
            aria-modal="true"
            aria-labelledby="section-detail-title"
            onClick={onClose}
        >
            <div className="section-detail-panel" onClick={e => e.stopPropagation()}>
                <div className="section-detail-head">
                    {kind === 'allProjects' && (
                        <button type="button" className="section-detail-back" onClick={onClose} aria-label="Back">
                            ←
                        </button>
                    )}
                    {kind === 'project' && (
                        <button
                            type="button"
                            className="section-detail-back"
                            onClick={() => onOpenModal('allProjects')}
                            aria-label="Back to all projects"
                        >
                            ←
                        </button>
                    )}
                    <button type="button" className="section-detail-close" onClick={onClose} aria-label="Close">
                        ×
                    </button>
                </div>
                <div className="section-detail-body">
                    {kind === 'allProjects' && <AllProjects onOpenModal={onOpenModal} />}
                    {kind === 'allExhibitions' && <AllExhibitions onOpenModal={onOpenModal} />}
                    {kind === 'allPress' && <AllPress />}
                    {kind === 'project' && projectDetail && <ProjectDetail project={projectDetail} />}
                    {kind === 'project' && !projectDetail && (
                        <p className="single-project-missing">Project not found.</p>
                    )}
                </div>
            </div>
        </div>
    )
}
