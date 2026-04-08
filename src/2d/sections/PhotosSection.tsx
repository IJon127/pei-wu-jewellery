import { useMemo, useEffect, useState } from 'react'
import type { SectionProps } from '../sectionTypes'

// Define your custom positions here. 
// x and y are in the range [-1, 1] where:
// x: -1 is left edge, 0 is center, 1 is right edge
// y: -1 is top edge, 0 is center, 1 is bottom edge
const PHOTO_POSITIONS = [
    { x: -0.6, y: -1, width: 200, zIndex: 1 },
    { x: 0.5, y: -0.7, width: 250, zIndex: 2 },
    { x: -0.5, y: 0.2, width: 180, zIndex: 3 },
    { x: 0.7, y: 0.3, width: 220, zIndex: 1 },
    { x: -0.7, y: 0.8, width: 240, zIndex: 2 },
    { x: 0.3, y: 0.7, width: 190, zIndex: 4 },
    { x: -0.1, y: -0.2, width: 260, zIndex: 5 },
    { x: 0.8, y: -0.1, width: 210, zIndex: 2 },
    { x: -0.9, y: 0.1, width: 200, zIndex: 3 },
    { x: 0.1, y: 1, width: 230, zIndex: 1 },
];

export function PhotosSection({ scrollTop, align = 'center', portfolioData }: SectionProps) {
    const photos = portfolioData?.selected?.photos || []

    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const onScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const positionedPhotos = useMemo(() => {
        return photos.map((url, index) => {
            // Loop over the array if there are more photos than positions
            const pos = PHOTO_POSITIONS[index % PHOTO_POSITIONS.length];

            // Map [-1, 1] to true vw/vh instead of percentages 
            // (e.g., y: 0 -> 50vh, y: 1.5 -> 125vh)
            const left = `${(pos.x + 1) * 50}vw`;
            const top = `${(pos.y + 1) * 100}vh`;

            return {
                url,
                top,
                left,
                width: `${pos.width}px`,
                zIndex: pos.zIndex
            }
        })
    }, [photos])

    // Baseline point where parallax offset is 0
    const sectionTopPx = typeof window !== 'undefined' ? (scrollTop * window.innerHeight) / 100 : 0;
    const scrollDelta = scrollY - sectionTopPx;

    return (
        <div className={`scroll-section section-align-${align}`} style={{ top: `${scrollTop}vh`, width: '100%', height: '100vh' }}>
            <div className="section-photos" style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none' }}>
                {positionedPhotos.map((photo, i) => {
                    // Parallax multiplier based on zIndex. 
                    // Negative scrollDelta means moving UP faster.
                    const parallaxOffset = -scrollDelta * (photo.zIndex * 0.15);

                    return (
                        <img
                            key={i}
                            src={photo.url}
                            alt=""
                            style={{
                                position: 'absolute',
                                top: photo.top,
                                left: photo.left,
                                width: photo.width,
                                objectFit: 'contain',
                                pointerEvents: 'auto',
                                transform: `translate(-50%, calc(-50% + ${parallaxOffset}px))`,
                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                zIndex: photo.zIndex
                            }}
                        />
                    )
                })}
            </div>
        </div>
    )
}
