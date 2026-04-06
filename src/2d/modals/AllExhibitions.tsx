import type { ModalKind, PortfolioItem } from '../sectionTypes'

export interface AllExhibitionsProps {
    exhibitions: PortfolioItem[]
    onOpenModal: (kind: ModalKind, id?: string) => void
}

export function AllExhibitions({ exhibitions, onOpenModal }: AllExhibitionsProps) {
    return (
        <ul className="section-list">
            {exhibitions.map(ex => (
                <li key={ex.id} className="exhibition-row">
                    <div className="ex-modal-row">
                        <span className="ex-year">{ex.year}</span>
                        <div className="ex-info">
                            <span className="ex-title ex-modal-title">{ex.title}</span>
                            <div className="ex-location">
                                <span className="ex-venue">{ex.venue}</span>
                                <span className="ex-city">{ex.city}</span>
                            </div>
                        </div>
                        <img className="ex-img" src={ex.image} alt={ex.title} />
                    </div>
                </li>
            ))}
        </ul>
    )
}
