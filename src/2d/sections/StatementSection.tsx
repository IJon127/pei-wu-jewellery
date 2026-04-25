import { useScrollReveal } from '../../hooks/useScrollReveal'
import type { SectionProps } from '../sectionTypes'

export function StatementSection({ scrollTop, align = 'center', portfolioData }: SectionProps) {
    const statementContent = portfolioData?.statement;
    const quote = statementContent?.quote;
    const body = (statementContent?.body || '').split('\n');
    const year = statementContent?.year;
    const ref = useScrollReveal<HTMLDivElement>()

    return (
        <div className={`scroll-section section-align-${align}`} style={{ top: `${scrollTop}dvh` }}>
            <div className="section-statement" ref={ref}>
                <blockquote className="statement-quote" data-reveal data-reveal-delay="0">
                    “︁{quote}︁”︁
                </blockquote>
                {body.map((line, i) => (
                    <p key={i} className="statement-body" data-reveal data-reveal-delay={i + 1}>
                        {line}
                    </p>
                ))}
                <div className="statement-sig" data-reveal data-reveal-delay="2">— Pei Wu, {year}</div>
            </div>
        </div>
    )
}
