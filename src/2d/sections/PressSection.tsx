import type { SectionProps } from '../sectionTypes'

export function PressSection({ scrollTop, align = 'left', portfolioData, onOpenModal }: SectionProps) {
    const allPress = portfolioData?.press || []
    console.log('JJJJ', allPress)
    console.log('JJJJ', portfolioData?.selected?.press)

    // Attempt to map selected press indices from the fetched data
    const selectedPress = (portfolioData?.selected?.press || []).map(ref => allPress[ref] || allPress[0]).filter(Boolean)
    // Fallback to top 3 if none were cleanly requested
    const displayPress = selectedPress.length > 0 ? selectedPress : allPress.slice(0, 3)
    // console.log('JJJJ', displayPress)
    return (
        <div className={`scroll-section section-align-${align}`} style={{ top: `${scrollTop}vh` }}>
            <div className="section-press">
                <div className="section-header-row">
                    <span className="section-idx">04</span>
                    <h2 className="section-title">Press</h2>
                </div>
                <div className="section-list press-list">
                    {displayPress.map((item, i) => (
                        <div key={`${item.title}-${i}`} className="press-row">
                            <p className="press-quote">{item.title}</p>
                            <div className="press-byline">
                                <span className="press-pub">{item.type}</span>
                                <span className="press-date">{item.date}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <button type="button" className="section-more-btn" onClick={() => onOpenModal?.('allPress')}>
                    View All →
                </button>
            </div>
        </div>
    )
}
