import type { SectionProps } from '../sectionTypes'

export function StatementSection({ scrollTop, align = 'center' }: SectionProps) {
    return (
        <div className={`scroll-section section-align-${align}`} style={{ top: `${scrollTop}vh` }}>
            <div className="section-statement">
                <blockquote className="statement-quote">
                    "The combination of all senses reflects<br />
                    the state of mind under her story."
                </blockquote>
                <p className="statement-body">
                    Pei Wu's jewellery practice is rooted in material exploration<br />
                    and the quiet language of the body. Each piece is a study<br />
                    in tension — between the organic and the constructed,<br />
                    the intimate and the universal.
                </p>
                <div className="statement-sig">— Pei Wu, 2024</div>
            </div>
        </div>
    )
}
