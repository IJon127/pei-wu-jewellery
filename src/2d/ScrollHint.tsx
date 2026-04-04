import { useEffect, useRef, useState } from 'react'

/** Camera.ts transitionDuration = 2.5s */
const CAMERA_TRANSITION_MS = 2500

interface Props {
    visible: boolean
}

export function ScrollHint({ visible }: Props) {
    const [isMounted, setIsMounted] = useState(false)
    const [opacity, setOpacity] = useState(0)
    const mountedRef = useRef(false)

    useEffect(() => {
        if (visible) {
            // Mount first (opacity still 0), then delay for camera transition, then fade in
            setIsMounted(true)
            mountedRef.current = true
            const t = setTimeout(() => {
                if (mountedRef.current) setOpacity(1)
            }, CAMERA_TRANSITION_MS)
            return () => clearTimeout(t)
        } else {
            // Fade out, then unmount after 2000ms
            mountedRef.current = false
            setOpacity(0)
            const t = setTimeout(() => setIsMounted(false), 2000)
            return () => clearTimeout(t)
        }
    }, [visible])

    if (!isMounted) return null

    const transition = opacity === 0
        ? 'opacity 2s ease'   // fade out
        : 'opacity 1s ease'   // fade in

    return (
        <div
            className="scroll-hint"
            style={{ opacity, transition, pointerEvents: 'none' }}
        >
            <div className="scroll-hint-mouse" />
            <p className="scroll-hint-text">scroll</p>
        </div>
    )
}
