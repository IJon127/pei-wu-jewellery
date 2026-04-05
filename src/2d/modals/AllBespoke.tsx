import type { ModalKind } from '../sectionTypes'
import { bespokePieces } from '../sections/BespokeSection'

export interface AllBespokeProps {
    onOpenModal: (kind: ModalKind, id?: string) => void
}

export function AllBespoke({ onOpenModal }: AllBespokeProps) {
    return (
        <ul className="exhibitions-list bespoke-modal-list">
            {bespokePieces.map(piece => (
                <li key={piece.id} className="exhibition-row bespoke-modal-row">
                    <button
                        type="button"
                        className="exhibition-row--btn bespoke-row--btn"
                        onClick={() => onOpenModal('bespoke', piece.id)}
                    >
                        <span className="ex-year bespoke-year">{piece.year}</span>
                        <span className="ex-title bespoke-title">{piece.title}</span>
                        <span className="ex-venue bespoke-type">{piece.type}</span>
                        <div className="bespoke-img-wrapper">
                            <img src={piece.img} alt={piece.title} className="bespoke-img" />
                        </div>
                    </button>
                </li>
            ))}
        </ul>
    )
}
