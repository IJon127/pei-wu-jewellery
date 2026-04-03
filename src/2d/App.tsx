import { useEffect, useRef } from 'react'
import { PlayCanvasEngine } from '../3d/engine'

function App() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const engineRef = useRef<PlayCanvasEngine | null>(null)

    useEffect(() => {
        if (!canvasRef.current) return

        // Initialize the abstracted 3D engine boundary
        engineRef.current = new PlayCanvasEngine(canvasRef.current)
        engineRef.current.start()

        const onResize = () => engineRef.current?.resize()
        window.addEventListener('resize', onResize)

        return () => {
            window.removeEventListener('resize', onResize)
            engineRef.current?.destroy()
        }
    }, [])

    return (
        <>
            <canvas
                ref={canvasRef}
                id="playcanvas-app"
                style={{ width: '100vw', height: '100vh', display: 'block', position: 'absolute', top: 0, zIndex: 0, pointerEvents: 'auto' }}
            />

            <div style={{ pointerEvents: 'auto', padding: '2rem', position: 'relative', zIndex: 1 }}>
                <h1 style={{ color: '#fff', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                    Pei Wu Jewellery
                </h1>
                <p style={{ color: '#ccc' }}>3D Interactive Viewer</p>
                <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
                    <button style={{ padding: '0.5rem 1rem', background: '#333', color: '#fff', border: '1px solid #555', borderRadius: '4px', cursor: 'pointer' }}>
                        Interact
                    </button>
                </div>
            </div>
        </>
    )
}

export default App
