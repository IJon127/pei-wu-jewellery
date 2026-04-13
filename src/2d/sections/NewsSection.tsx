import { useScrollReveal } from '../../hooks/useScrollReveal'
import type { SectionProps } from '../sectionTypes'

export function NewsSection({ scrollTop, align = 'left', portfolioData }: SectionProps) {
    const news = portfolioData?.news || []
    const ref = useScrollReveal<HTMLDivElement>()

    return (
        <div className={`scroll-section section-align-${align}`} style={{ top: `${scrollTop}dvh` }}>
            <div className="section-news" ref={ref}>
                <div className="section-header-row">
                    <span className="section-idx" data-reveal data-reveal-delay="0">06</span>
                    <h2 className="section-title" data-reveal data-reveal-delay="0">News</h2>
                </div>
                <ul className="section-list">
                    {news.map((item, i) => {
                        return (
                            <li key={i} className="news-item" data-reveal data-reveal-delay={String(i + 1)}>
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
