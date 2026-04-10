import { useMemo, useEffect, useState } from 'react'
import type { SectionProps } from '../sectionTypes'

export function PhotosSection({ scrollTop, align = 'center', portfolioData }: SectionProps) {
    const photos = portfolioData?.photos || []

    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const onScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const positionedPhotos = useMemo(() => {
        return photos.map((photoRow) => {
            // Parse values from string to numbers (data from CSV comes out as strings)
            const xVal = Number(photoRow.x) || 50;
            const yVal = Number(photoRow.y) || 0;
            const zVal = Number(photoRow.z) || 1;
            const scaleVal = Number(photoRow.scale) || 1;

            // Values are now directly in 0 to 100 range, 
            // no need to algebraically map from [-1, 1], so we map directly to vw/vh.
            const left = `${xVal}vw`;
            const top = `${yVal}vh`;

            return {
                alt: photoRow.alt,
                url: photoRow.image,
                top,
                left,
                width: `${200 * scaleVal}px`,
                zIndex: zVal
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
                            alt={photo.alt}
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
