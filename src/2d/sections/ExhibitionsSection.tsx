import { useScrollReveal } from '../../hooks/useScrollReveal'
import type { SectionProps } from '../sectionTypes'

export function ExhibitionsSection({ scrollTop, align = 'left', portfolioData, onOpenModal }: SectionProps) {
    const allExhibitions = portfolioData?.exhibitions || []
    const selectedIndices = portfolioData?.selected?.exhibitions || []
    const exhibitions = selectedIndices.map(ref => allExhibitions[ref]).filter(Boolean)
    const ref = useScrollReveal<HTMLDivElement>()

    return (
        <div className={`scroll-section section-align-${align}`} style={{ top: `${scrollTop}dvh` }}>
            <div className="section-exhibitions" ref={ref}>
                <div className="section-header-row">
                    <span className="section-idx" data-reveal data-reveal-delay="0">03</span>
                    <h2 className="section-title" data-reveal data-reveal-delay="0">Exhibitions</h2>
                </div>
                <ul className="section-list">
                    {exhibitions.map((ex, i) => (
                        <li key={ex.id} className="exhibition-row" data-reveal data-reveal-delay={String(i + 1)}>
                            <button
                                type="button"
                                className="exhibition-row--btn"
                                onClick={() => onOpenModal?.('allExhibitions', ex.id)}
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
                    data-reveal
                    data-reveal-delay={String(exhibitions.length + 1)}
                    onClick={() => onOpenModal?.('allExhibitions')}
                >
                    View All →
                </button>
            </div>
        </div>
    )
}
