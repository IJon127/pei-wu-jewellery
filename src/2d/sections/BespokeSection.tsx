import { useScrollReveal } from '../../hooks/useScrollReveal'
import type { SectionProps } from '../sectionTypes'

export function BespokeSection({ scrollTop, align = 'left', portfolioData, onOpenModal }: SectionProps) {
    const bespokeDescription = portfolioData?.selected?.bespoke
    const bespokePieces = portfolioData?.bespoke || []
    const ref = useScrollReveal<HTMLDivElement>()

    return (
        <div className={`scroll-section section-align-${align}`} style={{ top: `${scrollTop}vh` }}>
            <div className="section-bespoke" ref={ref}>
                <div className="section-header-row">
                    <span className="section-idx" data-reveal data-reveal-delay="0">05</span>
                    <h2 className="section-title" data-reveal data-reveal-delay="0">Bespoke</h2>
                </div>
                <p className="bespoke-description" data-reveal data-reveal-delay="1">
                    {bespokeDescription}
                </p>
                <ul className="section-list">
                    {bespokePieces.map((piece, i) => (
                        <li key={piece.id} className="exhibition-row bespoke-row" data-reveal data-reveal-delay={String(i + 2)}>
                            <button
                                type="button"
                                className="bespoke-row--btn"
                                onClick={() => onOpenModal?.('bespoke', piece.id)}
                            >
                                <div className="bespoke-img-wrapper">
                                    {piece.images && piece.images[0] && (
                                        <img src={piece.images[0]} alt={piece.title} className="bespoke-img" />
                                    )}
                                </div>
                                <div className="bespoke-info">
                                    <div className="bespoke-title">{piece.title}</div>
                                    <div className="bespoke-introduction">{piece.introduction}</div>
                                </div>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
