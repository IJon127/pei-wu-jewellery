import type { SectionProps } from '../sectionTypes'

export function ExhibitionsSection({ scrollTop, align = 'left', portfolioData, onOpenModal }: SectionProps) {
    const exhibitions = portfolioData?.exhibitions || []
    return (
        <div className={`scroll-section section-align-${align}`} style={{ top: `${scrollTop}vh` }}>
            <div className="section-exhibitions">
                <div className="section-header-row">
                    <span className="section-idx">03</span>
                    <h2 className="section-title">Exhibitions</h2>
                </div>
                <ul className="section-list">
                    {exhibitions.map(ex => (
                        <li key={ex.id} className="exhibition-row">
                            <button
                                type="button"
                                className="exhibition-row--btn"
                                onClick={() => onOpenModal?.('exhibition', ex.id)}
                            >
                                <span className="ex-year">{ex.year}</span>
                                <span className="ex-title">{ex.title}</span>
                                <span className="ex-city">{ex.city}</span>
                            </button>
                        </li>
                    ))}
                </ul>
                <button
                    type="button"
                    className="section-more-btn section-more-btn-right-align"
                    onClick={() => onOpenModal?.('allExhibitions')}
                >
                    View All →
                </button>
            </div>
        </div>
    )
}
