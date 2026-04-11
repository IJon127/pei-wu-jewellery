import type { SectionProps } from '../sectionTypes'

export function StatementSection({ scrollTop, align = 'center', portfolioData }: SectionProps) {
    const statementContent = portfolioData?.statement;
    const quote = statementContent?.quote;
    const body = (statementContent?.body || '').split('\n');
    const year = statementContent?.year;

    return (
        <div className={`scroll-section section-align-${align}`} style={{ top: `${scrollTop}vh` }}>
            <div className="section-statement">
                <blockquote className="statement-quote">
                    "{quote}"
                </blockquote>
                <p className="statement-body">
                    {body.map((line, i) => (
                        <span key={i}>{line}<br /></span>
                    ))}
                </p>
                <div className="statement-sig">— Pei Wu, {year}</div>
            </div>
        </div>
    )
}
