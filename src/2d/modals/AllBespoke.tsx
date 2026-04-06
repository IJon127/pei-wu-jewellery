import type { ModalKind, PortfolioItem } from '../sectionTypes'

export interface AllBespokeProps {
    bespoke: PortfolioItem[]
    onOpenModal: (kind: ModalKind, id?: string) => void
}

export function AllBespoke({ bespoke, onOpenModal }: AllBespokeProps) {
    return (
        <ul className="section-list">
            {bespoke.map(piece => (
                <li key={piece.id} className="exhibition-row bespoke-modal-row">
                    <button
                        type="button"
                        className="exhibition-row--btn bespoke-row--btn"
                        onClick={() => onOpenModal('bespoke', piece.id)}
                    >
                        <span className="ex-year bespoke-year">{piece.year}</span>
                        <span className="ex-title bespoke-title">{piece.title}</span>
                        <span className="ex-venue bespoke-type">{piece.material}</span>
                        <div className="bespoke-img-wrapper">
                            {piece.images && piece.images[0] && (
                                <img src={piece.images[0]} alt={piece.title} className="bespoke-img" />
                            )}
                        </div>
                    </button>
                </li>
            ))}
        </ul>
    )
}
