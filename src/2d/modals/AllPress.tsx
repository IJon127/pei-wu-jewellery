import type { PortfolioItem } from '../sectionTypes'

export interface AllPressProps {
    press: PortfolioItem[]
}

export function AllPress({ press }: AllPressProps) {
    const reversedPress = [...press].reverse()
    return (
        <div className="section-list press-list">
            {reversedPress.map((item, i) => (
                <div key={`${item.title}-${i}`} className="press-row" style={{ borderTop: '1px solid rgba(45, 45, 45, 0.1)', paddingTop: '1rem' }}>
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
