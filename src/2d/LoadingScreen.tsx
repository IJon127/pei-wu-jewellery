import { useEffect, useRef, useState } from 'react'

interface Props {
    visible: boolean  // false = scene is ready
}

export function LoadingScreen({ visible }: Props) {
    const [isMounted, setIsMounted] = useState(true)
    const [count, setCount] = useState(0)

    // Phase flags
    const [numberFadeOut, setNumberFadeOut] = useState(false)  // number opacity -> 0; 500ms
    const [bgFadeOut, setBgFadeOut] = useState(false)           // wrapper opacity -> 0; 2000ms

    const countDone = useRef(false)
    const sceneDone = useRef(false)

    // Attempt to begin the exit sequence — both count AND scene must be ready
    const tryBeginExit = () => {
        if (countDone.current && sceneDone.current) {
            setNumberFadeOut(true)
        }
    }

    // Uniform 0→100 over exactly 1000ms (100 steps × 10ms)
    useEffect(() => {
        let n = 0
        const tick = setInterval(() => {
            n++
            setCount(n)
            if (n >= 100) {
                clearInterval(tick)
                countDone.current = true
                tryBeginExit()
            }
        }, 10)
        return () => clearInterval(tick)
    }, [])

    // Scene-ready gate
    useEffect(() => {
        if (!visible) {
            sceneDone.current = true
            tryBeginExit()
        }
    }, [visible])

    if (!isMounted) return null

    return (
        <div
            className="loading-wrapper"
            style={{
                opacity: bgFadeOut ? 0 : 1,
                transition: bgFadeOut ? 'opacity 2s ease' : 'none',
                pointerEvents: bgFadeOut ? 'none' : 'all',
            }}
            onTransitionEnd={() => setIsMounted(false)}
        >
            <p
                className="loading-count"
                style={{
                    opacity: numberFadeOut ? 0 : 1,
                    transition: numberFadeOut ? 'opacity 0.5s ease' : 'none',
                }}
                onTransitionEnd={(e) => {
                    // Guard: only react to this element's own transition, not a child's
                    e.stopPropagation()
                    setBgFadeOut(true)
                }}
            >
                {count}
            </p>
        </div>
    )
}
