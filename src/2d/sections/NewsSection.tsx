interface Props { scrollTop: number }

const news = [
    { date: 'Dec 2024', tag: 'Award', title: 'Recipient of the Goldsmiths Craft & Design Award 2024' },
    { date: 'Oct 2024', tag: 'Publication', title: 'Featured in "New Directions in Contemporary Jewellery" (Lark Books)' },
    { date: 'Sep 2024', tag: 'Residency', title: 'Artist-in-residence, Atelier NL, Eindhoven' },
    { date: 'Jun 2024', tag: 'Talk', title: 'Keynote speaker, Jewellery Designers Forum, Basel' },
]

export function NewsSection({ scrollTop }: Props) {
    return (
        <div className="scroll-section" style={{ top: `${scrollTop}vh` }}>
            <div className="section-news">
                <div className="section-header-row">
                    <span className="section-idx">06</span>
                    <h2 className="section-title">News</h2>
                </div>
                <ul className="news-list">
                    {news.map((item, i) => (
                        <li key={i} className="news-item">
                            <span className="news-date">{item.date}</span>
                            <span className="news-tag">{item.tag}</span>
                            <p className="news-title">{item.title}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
