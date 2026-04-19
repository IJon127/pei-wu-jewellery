import * as pc from 'playcanvas'
import { Models } from './Models'
import { Camera } from './Camera'
import { PostEffects } from './PostEffects'
import { Stars } from './Stars'

export class Scene {
    public app!: pc.Application;
    private models!: Models;
    private camera!: Camera;
    private stars!: Stars;

    public onProgress?: (value: number) => void;
    public onReady?: () => void;

    constructor(canvas: HTMLCanvasElement) {
        this.init(canvas);
    }

    init(canvas: HTMLCanvasElement) {
        // Initialize PlayCanvas application using default WebGL2/WebGL fallback
        this.app = new pc.Application(canvas, {
            mouse: new pc.Mouse(canvas),
            touch: new pc.TouchDevice(canvas)
        })

        // Enforce engine-side dynamic scaling
        this.app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
        this.app.setCanvasResolution(pc.RESOLUTION_AUTO);


        // Initialize Camera
        this.camera = new Camera(this.app);

        // Rearrange depth layer to capture environment/skybox for dynamic refraction
        const depthLayer = this.app.scene.layers.getLayerById(pc.LAYERID_DEPTH)
        if (depthLayer) {
            this.app.scene.layers.remove(depthLayer)
            this.app.scene.layers.insertOpaque(depthLayer, 2)
        }

        // Create light
        const light = new pc.Entity('light')
        light.addComponent('light')
        light.setEulerAngles(45, 30, 0)
        this.app.root.addChild(light)

        // Load HDR Skybox
        this.app.assets.loadFromUrl('/assets/hdr/qwantani_night_puresky_1k.hdr', 'texture', (err, asset) => {
            if (!err && asset && asset.resource) {
                const texture = asset.resource as pc.Texture;

                // Convert equirectangular HDR to higher resolution cubemap for the skybox
                const skybox = pc.EnvLighting.generateSkyboxCubemap(texture);
                this.app.scene.skybox = skybox;
                this.app.scene.skyboxMip = 0; // 0 shows the clear skybox
                this.app.scene.skyboxRotation = new pc.Quat().setFromEulerAngles(-150, 50, 65); //0 65 80

                // Generate lighting source and environment atlas
                const lighting = pc.EnvLighting.generateLightingSource(texture);
                const envAtlas = pc.EnvLighting.generateAtlas(lighting);
                lighting.destroy();

                this.app.scene.envAtlas = envAtlas;
                if (this.camera.entity.camera) {
                    this.camera.entity.camera.toneMapping = pc.TONEMAP_ACES;
                }
            } else {
                console.error("Failed to load HDR skybox", err);
            }
        });


        // Initialize and add Stars
        this.stars = new Stars(this.app)
        this.app.root.addChild(this.stars.entity)

        // Initialize and add Model
        this.models = new Models(this.app)
        this.app.root.addChild(this.models.entity)

        // Initialize Post-processing (Bloom, Vignette)
        new PostEffects(this.app, this.camera.entity);

        // Setup update loop for animation
        this.app.on('update', (dt: number) => {
            this.camera.update(dt)
            this.stars.update(dt)
        })

        // Wire loading progress events to React
        this.app.on('preload:end', () => {
            this.app.off('preload:progress')
        })
        this.app.on('preload:progress', (value: number) => {
            this.onProgress?.(value)
        })
        this.app.on('start', () => {
            this.onReady?.()
        })
    }

    public startInteraction() {
        this.camera?.startInteraction();
    }

    public updateScroll(progress: number) {
        this.camera?.updateScroll(progress);
    }

    public start() {
        this.app?.start()
    }

    public resize() {
        this.app?.resizeCanvas();
        this.camera?.resize();
    }

    public destroy() {
        this.app?.destroy()
    }
}
