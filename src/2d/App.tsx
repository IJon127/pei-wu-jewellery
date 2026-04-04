import { useEffect, useRef, useState } from 'react'
import { Scene } from '../3d/scene'
import { LoadingScreen } from './LoadingScreen'
import { ScrollContent, CYCLE_VH } from './ScrollContent'
import { ScrollHint } from './ScrollHint'
import './index.css'

function App() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const sceneRef = useRef<Scene | null>(null)
    const [isInteracting, setIsInteracting] = useState(false)
    const [isSceneReady, setIsSceneReady] = useState(false)
    const [hasScrolled, setHasScrolled] = useState(false)

    const isInteractingRef = useRef(isInteracting)

    // Sync state to ref so the scroll listener can access it without causing re-runs
    useEffect(() => {
        isInteractingRef.current = isInteracting
    }, [isInteracting])

    useEffect(() => {
        if (!canvasRef.current) return

        // Initialize the abstracted 3D engine boundary
        sceneRef.current = new Scene(canvasRef.current)
        sceneRef.current.onReady = () => setIsSceneReady(true)
        sceneRef.current.start()

        const onResize = () => sceneRef.current?.resize()
        window.addEventListener('resize', onResize)

        const onScroll = () => {
            if (isInteractingRef.current) setHasScrolled(true);
            if (!sceneRef.current || !isInteractingRef.current) return;
            // Wrap scrollY within one cycle so the camera animation loops infinitely
            const cycleHeightPx = CYCLE_VH * window.innerHeight / 100
            const scrollInCycle = window.scrollY % cycleHeightPx
            const progress = scrollInCycle / cycleHeightPx
            sceneRef.current.updateScroll(progress);
        };
        window.addEventListener('scroll', onScroll, { passive: true })

        return () => {
            window.removeEventListener('resize', onResize)
            window.removeEventListener('scroll', onScroll)
            sceneRef.current?.destroy()
        }
    }, [])

    const handleInteract = () => {
        setIsInteracting(true);
        document.body.style.minHeight = `${3 * CYCLE_VH}vh`; // 3 initial cycles
        sceneRef.current?.startInteraction();
    };

    return (
        <div className="app-wrapper">
            <canvas ref={canvasRef} id="playcanvas-app" />

            <LoadingScreen visible={!isSceneReady} />

            <ScrollContent visible={isInteracting} />

            <ScrollHint visible={isInteracting && !hasScrolled} />

            {!isInteracting && (
                <div className="landing-overlay">
                    <h1 className="landing-title">
                        <span className="title-sans">Pei Wu </span>
                        <span className="title-serif">Jewellery</span>
                    </h1>
                    <p className="landing-subtitle">
                        The combination of all senses reflects the state of mind under her story. “We are all very similar.”
                    </p>
                    <button className="landing-btn" onClick={handleInteract}>
                        Enter
                    </button>
                </div>
            )}
        </div>
    )
}

export default App

