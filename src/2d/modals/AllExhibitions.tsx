import type { ModalKind } from '../sectionTypes'
import { exhibitions } from '../sections/ExhibitionsSection'

export interface AllExhibitionsProps {
    onOpenModal: (kind: ModalKind) => void
}

export function AllExhibitions({ onOpenModal }: AllExhibitionsProps) {
    return (
        <>
        <h2 id="section-detail-title" className="section-detail-title">
            Exhibitions
        </h2>
        <ul className="exhibitions-list">
            {exhibitions.map((ex, i) => (
                <li key={i} className="exhibition-row">
                    <button type="button" className="exhibition-row--btn" onClick={() => onOpenModal('allExhibitions')}>
                        <span className="ex-year">{ex.year}</span>
                        <span className="ex-title">{ex.title}</span>
                        <span className="ex-venue">{ex.venue}, {ex.city}</span>
                    </button>
                </li>
            ))}
        </ul>
        </>
    )
}
