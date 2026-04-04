import type { SectionProps } from '../sectionTypes'

const experiments = [
    { code: 'LAB-01', title: 'Fluid Metal Studies', status: 'Ongoing' },
    { code: 'LAB-02', title: 'Bio-resin Casting Series', status: 'Completed' },
    { code: 'LAB-03', title: 'Textile + Oxidisation', status: 'Ongoing' },
    { code: 'LAB-04', title: 'Digital Void Forms', status: 'In Development' },
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
                        {experiments.map(ex => (
                            <tr key={ex.code} className="bespoke-row">
                                <td className="bespoke-code">{ex.code}</td>
                                <td className="bespoke-exp-title">{ex.title}</td>
                                <td className={`bespoke-status ${ex.status === 'Ongoing' ? 'status-active' : ''}`}>{ex.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
