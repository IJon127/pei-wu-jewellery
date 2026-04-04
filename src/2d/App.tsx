import { useEffect, useRef, useState } from 'react'
import { Scene } from '../3d/scene'
import { LoadingScreen } from './LoadingScreen'
import './index.css'

function App() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const sceneRef = useRef<Scene | null>(null)
    const [isInteracting, setIsInteracting] = useState(false)
    const [isSceneReady, setIsSceneReady] = useState(false)

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
            if (!sceneRef.current || !isInteractingRef.current) return;
            const maxScroll = document.body.scrollHeight - window.innerHeight;
            if (maxScroll > 0) {
                const progress = Math.min(1.0, Math.max(0.0, window.scrollY / maxScroll));
                sceneRef.current.updateScroll(progress);
            }
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
        sceneRef.current?.startInteraction();
    };

    return (
        <div className="app-wrapper" style={{ minHeight: isInteracting ? '500vh' : '100vh' }}>
            <canvas ref={canvasRef} id="playcanvas-app" />

            <LoadingScreen visible={!isSceneReady} />

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

