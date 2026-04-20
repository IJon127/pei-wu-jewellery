import { useEffect, useRef, useState } from 'react'

interface Props {
    visible: boolean  // false = scene is ready
    progress: number
}

export function LoadingScreen({ visible, progress }: Props) {
    const [isMounted, setIsMounted] = useState(true)
    const [count, setCount] = useState(0)
    const [targetProgress, setTargetProgress] = useState(0)

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

    // Receive the network progress and set it as the goal
    useEffect(() => {
        setTargetProgress(Math.round(progress))
    }, [progress])

    // Smoothly step the counter towards the network target (10ms per number)
    useEffect(() => {
        if (count < targetProgress) {
            const timer = setTimeout(() => setCount(c => c + 1), 10)
            return () => clearTimeout(timer)
        } else if (count >= 100 && targetProgress >= 100) {
            countDone.current = true
            tryBeginExit()
        }
    }, [count, targetProgress])

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
            <div
                className="loading-content"
                style={{
                    opacity: numberFadeOut ? 0 : 1,
                    transition: numberFadeOut ? 'opacity 0.5s ease' : 'none',
                }}
                onTransitionEnd={(e) => {
                    e.stopPropagation()
                    setBgFadeOut(true)
                }}
            >
                {/* 16 dots arranged in a circle */}
                <div className="loading-ring">
                    {Array.from({ length: 16 }).map((_, i) => (
                        <span
                            key={i}
                            className="loading-dot-pivot"
                            style={{ transform: `rotate(${i * (360 / 16)}deg)` }}
                        >
                            <span
                                className="loading-dot"
                                style={{ animationDelay: `${(i / 16) * 1.6}s` }}
                            />
                        </span>
                    ))}
                </div>

                <p className="loading-count">{count}</p>
            </div>
        </div>
    )
}
