import { useEffect } from 'react'
import { AllExhibitions } from './modals/AllExhibitions'
import { AllPress } from './modals/AllPress'
import { AllProjects } from './modals/AllProjects'
import type { ModalKind } from './sectionTypes'

// const titles: Record<ModalKind, string> = {
//     allProjects: 'Projects',
//     allExhibitions: 'Exhibitions',
//     allPress: 'Press',
// }

export interface ModalProps {
    kind: ModalKind | null
    onClose: () => void
    onOpenModal: (kind: ModalKind) => void
}

export function Modal({ kind, onClose, onOpenModal }: ModalProps) {
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
                    {/* create a return button that goes back to the previous section, only show if kind is not 'allProjects', 'allExhibitions', or 'allPress'*/}
                    {kind == 'allProjects' && (
                        <button type="button" className="section-detail-back" onClick={onClose} aria-label="Back">
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
                </div>
            </div>
        </div>
    )
}
