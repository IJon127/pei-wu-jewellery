import type { SectionDetailKind } from '../sectionTypes'
import { exhibitions } from '../sections/ExhibitionsSection'

export interface AllExhibitionsProps {
    onOpenDetail: (kind: SectionDetailKind) => void
}

export function AllExhibitions({ onOpenDetail }: AllExhibitionsProps) {
    return (
        <ul className="exhibitions-list">
            {exhibitions.map((ex, i) => (
                <li key={i} className="exhibition-row">
                    <button type="button" className="exhibition-row--btn" onClick={() => onOpenDetail('exhibitions')}>
                        <span className="ex-year">{ex.year}</span>
                        <span className="ex-title">{ex.title}</span>
                        <span className="ex-venue">{ex.venue}, {ex.city}</span>
                    </button>
                </li>
            ))}
        </ul>
    )
}
