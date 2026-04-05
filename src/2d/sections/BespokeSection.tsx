import type { SectionProps } from '../sectionTypes'

const bespokePieces = [
    { year: '2023', title: 'Fluid Metal Study', type: 'Bespoke Ring', img: '/assets/images/photos/photo1.png' },
    { year: '2022', title: 'Bio-resin Casting', type: 'Commissioned Earring', img: '/assets/images/photos/photo2.png' },
    { year: '2023', title: 'Oxidised Bloom', type: 'Private Brooch', img: '/assets/images/photos/photo3.png' },
    { year: '2024', title: 'Digital Void Form', type: 'Bespoke Sculpture', img: '/assets/images/photos/photo4.png' },
]

export function BespokeSection({ scrollTop, align = 'left' }: SectionProps) {
    return (
        <div className={`scroll-section section-align-${align}`} style={{ top: `${scrollTop}vh` }}>
            <div className="section-bespoke">
                <div className="section-header-row">
                    <span className="section-idx">05</span>
                    <h2 className="section-title bespoke-title">Bespoke</h2>
                </div>
                <p className="bespoke-description">
                    Bespoke works are silent vessels translating intimate milestones—<br />
                    from weddings to private stories—into a tangible form. 
                </p>
                <table className="bespoke-table">
                    <tbody>
                        {bespokePieces.map((piece, i) => (
                            <tr key={i} className="bespoke-row">
                                <td className="bespoke-year">{piece.year}</td>
                                <td className="bespoke-exp-title">{piece.title}</td>
                                <td className="bespoke-type">{piece.type}</td>
                                <td className="bespoke-img-cell">
                                    <div className="bespoke-img-wrapper">
                                        <img src={piece.img} alt={piece.title} className="bespoke-img" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
