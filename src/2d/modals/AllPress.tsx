import type { SectionDetailKind } from '../sectionTypes'
import { pressItems } from '../sections/PressSection'

export interface AllPressProps {
    onOpenDetail: (kind: SectionDetailKind) => void
}

export function AllPress({ onOpenDetail }: AllPressProps) {
    return (
        <ul className="press-items">
            {pressItems.map((item, i) => (
                <li key={i} className="press-item">
                    <button type="button" className="press-item--btn" onClick={() => onOpenDetail('press')}>
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
