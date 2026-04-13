import * as pc from 'playcanvas'
import { Models } from './Models'
import { Camera } from './Camera'
// import domeVS from './shaders/domeVS.glsl?raw'
// import domeFS from './shaders/domeFS.glsl?raw'
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

        // Use NONE so PlayCanvas doesn't overwrite our CSS (width: 100vw, height: 100dvh, position: fixed)
        // with arbitrary inline styles like position: absolute.
        this.app.setCanvasFillMode(pc.FILLMODE_NONE);
        this.app.setCanvasResolution(pc.RESOLUTION_AUTO);
        
        // Immediately sync internal resolution to our CSS-defined layout size
        this.app.resizeCanvas(canvas.clientWidth, canvas.clientHeight);


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

        // Create Dome with Shader Material
        // const dome = new pc.Entity('dome')
        // dome.addComponent('render', { type: 'sphere' })
        // dome.setLocalScale(50, 50, 50)

        // const domeMaterial = new pc.ShaderMaterial({
        //     uniqueName: 'domeShader',
        //     vertexGLSL: domeVS,
        //     fragmentGLSL: domeFS,
        //     attributes: {
        //         vertex_position: pc.SEMANTIC_POSITION,
        //         vertex_texCoord0: pc.SEMANTIC_TEXCOORD0,
        //     }
        // });
        // domeMaterial.cull = pc.CULLFACE_FRONT
        // domeMaterial.update()
        // dome.render!.meshInstances[0].material = domeMaterial
        // this.app.root.addChild(dome)


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
        this.app?.resizeCanvas()
    }

    public destroy() {
        this.app?.destroy()
    }
}
