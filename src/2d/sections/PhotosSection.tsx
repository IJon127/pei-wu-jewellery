import { useMemo, useEffect, useState } from 'react'
import type { SectionProps } from '../sectionTypes'
import { Lightbox } from '../components/Lightbox'

export function PhotosSection({ scrollTop, align = 'center', portfolioData }: SectionProps) {
    const photos = portfolioData?.photos || []

    const [scrollY, setScrollY] = useState(0);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1440);

    useEffect(() => {
        const onScroll = () => setScrollY(window.scrollY);
        const onResize = () => setWindowWidth(window.innerWidth);

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onResize, { passive: true });

        onScroll();
        onResize();

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onResize);
        }
    }, []);

    // Proportional RWD Scale Factors
    const isMobilePortrait = windowWidth <= 550;
    const isMobileLandscape = windowWidth > 550 && windowWidth <= 768;
    const isTablet = windowWidth > 768 && windowWidth <= 1024;
    const isSmallLaptop = windowWidth > 1024 && windowWidth <= 1440;

    // Shift the section down slightly on smaller screens where previous sections are taller
    let adjustedScrollTop = scrollTop;
    if (isMobilePortrait) adjustedScrollTop += 35;
    else if (isMobileLandscape) adjustedScrollTop += 22;
    else if (isTablet) adjustedScrollTop += 12;
    else if (isSmallLaptop) adjustedScrollTop += 5;

    const positionedPhotos = useMemo(() => {
        return photos.map((photoRow) => {
            const xVal = Number(photoRow.x) || 50;
            const yVal = Number(photoRow.y) || 0;
            const zVal = Number(photoRow.z) || 1;

            let scaleVal = Number(photoRow.scale) || 1;
            // Scale images down natively on small screens
            if (isMobilePortrait) scaleVal *= 0.55;
            else if (isMobileLandscape) scaleVal *= 0.65;
            else if (isTablet) scaleVal *= 0.73;
            else if (isSmallLaptop) scaleVal *= 0.85;

            const left = `${xVal}vw`;
            const top = `${yVal}vh`;

            return {
                name: photoRow.name,
                photoby: photoRow.photoby,
                url: photoRow.image,
                top,
                left,
                width: `${200 * scaleVal}px`,
                zIndex: zVal
            }
        })
    }, [photos, isMobilePortrait, isMobileLandscape, isTablet, isSmallLaptop])

    // Baseline point where parallax offset is 0
    const sectionTopPx = typeof window !== 'undefined' ? (adjustedScrollTop * window.innerHeight) / 100 : 0;
    const scrollDelta = scrollY - sectionTopPx;

    const allImages = useMemo(() => positionedPhotos.map(p => p.url), [positionedPhotos])
    const allNames = useMemo(() => positionedPhotos.map(p => p.name), [positionedPhotos])
    const allPhotoby = useMemo(() => positionedPhotos.map(p => p.photoby), [positionedPhotos])

    return (
        <div className={`scroll-section section-align-${align}`} style={{ top: `${adjustedScrollTop}dvh`, width: '100%', height: '100vh' }}>
            <div className="section-photos">
                {positionedPhotos.map((photo, i) => {
                    // Parallax multiplier based on zIndex. 
                    // Negative scrollDelta means moving UP faster.
                    const parallaxOffset = -scrollDelta * (photo.zIndex * 0.15);

                    return (
                        <img
                            key={i}
                            src={photo.url}
                            alt={photo.name}
                            className='photo-img'
                            onClick={() => setLightboxIndex(i)}
                            style={{
                                top: photo.top,
                                left: photo.left,
                                width: photo.width,
                                transform: `translate(-50%, calc(-50% + ${parallaxOffset}px))`,
                                zIndex: photo.zIndex,
                                boxShadow: `0 10px ${photo.zIndex * 10}px rgba(0, 0, 0, 0.25)`,
                                cursor: 'zoom-in'
                            }}
                        />
                    )
                })}
            </div>

            {lightboxIndex !== null && (
                <Lightbox
                    images={allImages}
                    names={allNames}
                    photoby={allPhotoby}
                    initialIndex={lightboxIndex}
                    onClose={() => setLightboxIndex(null)}
                />
            )}
        </div>
    )
}
