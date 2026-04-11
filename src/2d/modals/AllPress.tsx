import type { PortfolioItem } from '../sectionTypes'

export interface AllPressProps {
    press: PortfolioItem[]
}

export function AllPress({ press }: AllPressProps) {
    return (
        <div className="section-list press-list">
            {press.map((item, i) => (
                <div key={`${item.title}-${i}`} className="press-row" style={{ borderTop: '1px solid rgba(20, 10, 20, 0.1)', paddingTop: '1rem' }}>
                    <p className="press-title">{item.title}
                        {item.link && <a className="news-link" href={item.link} target="_blank" rel="noopener noreferrer">↗</a>}
                    </p>
                    <div className="press-info">
                        <span className="press-type">{item.type}</span>
                        <span className="press-date">{item.date}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}
