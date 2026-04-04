import type { ExhibitionDetail, SectionProps } from '../sectionTypes'

export const exhibitions: ExhibitionDetail[] = [
    {
        id: 'threshold',
        year: '2024',
        title: 'Threshold',
        venue: 'Galerie Nuit Blanche',
        city: 'Paris',
        description:
            'A solo presentation of works at the edge of wearability — pieces that insist on proximity and pause. The exhibition title names the moment before crossing: jewellery as a held breath.',
        images: ['/assets/images/projects/project1.jpg', '/assets/images/projects/project2.jpg'],
    },
    {
        id: 'material-witness',
        year: '2024',
        title: 'Material Witness',
        venue: 'Design Museum',
        city: 'London',
        description:
            'Shown alongside contemporary design objects, the collection argues for jewellery as material testimony: metal that records touch, time, and the small histories of the body.',
        images: ['/assets/images/projects/project3.jpg', '/assets/images/projects/project4.png'],
    },
    {
        id: 'soft-power',
        year: '2023',
        title: 'Soft Power',
        venue: 'Grassimesse',
        city: 'Leipzig',
        description:
            'Grassimesse context: a focused installation on softness expressed through rigid materials — weight, drape, and the politics of adornment in public space.',
        images: ['/assets/images/projects/project5.png'],
    },
    {
        id: 'objects-of-devotion',
        year: '2023',
        title: 'Objects of Devotion',
        venue: 'Schmuck',
        city: 'Munich',
        description:
            'Schmuck fair presentation linking devotional forms to secular wear. Repetition, relic, and the intimate scale of objects meant to be carried against the skin.',
        images: ['/assets/images/projects/project6.png', '/assets/images/projects/project9.png'],
    },
    {
        id: 'new-skin',
        year: '2022',
        title: 'New Skin',
        venue: 'National Museum of Scotland',
        city: 'Edinburgh',
        description:
            'Museum display exploring skin as metaphor and surface — cast, pierced, and layered metals that suggest renewal, vulnerability, and protection at once.',
        images: ['/assets/images/projects/project4.png', '/assets/images/projects/project1.jpg'],
    },
]

export function getExhibitionById(id: string): ExhibitionDetail | undefined {
    return exhibitions.find(e => e.id === id)
}

export function ExhibitionsSection({ scrollTop, align = 'left', onOpenModal }: SectionProps) {
    return (
        <div className={`scroll-section section-align-${align}`} style={{ top: `${scrollTop}vh` }}>
            <div className="section-exhibitions">
                <div className="section-header-row">
                    <span className="section-idx">03</span>
                    <h2 className="section-title">Exhibitions</h2>
                </div>
                <ul className="exhibitions-list">
                    {exhibitions.map(ex => (
                        <li key={ex.id} className="exhibition-row">
                            <button
                                type="button"
                                className="exhibition-row--btn"
                                onClick={() => onOpenModal?.('exhibition', ex.id)}
                            >
                                <span className="ex-year">{ex.year}</span>
                                <span className="ex-title">{ex.title}</span>
                                <span className="ex-venue">
                                    {ex.venue}, {ex.city}
                                </span>
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
