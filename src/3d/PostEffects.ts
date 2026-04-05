import * as pc from 'playcanvas';

export class PostEffects {
    public cameraFrame: pc.CameraFrame;

    constructor(app: pc.Application, cameraEntity: pc.Entity) {
        if (!cameraEntity.camera) {
            throw new Error("PostEffects: Provided entity does not have a camera component.");
        }

        // Initialize CameraFrame (PlayCanvas 2.x high-level post-processing pipeline)
        this.cameraFrame = new pc.CameraFrame(app, cameraEntity.camera);

        // --- Core Rendering Settings (Fixes "washed out" colors) ---
        this.cameraFrame.rendering.sceneColorMap = true;

        // Configure Bloom for a professional, soft glow
        this.cameraFrame.bloom.intensity = 0.02;
        this.cameraFrame.bloom.blurLevel = 10;

        // Configure Vignette for cinematic framing
        this.cameraFrame.vignette.intensity = 0.5;
        this.cameraFrame.vignette.inner = 0.5;
        this.cameraFrame.vignette.outer = 1.0;
        this.cameraFrame.vignette.curvature = 0.5;
        this.cameraFrame.vignette.color.set(0.15, 0.10, 0.12);

        // Enable TAA (Temporal Anti-Aliasing) for smooth edges
        this.cameraFrame.taa.enabled = true;
        this.cameraFrame.taa.jitter = 1.0;

        // Apply initial configuration
        this.cameraFrame.update();
    }

    /**
     * Re-calculate the frame layers and parameters.
     * Call this if camera parameters or global effects change significantly.
     */
    public update() {
        this.cameraFrame.update();
    }

    /**
     * Destroy the frame and its associated render targets.
     */
    public destroy() {
        this.cameraFrame.destroy();
    }
}
