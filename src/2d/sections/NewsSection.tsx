import type { SectionProps } from '../sectionTypes'



export function NewsSection({ scrollTop, align = 'left', portfolioData }: SectionProps) {
    const news = portfolioData?.news || []

    return (
        <div className={`scroll-section section-align-${align}`} style={{ top: `${scrollTop}vh` }}>
            <div className="section-news">
                <div className="section-header-row">
                    <span className="section-idx">06</span>
                    <h2 className="section-title">News</h2>
                </div>
                <ul className="section-list">
                    {news.map((item, i) => {
                        return (
                            <li key={i} className="news-item">
                                <span className="news-date">{item.date}</span>
                                <span className="news-type">{item.type}</span>
                                <p className="news-title">
                                    <span>{item.title} </span>
                                    {item.link && <a className="news-link" href={item.link} target="_blank" rel="noopener noreferrer">↗</a>}
                                </p>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}
