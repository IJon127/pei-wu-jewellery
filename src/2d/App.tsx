import { useEffect, useRef, useState } from 'react'
import { Scene } from '../3d/scene'

function App() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const sceneRef = useRef<Scene | null>(null)
    const [isInteracting, setIsInteracting] = useState(false)

    const isInteractingRef = useRef(isInteracting)
    
    // Sync state to ref so the scroll listener can access it without causing re-runs
    useEffect(() => {
        isInteractingRef.current = isInteracting
    }, [isInteracting])

    useEffect(() => {
        if (!canvasRef.current) return

        // Initialize the abstracted 3D engine boundary
        sceneRef.current = new Scene(canvasRef.current)
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
        <div style={{ minHeight: isInteracting ? '500vh' : '100vh', transition: 'min-height 0.5s', width: '100%', overflow: 'hidden' }}>
            <canvas
                ref={canvasRef}
                id="playcanvas-app"
                style={{ width: '100vw', height: '100vh', display: 'block', position: 'fixed', top: 0, zIndex: 0, pointerEvents: 'auto' }}
            />

            {!isInteracting && (
                <div style={{ pointerEvents: 'auto', padding: '2rem', position: 'fixed', zIndex: 1, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                    <h1 style={{ color: '#fff', textShadow: '0 4px 12px rgba(0,0,0,0.8)', fontSize: '5rem', margin: 0, whiteSpace: 'nowrap' }}>
                        Pei Wu Jewellery
                    </h1>
                    <p style={{ color: '#ddd', fontSize: '1.4rem', marginTop: '1rem', textShadow: '0 2px 6px rgba(0,0,0,0.8)' }}>
                        Interactive 3D Lookbook
                    </p>
                    <button 
                        onClick={handleInteract}
                        style={{ marginTop: '3rem', padding: '1.2rem 4rem', background: 'rgba(255,255,255,0.9)', color: '#000', border: 'none', borderRadius: '40px', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 'bold', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', transition: 'transform 0.2s' }}>
                        Enter
                    </button>
                </div>
            )}
        </div>
    )
}

export default App
