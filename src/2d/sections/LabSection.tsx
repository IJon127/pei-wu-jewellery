import type { SectionProps } from '../ScrollContent'

const experiments = [
    { code: 'LAB-01', title: 'Fluid Metal Studies', status: 'Ongoing' },
    { code: 'LAB-02', title: 'Bio-resin Casting Series', status: 'Completed' },
    { code: 'LAB-03', title: 'Textile + Oxidisation', status: 'Ongoing' },
    { code: 'LAB-04', title: 'Digital Void Forms', status: 'In Development' },
]

export function LabSection({ scrollTop, align = 'left' }: SectionProps) {
    return (
        <div className={`scroll-section section-align-${align}`} style={{ top: `${scrollTop}vh` }}>
            <div className="section-lab">
                <div className="section-header-row">
                    <span className="section-idx">05</span>
                    <h2 className="section-title lab-title">Lab</h2>
                </div>
                <p className="lab-description">
                    An open studio for material research, process experiments,<br />
                    and collaborative failures.
                </p>
                <table className="lab-table">
                    <tbody>
                        {experiments.map(ex => (
                            <tr key={ex.code} className="lab-row">
                                <td className="lab-code">{ex.code}</td>
                                <td className="lab-exp-title">{ex.title}</td>
                                <td className={`lab-status ${ex.status === 'Ongoing' ? 'status-active' : ''}`}>{ex.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
