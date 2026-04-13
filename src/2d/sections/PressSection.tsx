import { useScrollReveal } from '../../hooks/useScrollReveal'
import type { SectionProps } from '../sectionTypes'

export function PressSection({ scrollTop, align = 'left', portfolioData, onOpenModal }: SectionProps) {
    const allPress = portfolioData?.press || []

    // Attempt to map selected press indices from the fetched data
    const selectedPress = (portfolioData?.selected?.press || []).map(ref => allPress[ref] || allPress[0]).filter(Boolean)
    // Fallback to top 3 if none were cleanly requested
    const displayPress = selectedPress.length > 0 ? selectedPress : allPress.slice(0, 3)
    const ref = useScrollReveal<HTMLDivElement>()

    return (
        <div className={`scroll-section section-align-${align}`} style={{ top: `${scrollTop}dvh` }}>
            <div className="section-press" ref={ref}>
                <div className="section-header-row">
                    <span className="section-idx" data-reveal data-reveal-delay="0">04</span>
                    <h2 className="section-title" data-reveal data-reveal-delay="0">Press</h2>
                </div>
                <div className="section-list press-list">
                    {displayPress.map((item, i) => (
                        <div key={`${item.title}-${i}`} className="press-row" data-reveal data-reveal-delay={String(i + 1)}>
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
                <button type="button" className="section-more-btn" data-reveal data-reveal-delay={String(displayPress.length + 1)} onClick={() => onOpenModal?.('allPress')}>
                    View All →
                </button>
            </div>
        </div>
    )
}
