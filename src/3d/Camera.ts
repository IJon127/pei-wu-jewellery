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

    private cameraRig: pc.Entity | null = null;
    private animatedNode: pc.GraphNode | null = null;
    private animTrack: pc.AnimTrack | null = null;

    private transitionTime: number = 0;
    private transitionDuration: number = 2.5;
    private startPos: pc.Vec3 = new pc.Vec3();
    private startRot: pc.Quat = new pc.Quat();
    private targetPos: pc.Vec3 = new pc.Vec3();
    private targetRot: pc.Quat = new pc.Quat();

    private baseFov: number = 45;
    private animFov: number = 70;

    constructor(app: pc.Application, private onProgress?: () => void) {
        this.app = app;

        // Create pivot to easily orbit the origin
        this.pivot = new pc.Entity('camera_pivot');
        app.root.addChild(this.pivot);

        this.entity = new pc.Entity('camera');

        this.entity.addComponent('camera', {
            clearColor: new pc.Color(0.1, 0.15, 0.2),
            toneMapping: pc.TONEMAP_ACES,
            fov: this.baseFov,
        });

        this.resize(); // Calculate initial FOV based on screen size
        window.addEventListener('resize', () => this.resize());

        // Needed to capture background for dynamic refraction
        this.entity.camera!.requestSceneColorMap(true);

        // Position camera relative to the orbit pivot
        this.entity.setLocalPosition(-3.6, 4.5, -3.6);
        this.entity.lookAt(0, -0.5, 0);
        this.pivot.addChild(this.entity);

        // Stage 3 Initialization: Load animated camera glb
        this.loadCameraLoop();
    }

    resize() {
        if (!this.entity.camera) return;

        const aspectRatio = window.innerWidth / window.innerHeight;

        if (aspectRatio < 1) {
            // Portrait mode (mobile): widen the lens so models aren't cut off
            // Multiply by 0.8 as a dampener so it doesn't get overly fish-eyed
            const scale = 1.0 / aspectRatio;
            this.baseFov = Math.min(45 * scale * 1.3, 95);
            this.animFov = Math.min(70 * scale * 1.3, 100);
        } else {
            // Landscape (desktop)
            this.baseFov = 45;
            this.animFov = 70;
        }

        // Apply immediately if not transitioning
        if (this.stage === CameraStage.ORBIT) {
            this.entity.camera.fov = this.baseFov;
        } else if (this.stage === CameraStage.ANIMATION) {
            this.entity.camera.fov = this.animFov;
        }
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

                    if (this.animTrack) {
                        this.cameraRig.anim!.assignAnimation('CameraAction', this.animTrack);
                        this.cameraRig.anim!.baseLayer.transition('CameraAction', 0);
                        this.cameraRig.anim!.playing = false; // We scrub manually with scroll
                    }
                }
            } else {
                console.error("Failed to load Camera loop", err);
            }
            this.onProgress?.();
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
        }
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
            const f = pc.math.lerp(this.baseFov, this.animFov, t);

            this.entity.setPosition(p);
            this.entity.setRotation(r);
            this.entity.camera!.fov = f;

        } else if (this.stage === CameraStage.ANIMATION) {
            // Animating
        }
    }
}
