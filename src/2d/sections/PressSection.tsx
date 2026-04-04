import type { SectionProps } from '../ScrollContent'

const pressItems = [
    { pub: 'Crafts Magazine', quote: 'A jeweller who understands silence as much as form.', date: 'Nov 2024' },
    { pub: 'Wallpaper*', quote: "Wu's work occupies a rare space between sculpture and intimacy.", date: 'Sep 2024' },
    { pub: 'Another Magazine', quote: 'The body is her canvas — and every piece, a sentence.', date: 'Jun 2023' },
]

export function PressSection({ scrollTop, align = 'left' }: SectionProps) {
    return (
        <div className={`scroll-section section-align-${align}`} style={{ top: `${scrollTop}vh` }}>
            <div className="section-press">
                <div className="section-header-row">
                    <span className="section-idx">04</span>
                    <h2 className="section-title">Press</h2>
                </div>
                <div className="press-items">
                    {pressItems.map((item, i) => (
                        <div key={i} className="press-item">
                            <p className="press-quote">&ldquo;{item.quote}&rdquo;</p>
                            <div className="press-byline">
                                <span className="press-pub">{item.pub}</span>
                                <span className="press-date">{item.date}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="section-more-btn">View All →</button>
            </div>
        </div>
    )
}
