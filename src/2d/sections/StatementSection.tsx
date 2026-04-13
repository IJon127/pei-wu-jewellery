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
                    "{quote}"
                </blockquote>
                <p className="statement-body" data-reveal data-reveal-delay="1">
                    {body.map((line, i) => (
                        <span key={i}>{line}<br /></span>
                    ))}
                </p>
                <div className="statement-sig" data-reveal data-reveal-delay="2">— Pei Wu, {year}</div>
            </div>
        </div>
    )
}
