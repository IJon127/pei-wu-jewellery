interface Props { scrollTop: number }

export function AboutSection({ scrollTop }: Props) {
    return (
        <div className="scroll-section" style={{ top: `${scrollTop}vh` }}>
            <div className="section-about">
                <div className="section-header-row">
                    <span className="section-idx">07</span>
                    <h2 className="section-title">About</h2>
                </div>
                <div className="about-layout">
                    <div className="about-portrait" aria-label="Portrait placeholder" />
                    <div className="about-bio">
                        <p>
                            Pei Wu is a Taiwan-born, London-based jewellery artist working at the 
                            intersection of craft, material research, and narrative design. Her work
                            draws on personal history, sensory memory, and the politics of adornment.
                        </p>
                        <p>
                            Wu holds an MA in Jewellery Design from the Royal College of Art and
                            has exhibited internationally across Europe, East Asia, and North America.
                        </p>
                        <div className="about-contact">
                            <a href="mailto:studio@peiwu.com" className="about-link">studio@peiwu.com</a>
                            <a href="#" className="about-link">Instagram</a>
                            <a href="#" className="about-link">CV ↓</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
