import type { PortfolioItem } from '../sectionTypes'

export interface AllPressProps {
    press: PortfolioItem[]
}

export function AllPress({ press }: AllPressProps) {
    return (
        <ul className="section-list press-list">
            {press.map((item, i) => (
                <li key={i} className="press-row">
                    <button type="button" className="press-row-btn" onClick={() => console.log('open press link in new tab')}>
                        {/* <p className="press-quote">&ldquo;{item.quote}&rdquo;</p>
                        <div className="press-info">
                            <span className="press-type">{item.pub}</span>
                            <span className="press-date">{item.date}</span>
                        </div> */}
                    </button>
                </li>
            ))}
        </ul>
    )
}
