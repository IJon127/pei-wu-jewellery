import { useEffect, useRef, useState } from 'react'
import { Scene } from '../3d/scene'
import { LoadingScreen } from './LoadingScreen'
import { ScrollContent, CYCLE_VH } from './ScrollContent'
import { ScrollHint } from './ScrollHint'
import { usePortfolioData } from '../hooks/usePortfolioData'
import './index.css'

function App() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const sceneRef = useRef<Scene | null>(null)
    const [isInteracting, setIsInteracting] = useState(false)
    const [isSceneReady, setIsSceneReady] = useState(false)
    const [hasScrolled, setHasScrolled] = useState(false)

    const { data: portfolioData, isLoading: isDataLoading } = usePortfolioData()

    const isInteractingRef = useRef(isInteracting)

    // Sync state to ref so the scroll listener can access it without causing re-runs
    useEffect(() => {
        isInteractingRef.current = isInteracting
    }, [isInteracting])

    useEffect(() => {
        if (!canvasRef.current || isDataLoading || !portfolioData) return

        // Initialize the abstracted 3D engine boundary with proper selected photos
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
    }, [isDataLoading, portfolioData])

    const handleInteract = () => {
        setIsInteracting(true);
        document.body.style.minHeight = `${3 * CYCLE_VH}dvh`; // 3 initial cycles
        sceneRef.current?.startInteraction();
    };

    return (
        <div className="app-wrapper">
            <canvas ref={canvasRef} id="playcanvas-app" />

            {/* Show loading screen until both data is loaded and 3D scene compiles */}
            <LoadingScreen visible={isDataLoading || !isSceneReady} />

            {/* Only mount scroll content when data is ready so sections have access to their arrays */}
            {portfolioData && <ScrollContent visible={isInteracting} portfolioData={portfolioData} />}

            <ScrollHint visible={isInteracting && !hasScrolled} />

            {!isInteracting && (
                <div className="landing-overlay">
                    <h1 className="landing-title">
                        <span className="title-sans">Pei Wu </span>
                        <span className="title-serif">Jewellery</span>
                    </h1>
                    <button className="landing-btn" onClick={handleInteract}>
                        Enter
                    </button>
                </div>
            )}
        </div>
    )
}

export default App

