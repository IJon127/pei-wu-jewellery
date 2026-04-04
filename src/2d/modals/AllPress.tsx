import type { ModalKind } from '../sectionTypes'
import { pressItems } from '../sections/PressSection'

export interface AllPressProps {
    onOpenModal: (kind: ModalKind) => void
}

export function AllPress() {
    return (
        <ul className="press-list">
            {pressItems.map((item, i) => (
                <li key={i} className="press-row">
                    <button type="button" className="press-row-btn" onClick={() => console.log('open press link in new tab')}>
                    <p className="press-quote">&ldquo;{item.quote}&rdquo;</p>
                    <div className="press-byline">
                            <span className="press-pub">{item.pub}</span>
                            <span className="press-date">{item.date}</span>
                        </div>
                    </button>
                </li>
            ))}
        </ul>
    )
}
