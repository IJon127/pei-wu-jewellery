import type { SectionProps } from '../sectionTypes'

export function BespokeSection({ scrollTop, align = 'left', portfolioData, onOpenModal }: SectionProps) {
    const bespokePieces = portfolioData?.bespoke || []

    return (
        <div className={`scroll-section section-align-${align}`} style={{ top: `${scrollTop}vh` }}>
            <div className="section-bespoke">
                <div className="section-header-row">
                    <span className="section-idx">05</span>
                    <h2 className="section-title">Bespoke</h2>
                </div>
                <p className="bespoke-description">
                    Bespoke works are silent vessels translating intimate milestones—<br />
                    from weddings to private stories—into a tangible form.
                </p>
                <ul className="section-list">
                    {bespokePieces.map((piece) => (
                        <li key={piece.id} className="exhibition-row bespoke-row">
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
                                <div>
                                    <div className="bespoke-title">{piece.title}</div>
                                    <div className="bespoke-introduction">{piece.introduction}</div>
                                </div>
                            </button>
                        </li>
                    ))}
                </ul>
                <button
                    type="button"
                    className="section-more-btn section-more-btn-right-align"
                    onClick={() => onOpenModal?.('allBespoke')}
                >
                    View All →
                </button>
            </div>
        </div>
    )
}
