import { useEffect, useRef } from 'react'

/**
 * Attaches an IntersectionObserver to the returned ref.
 * When that element enters the viewport, it (and all its
 * children with the `[data-reveal]` attribute) will receive
 * the `reveal-visible` class, triggering the fade-up CSS animation.
 *
 * Usage:
 *   const ref = useScrollReveal()
 *   <div ref={ref}>
 *     <p data-reveal>Fades in</p>
 *     <p data-reveal data-reveal-delay="1">Fades in later</p>
 *   </div>
 *
 * data-reveal-delay: integer step 0-5. Each step adds 100ms of delay.
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>(
    threshold = 0.15
) {
    const ref = useRef<T>(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return
                // Animate the container itself if it has data-reveal
                if (el.dataset.reveal !== undefined) {
                    el.classList.add('reveal-visible')
                }
                // Animate all children marked with data-reveal
                const children = el.querySelectorAll<HTMLElement>('[data-reveal]')
                children.forEach((child) => {
                    const step = parseInt(child.dataset.revealDelay ?? '0', 10)
                    child.style.transitionDelay = `${step * 120}ms`
                    child.classList.add('reveal-visible')
                })
                observer.disconnect()
            },
            { threshold }
        )

        observer.observe(el)
        return () => observer.disconnect()
    }, [threshold])

    return ref
}
