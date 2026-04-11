import { useEffect } from 'react'
import { AllExhibitions } from './modals/AllExhibitions'
import { AllPress } from './modals/AllPress'
import { AllProjects } from './modals/AllProjects'
import { ExhibitionDetail } from './modals/ExhibitionDetail'
import { ProjectDetail } from './modals/ProjectDetail'
import { AllBespoke } from './modals/AllBespoke'
import { BespokeDetail } from './modals/BespokeDetail'
import type { ModalKind } from './sectionTypes'
import type { PortfolioData } from './services/sheetApi'

const titles: Record<string, string> = {
    allProjects: 'Projects',
    allExhibitions: 'Exhibitions',
    allPress: 'Press',
    allBespoke: 'Bespoke',
}

export interface ModalProps {
    kind: ModalKind | null
    portfolioData: PortfolioData | undefined
    selectedProjectId: string | null
    selectedExhibitionId: string | null
    selectedBespokeId: string | null
    onClose: () => void
    onOpenModal: (kind: ModalKind, id?: string) => void
}

export function Modal({ kind, portfolioData, selectedProjectId, selectedExhibitionId, selectedBespokeId, onClose, onOpenModal }: ModalProps) {
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

    if (!kind || !portfolioData) return null

    const projectDetail =
        kind === 'project' && selectedProjectId ? portfolioData.projects.find(p => p.id === selectedProjectId) : undefined

    const exhibitionDetail =
        kind === 'exhibition' && selectedExhibitionId
            ? portfolioData.exhibitions.find(p => p.id === selectedExhibitionId)
            : undefined

    const bespokeDetail =
        kind === 'bespoke' && selectedBespokeId
            ? portfolioData.bespoke.find(p => p.id === selectedBespokeId)
            : undefined


    return (
        <div
            className="modal-overlay"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={onClose}
        >
            <div className="modal-panel" onClick={e => e.stopPropagation()}>
                <div className="modal-head">
                    {(kind === 'allProjects' || kind === 'allExhibitions' || kind === 'allPress' || kind === 'allBespoke') && (
                        <h2 id="modal-title" className="modal-title">{titles[kind]}</h2>
                    )}
                    {kind === 'project' && (
                        <button
                            type="button"
                            className="modal-back"
                            onClick={() => onOpenModal('allProjects')}
                            aria-label="Back to projects"
                        >
                            ←
                        </button>
                    )}
                    {kind === 'exhibition' && (
                        <button
                            type="button"
                            className="modal-back"
                            onClick={() => onOpenModal('allExhibitions')}
                            aria-label="Back to exhibitions"
                        >
                            ←
                        </button>
                    )}
                    {kind === 'bespoke' && (
                        <button
                            type="button"
                            className="modal-back"
                            onClick={() => onOpenModal('allBespoke')}
                            aria-label="Back to bespoke"
                        >
                            ←
                        </button>
                    )}
                    <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
                        ×
                    </button>
                </div>
                <div className="modal-body">
                    {kind === 'allProjects' && <AllProjects projects={portfolioData.projects} onOpenModal={onOpenModal} />}
                    {kind === 'allExhibitions' && <AllExhibitions exhibitions={portfolioData.exhibitions} onOpenModal={onOpenModal} />}
                    {kind === 'allPress' && <AllPress press={portfolioData.press} />}
                    {kind === 'project' && projectDetail && <ProjectDetail project={projectDetail} />}
                    {kind === 'project' && !projectDetail && (
                        <p className="project-detail-missing">Project not found.</p>
                    )}
                    {kind === 'exhibition' && exhibitionDetail && (
                        <ExhibitionDetail exhibition={exhibitionDetail} />
                    )}
                    {kind === 'exhibition' && !exhibitionDetail && (
                        <p className="exhibition-detail-missing">Exhibition not found.</p>
                    )}
                    {kind === 'allBespoke' && <AllBespoke bespoke={portfolioData.bespoke} onOpenModal={onOpenModal} />}
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
