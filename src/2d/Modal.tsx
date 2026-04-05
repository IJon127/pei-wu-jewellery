import { useEffect } from 'react'
import { AllExhibitions } from './modals/AllExhibitions'
import { AllPress } from './modals/AllPress'
import { AllProjects } from './modals/AllProjects'
import { ExhibitionDetail } from './modals/ExhibitionDetail'
import { ProjectDetail } from './modals/ProjectDetail'
import { AllBespoke } from './modals/AllBespoke'
import { BespokeDetail } from './modals/BespokeDetail'
import { getExhibitionById } from './sections/ExhibitionsSection'
import { getProjectById } from './sections/ProjectsSection'
import { getBespokeById } from './sections/BespokeSection'
import type { ModalKind } from './sectionTypes'

const titles: Record<string, string> = {
    allProjects: 'Projects',
    allExhibitions: 'Exhibitions',
    allPress: 'Press',
    allBespoke: 'Bespoke',
}

export interface ModalProps {
    kind: ModalKind | null
    selectedProjectId: string | null
    selectedExhibitionId: string | null
    selectedBespokeId: string | null
    onClose: () => void
    onOpenModal: (kind: ModalKind, id?: string) => void
}

export function Modal({ kind, selectedProjectId, selectedExhibitionId, selectedBespokeId, onClose, onOpenModal }: ModalProps) {
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

    const exhibitionDetail =
        kind === 'exhibition' && selectedExhibitionId
            ? getExhibitionById(selectedExhibitionId)
            : undefined

    const bespokeDetail =
        kind === 'bespoke' && selectedBespokeId
            ? getBespokeById(selectedBespokeId)
            : undefined

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
                    {(kind === 'allProjects' || kind === 'allExhibitions' || kind === 'allPress' || kind === 'allBespoke') && (
                        <h2 id="section-detail-title" className="section-detail-title">{titles[kind]}</h2>
                    )}
                    {kind === 'project' && (
                        <button
                            type="button"
                            className="section-detail-back"
                            onClick={() => onOpenModal('allProjects')}
                            aria-label= "Back to projects"
                        >
                            ←
                        </button>
                    )}
                    {kind === 'exhibition' && (
                        <button
                            type="button"
                            className="section-detail-back"
                            onClick={() => onOpenModal('allExhibitions')}
                            aria-label= "Back to exhibitions"
                        >
                            ←
                        </button>
                    )}
                    {kind === 'bespoke' && (
                        <button
                            type="button"
                            className="section-detail-back"
                            onClick={() => onOpenModal('allBespoke')}
                            aria-label= "Back to bespoke"
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
                    {kind === 'exhibition' && exhibitionDetail && (
                        <ExhibitionDetail exhibition={exhibitionDetail} />
                    )}
                    {kind === 'exhibition' && !exhibitionDetail && (
                        <p className="exhibition-detail-missing">Exhibition not found.</p>
                    )}
                    {kind === 'allBespoke' && <AllBespoke onOpenModal={onOpenModal} />}
                    {kind === 'bespoke' && bespokeDetail && (
                        <BespokeDetail piece={bespokeDetail} />
                    )}
                    {kind === 'bespoke' && !bespokeDetail && (
                        <p className="exhibition-detail-missing">Piece not found.</p>
                    )}
                </div>
            </div>
        </div>
    )
}
