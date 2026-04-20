import { useEffect, useRef } from 'react'
import type { ModalKind, PortfolioItem } from '../sectionTypes'

export interface AllExhibitionsProps {
    exhibitions: PortfolioItem[]
    onOpenModal: (kind: ModalKind, id?: string) => void
    /** If set, the list will scroll this exhibition into view on mount */
    highlightId?: string
}

export function AllExhibitions({ exhibitions, highlightId }: AllExhibitionsProps) {
    const listRef = useRef<HTMLUListElement>(null)

    const reversedExhibitions = [...exhibitions].reverse();

    useEffect(() => {
        if (!highlightId || !listRef.current) return

        const target = listRef.current.querySelector<HTMLElement>(`[data-ex-id="${highlightId}"]`)
        if (!target) return

        target.classList.add('exhibition-row--highlight')

        // Find the nearest scrollable ancestor (the modal-body div)
        const findScrollParent = (el: HTMLElement): HTMLElement | null => {
            let node: HTMLElement | null = el.parentElement
            while (node) {
                const overflow = getComputedStyle(node).overflowY
                if (overflow === 'auto' || overflow === 'scroll') return node
                node = node.parentElement
            }
            return null
        }

        setTimeout(() => {
            const scrollContainer = findScrollParent(target)
            if (!scrollContainer) return
            const containerTop = scrollContainer.getBoundingClientRect().top
            const targetTop = target.getBoundingClientRect().top
            const offset = targetTop - containerTop - scrollContainer.clientHeight / 2 + target.clientHeight / 2
            scrollContainer.scrollBy({ top: offset, behavior: 'smooth' })
        }, 80)
    }, [highlightId])

    return (
        <ul className="section-list" ref={listRef}>
            {reversedExhibitions.map(ex => (
                <li key={ex.id} className="exhibition-row" data-ex-id={ex.id}>
                    <div className="ex-modal-row">
                        <span className="ex-year">{ex.year}</span>

                        <div className="ex-info">
                            <div>
                                <div className="ex-title ex-modal-title">{ex.title}</div>
                                <div className="ex-location">
                                    <span className="ex-venue">{ex.venue}</span>
                                    <span className="ex-city">{ex.city}</span>
                                </div>
                                <div className="ex-type">{ex.type}</div>
                            </div>
                            {ex.link && <a className="ex-link" href={ex.link} target="_blank" rel="noopener noreferrer">more ↗</a>}

                        </div>
                        <img className="ex-img" src={ex.image} alt={ex.title} />
                    </div>
                </li>
            ))}
        </ul>
    )
}
