import * as pc from 'playcanvas';

export enum CameraStage {
    ORBIT,
    TRANSITION,
    ANIMATION
}

export class Camera {
    public entity: pc.Entity;
    private pivot: pc.Entity;
    private app: pc.Application;

    public stage: CameraStage = CameraStage.ORBIT;
    public id: string = Math.random().toString(36).substring(7); // Debug ID to catch React double-mounting

    private cameraRig: pc.Entity | null = null;
    private animatedNode: pc.GraphNode | null = null;
    private animTrack: pc.AnimTrack | null = null;

    // private overlay: pc.Entity | null = null;
    private overlayMaterial: pc.StandardMaterial | null = null;

    private transitionTime: number = 0;
    private transitionDuration: number = 2.5;
    private startPos: pc.Vec3 = new pc.Vec3();
    private startRot: pc.Quat = new pc.Quat();
    private targetPos: pc.Vec3 = new pc.Vec3();
    private targetRot: pc.Quat = new pc.Quat();

    constructor(app: pc.Application) {
        this.app = app;

        // Create pivot to easily orbit the origin
        this.pivot = new pc.Entity('camera_pivot');
        app.root.addChild(this.pivot);

        this.entity = new pc.Entity('camera');

        this.entity.addComponent('camera', {
            clearColor: new pc.Color(0.1, 0.15, 0.2),
            toneMapping: pc.TONEMAP_ACES,
            fov: 45,
        });

        // Needed to capture background for dynamic refraction
        this.entity.camera!.requestSceneColorMap(true);

        // Position camera relative to the orbit pivot
        this.entity.setLocalPosition(0, 4, 5);
        this.entity.lookAt(0, -0.5, 0);
        this.pivot.addChild(this.entity);

        // // --- Blue Overlay Setup ---
        // this.overlay = new pc.Entity('blue_overlay');
        // this.overlay.addComponent('render', { type: 'sphere' });
        // this.overlay.setLocalEulerAngles(0, 0, 13); // Face camera
        // this.overlay.setLocalPosition(0, 0, -0.11); // Just in front of the lens
        // this.overlay.setLocalScale(0.2, 0.5, 0.05); // Large enough to cover FOV

        // this.overlayMaterial = new pc.StandardMaterial();
        // this.overlayMaterial.diffuse.set(0.65, 0.8, 1.0); // Deep Cinematic Blue
        // this.overlayMaterial.emissive.set(0, 0.1, 0.3); // Subtle digital glow
        // this.overlayMaterial.opacity = 0;
        // this.overlayMaterial.blendType = pc.BLEND_NORMAL;
        // this.overlayMaterial.update();

        // this.overlay.render!.meshInstances[0].material = this.overlayMaterial;
        // this.entity.addChild(this.overlay);

        // Stage 3 Initialization: Load animated camera glb
        this.loadCameraLoop();
    }

    loadCameraLoop() {
        this.app.assets.loadFromUrl('/assets/3d/Action.glb', 'container', (err: any, asset: pc.Asset | undefined) => {
            if (!err && asset && asset.resource) {
                const resource = asset.resource as pc.ContainerResource;

                this.cameraRig = resource.instantiateRenderEntity({ castShadows: false });
                this.app.root.addChild(this.cameraRig);

                // Attempt to find actual camera component, OR a node explicitly named "Camera"
                const camComp = this.cameraRig.findComponent('camera') as pc.CameraComponent;
                let found = camComp ? camComp.entity : null;

                if (!found) found = this.cameraRig.findByName('Camera') as pc.Entity;
                if (!found) found = this.cameraRig.findByName('camera') as pc.Entity;
                if (!found && this.cameraRig.children.length > 0) found = this.cameraRig.children[0] as pc.Entity;

                this.animatedNode = found || this.cameraRig;

                // PlayCanvas instantiateRenderEntity does not automatically add the anim component.
                // We must attach it and assign the GLB's embedded animation track to it.
                const res = resource as any;
                if (res.animations && res.animations.length > 0) {
                    this.animTrack = res.animations[0].resource;
                    this.cameraRig.addComponent('anim', {
                        activate: true
                    });

                    // Assign the first animation track to a default state
                    this.cameraRig.anim?.assignAnimation('CameraAction', this.animTrack as pc.AnimTrack);

                    // Force the state graph to transition and resolve its layout
                    this.cameraRig.anim?.baseLayer?.play('CameraAction');
                    this.cameraRig.anim?.update(0);

                    // Now safely pause it for manual scrubbing logic in Stage 3
                    if (this.cameraRig.anim?.baseLayer) {
                        this.cameraRig.anim.baseLayer.playing = false;
                    }
                }
            }
        });
    }

