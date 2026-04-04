import type { SectionProps } from '../ScrollContent'

const exhibitions = [
    { year: '2024', title: 'Threshold', venue: 'Galerie Nuit Blanche', city: 'Paris' },
    { year: '2024', title: 'Material Witness', venue: 'Design Museum', city: 'London' },
    { year: '2023', title: 'Soft Power', venue: 'Grassimesse', city: 'Leipzig' },
    { year: '2023', title: 'Objects of Devotion', venue: 'Schmuck', city: 'Munich' },
    { year: '2022', title: 'New Skin', venue: 'National Museum of Scotland', city: 'Edinburgh' },
]

export function ExhibitionsSection({ scrollTop, align = 'left' }: SectionProps) {
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
                            <span className="ex-year">{ex.year}</span>
                            <span className="ex-title">{ex.title}</span>
                            <span className="ex-venue">{ex.venue}, {ex.city}</span>
                        </li>
                    ))}
                </ul>
                <button className="section-more-btn section-more-btn-right-align">View All →</button>
            </div>
        </div>
    )
}
