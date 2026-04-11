import type { SectionProps } from '../sectionTypes'

export function AboutSection({ scrollTop, align = 'left', portfolioData }: SectionProps) {
    const aboutData = portfolioData?.about || {
        bio: '',
        image: '',
        cv: '',
        email: '',
        socialType: '',
        socialLink: ''
    };
    const bio = aboutData.bio.split('\n');
    return (
        <div className={`scroll-section section-align-${align}`} style={{ top: `${scrollTop}vh` }}>
            <div className="section-about">
                <div className="section-header-row">
                    <span className="section-idx">07</span>
                    <h2 className="section-title">About</h2>
                </div>
                <div className="about-layout">
                    <img src={aboutData.image} className="about-portrait" />
                    <div className="about-bio">
                        {bio.map((line, i) => (
                            <p key={i}>
                                {line}
                            </p>
                        ))}
                        <div className="about-contact">
                            <a href={`mailto:${aboutData.email}`} className="about-link">{aboutData.email}</a>
                            <a href={aboutData.socialLink} className="about-link" target="_blank">{aboutData.socialType}</a>
                            <a href={aboutData.cv} className="about-link" target="_blank">CV ↓</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
