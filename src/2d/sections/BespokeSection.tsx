import type { BespokeDetail, SectionProps } from '../sectionTypes'

export const bespokePieces: BespokeDetail[] = [
    { id: 'fluid-metal', year: '2023', title: 'Fluid Metal Study', type: 'Bespoke Ring', img: '/assets/images/photos/photo1.png', description: 'A study in fluid metal casting, capturing the organic flow of silver as it cools and solidifies.', images: ['/assets/images/photos/photo1.png', '/assets/images/photos/photo5.png'] },
    { id: 'bio-resin', year: '2022', title: 'Bio-resin Casting', type: 'Commissioned Earring', img: '/assets/images/photos/photo2.png', description: 'Commissioned earrings encasing delicate bio-resins within a rigid silver framework, exploring the boundary between natural and synthetic.', images: ['/assets/images/photos/photo2.png'] },
    { id: 'oxidised-bloom', year: '2023', title: 'Oxidised Bloom', type: 'Private Brooch', img: '/assets/images/photos/photo3.png', description: 'A brooch capturing the momentary beauty of an unfolding petal, rendered timeless through deep oxidation techniques.', images: ['/assets/images/photos/photo3.png'] },
    { id: 'digital-void', year: '2024', title: 'Digital Void Form', type: 'Bespoke Sculpture', img: '/assets/images/photos/photo4.png', description: 'A bespoke sculpted form designed digitally and brought into the physical realm, emphasizing the negative space as much as the surrounding material.', images: ['/assets/images/photos/photo4.png'] },
]

export function getBespokeById(id: string): BespokeDetail | undefined {
    return bespokePieces.find(p => p.id === id)
}

export function BespokeSection({ scrollTop, align = 'left', onOpenModal }: SectionProps) {
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
                <ul className="exhibitions-list bespoke-list">
                    {bespokePieces.map((piece) => (
                        <li key={piece.id} className="exhibition-row bespoke-row">
                            <button
                                type="button"
                                className="exhibition-row--btn bespoke-row--btn"
                                onClick={() => onOpenModal?.('bespoke', piece.id)}
                            >
                                <div className="bespoke-img-wrapper">
                                    <img src={piece.img} alt={piece.title} className="bespoke-img" />
                                </div>
                                {/* <span className="ex-year bespoke-year">{piece.year}</span> */}
                                <span className="ex-title bespoke-title">{piece.title}</span>
                                <span className="ex-venue bespoke-type">{piece.type}</span>
                                <span className="ex-year bespoke-year">{piece.year}</span>

                                {/* <div className="bespoke-img-wrapper">
                                    <img src={piece.img} alt={piece.title} className="bespoke-img" />
                                </div> */}
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
