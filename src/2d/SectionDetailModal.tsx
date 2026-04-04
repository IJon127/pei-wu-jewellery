import { useEffect } from 'react'
import type { SectionDetailKind } from './sectionTypes'
import { exhibitions } from './sections/ExhibitionsSection'
import { pressItems } from './sections/PressSection'
import { projects } from './sections/ProjectsSection'

interface SectionDetailModalProps {
    kind: SectionDetailKind | null
    onClose: () => void
}

const titles: Record<SectionDetailKind, string> = {
    projects: 'Projects',
    exhibitions: 'Exhibitions',
    press: 'Press',
}

export function SectionDetailModal({ kind, onClose }: SectionDetailModalProps) {
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
                    {kind === 'exhibitions' && (
                        <ul className="exhibitions-list">
                            {exhibitions.map((ex, i) => (
                                <li key={i} className="exhibition-row">
                                    <span className="ex-year">{ex.year}</span>
                                    <span className="ex-title">{ex.title}</span>
                                    <span className="ex-venue">
                                        {ex.venue}, {ex.city}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                    {kind === 'press' && (
                        <div className="press-items">
                            {pressItems.map((item, i) => (
                                <div key={i} className="press-item">
                                    <p className="press-quote">&ldquo;{item.quote}&rdquo;</p>
                                    <div className="press-byline">
                                        <span className="press-pub">{item.pub}</span>
                                        <span className="press-date">{item.date}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {kind === 'projects' && (
                        <div className="section-detail-projects-grid">
                            {projects.map(p => (
                                <article key={p.id} className="section-detail-project-card">
                                    <img
                                        className="section-detail-project-img"
                                        src={p.image}
                                        alt={p.title}
                                        style={p.aspectRatio ? { aspectRatio: p.aspectRatio } : undefined}
                                    />
                                    <div className="project-block-meta">
                                        <span className="project-block-id">{p.id}</span>
                                        <span className="project-block-year">{p.year}</span>
                                        <p className="project-block-title">{p.title}</p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