    public startInteraction() {
        if (this.stage !== CameraStage.ORBIT || !this.cameraRig) return;

        // Scrub animation to exactly 0 to extract target poses securely
        if (this.cameraRig.anim && this.cameraRig.anim.baseLayer) {
            this.cameraRig.anim.baseLayer.activeStateCurrentTime = 0;
            this.cameraRig.anim.update(0);
        }

        const targetNode = this.animatedNode || this.cameraRig;
        this.targetPos.copy(targetNode.getPosition());
        this.targetRot.copy(targetNode.getRotation());


        this.startPos.copy(this.entity.getPosition());
        this.startRot.copy(this.entity.getRotation());

        // Detach the camera from the orbit pivot to world space for the manual flight
        this.entity.reparent(this.app.root);

        this.stage = CameraStage.TRANSITION;
        this.transitionTime = 0;
    }

    public updateScroll(progress: number) {
        if (this.stage !== CameraStage.ANIMATION || !this.cameraRig || !this.animTrack) return;

        const duration = this.animTrack.duration;
        const newTime = progress * duration;

        if (this.cameraRig.anim && this.cameraRig.anim.baseLayer) {
            this.cameraRig.anim.baseLayer.activeStateCurrentTime = newTime;
            this.cameraRig.anim.update(0); // evaluate immediately



            const targetNode = this.animatedNode || this.cameraRig;
            this.entity.setPosition(targetNode.getPosition());
            this.entity.setRotation(targetNode.getRotation());

            // Update the transition overlay color/opacity
            this.updateBlueOverlay(progress);
        }

        this.updateBlueOverlay(progress);
    }

    update(dt: number) {
        // Cap the delta time to protect against React layout re-renders creating a massive time spike
        const safeDt = Math.min(dt, 0.05);

        if (this.stage === CameraStage.ORBIT) {
            this.pivot.rotate(0, 10 * safeDt, 0);
        } else if (this.stage === CameraStage.TRANSITION) {
            this.transitionTime += safeDt;
            let t = this.transitionTime / this.transitionDuration;

            if (t >= 1.0) {
                t = 1.0;
                this.stage = CameraStage.ANIMATION; // Transition Complete!
            } else {
                t = t * t * (3.0 - 2.0 * t); // Smoothstep easing
            }

            // Lerp transformations 
            const p = new pc.Vec3().lerp(this.startPos, this.targetPos, t);
            const r = new pc.Quat().slerp(this.startRot, this.targetRot, t);
            const f = pc.math.lerp(45, 70, t);

            this.entity.setPosition(p);
            this.entity.setRotation(r);
            this.entity.camera!.fov = f;

        } else if (this.stage === CameraStage.ANIMATION) {
            // Animating
        }
    }

    updateBlueOverlay(progress: number) {
        if (!this.overlayMaterial) return;

        // --- FADE IN SETTINGS ---
        const fadeInStart = 0.9263;
        const fadeInEnd = 0.9271;

        // --- FADE OUT SETTINGS ---
        const fadeOutStart = 0.95;
        const fadeOutEnd = 0.97;

        let targetOpacity = 0; // Default to 0 (invisible)

        if (progress >= fadeInStart && progress <= fadeInEnd) {
            // 1. Fading In: Map progress to [0.0 -> 1.0]
            targetOpacity = pc.math.clamp((progress - fadeInStart) / (fadeInEnd - fadeInStart), 0, 1);

        } else if (progress > fadeInEnd && progress < fadeOutStart) {
            // 2. Fully Visible: Between the fade-in and fade-out
            targetOpacity = 1;

        } else if (progress >= fadeOutStart && progress <= fadeOutEnd) {
            // 3. Fading Out: Map progress to [1.0 -> 0.0]
            targetOpacity = pc.math.clamp(1.0 - ((progress - fadeOutStart) / (fadeOutEnd - fadeOutStart)), 0, 1);
        }
        // (If progress < fadeInStart or > fadeOutEnd, targetOpacity safely remains 0)

        // Apply with smooth interpolation
        if (this.overlayMaterial.opacity !== targetOpacity) {
            this.overlayMaterial.opacity = targetOpacity;
            this.overlayMaterial.update();
        }
    }
}
