import { useEffect } from 'react'
import { AllExhibitions } from './modals/AllExhibitions'
import { AllPress } from './modals/AllPress'
import { AllProjects } from './modals/AllProjects'
import type { SectionDetailKind } from './sectionTypes'

const titles: Record<SectionDetailKind, string> = {
    projects: 'Projects',
    exhibitions: 'Exhibitions',
    press: 'Press',
}

export interface ModalProps {
    kind: SectionDetailKind | null
    onClose: () => void
    onOpenDetail: (kind: SectionDetailKind) => void
}

export function Modal({ kind, onClose, onOpenDetail }: ModalProps) {
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
                    <h2 id="section-detail-title" className="section-detail-title">
                        {titles[kind]}
                    </h2>
                    <button type="button" className="section-detail-close" onClick={onClose} aria-label="Close">
                        ×
                    </button>
                </div>
                <div className="section-detail-body">
                    {kind === 'exhibitions' && <AllExhibitions onOpenDetail={onOpenDetail} />}
                    {kind === 'press' && <AllPress onOpenDetail={onOpenDetail} />}
                    {kind === 'projects' && <AllProjects onOpenDetail={onOpenDetail} />}
                </div>
            </div>
        </div>
    )
}
