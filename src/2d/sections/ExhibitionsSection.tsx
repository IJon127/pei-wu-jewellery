
import type { Exhibition, SectionProps } from '../sectionTypes'

export const exhibitions: Exhibition[] = [
    { year: '2024', title: 'Threshold', venue: 'Galerie Nuit Blanche', city: 'Paris' },
    { year: '2024', title: 'Material Witness', venue: 'Design Museum', city: 'London' },
    { year: '2023', title: 'Soft Power', venue: 'Grassimesse', city: 'Leipzig' },
    { year: '2023', title: 'Objects of Devotion', venue: 'Schmuck', city: 'Munich' },
    { year: '2022', title: 'New Skin', venue: 'National Museum of Scotland', city: 'Edinburgh' },
]

export function ExhibitionsSection({ scrollTop, align = 'left', onOpenModal }: SectionProps) {
    return (
        <div className={`scroll-section section-align-${align}`} style={{ top: `${scrollTop}vh` }}>
            <div className="section-exhibitions">
                <div className="section-header-row">
                    <span className="section-idx">03</span>
                    <h2 className="section-title">Exhibitions</h2>
                </div>
                <ul className="exhibitions-list">
                    {exhibitions.map((ex, i) => (
                        <li key={i} className="exhibition-row">
                            <button type="button" className="exhibition-row--btn" onClick={() => console.log('clicked')}>
                                <span className="ex-year">{ex.year}</span>
                                <span className="ex-title">{ex.title}</span>
                                <span className="ex-venue">{ex.venue}, {ex.city}</span>
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
