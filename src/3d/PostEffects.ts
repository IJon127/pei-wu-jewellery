import * as pc from 'playcanvas';

export class PostEffects {
    public cameraFrame: pc.CameraFrame;

    constructor(app: pc.Application, cameraEntity: pc.Entity) {
        if (!cameraEntity.camera) {
            throw new Error("PostEffects: Provided entity does not have a camera component.");
        }

        // Initialize CameraFrame (PlayCanvas 2.x high-level post-processing pipeline)
        this.cameraFrame = new pc.CameraFrame(app, cameraEntity.camera);
        this.cameraFrame.rendering.sceneColorMap = true;
        this.cameraFrame.rendering.toneMapping = pc.TONEMAP_NEUTRAL;

        // this.applyDepthOfField();

        // Configure Bloom for a professional, soft glow
        this.applyBloom();

        // Configure Vignette for cinematic framing
        // this.applyVignette();



        // Enable TAA (Temporal Anti-Aliasing) for smooth edges
        this.cameraFrame.taa.enabled = true;
        // this.cameraFrame.taa.jitter = 1.0;
        // this.cameraFrame.rendering.sharpness = 1;

        // Apply initial configuration
        this.cameraFrame.update();
    }

    applyBloom() {
        this.cameraFrame.bloom.intensity = 0.01;
        this.cameraFrame.bloom.blurLevel = 7;
    }

    applyVignette() {
        this.cameraFrame.vignette.intensity = 0.1;
        this.cameraFrame.vignette.inner = 0.8;
        this.cameraFrame.vignette.outer = 1.0;
        this.cameraFrame.vignette.curvature = 0.5;
        // this.cameraFrame.vignette.color.set(0.15, 0.10, 0.12);
        this.cameraFrame.vignette.color.set(0.1, 0.1, 0.1);
    }

    applyDepthOfField() {
        // DOF
        this.cameraFrame.dof.enabled = true;
        this.cameraFrame.dof.nearBlur = true;
        this.cameraFrame.dof.focusDistance = 1.2;
        this.cameraFrame.dof.focusRange = 0.7;
        this.cameraFrame.dof.blurRadius = 2;
        this.cameraFrame.dof.blurRings = 3;
        this.cameraFrame.dof.blurRingPoints = 1;
        this.cameraFrame.dof.highQuality = true;
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
