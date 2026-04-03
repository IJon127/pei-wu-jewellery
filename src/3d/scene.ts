import * as pc from 'playcanvas'
import { Models } from './Models'
import { Camera } from './Camera'
import domeVS from './shaders/domeVS.glsl?raw'
import domeFS from './shaders/domeFS.glsl?raw'

export class Scene {
    public app: pc.Application;
    private models: Models;
    private camera: Camera;

    constructor(canvas: HTMLCanvasElement) {
        this.init(canvas);
    }

    init(canvas: HTMLCanvasElement) {
        // Initialize PlayCanvas application using default WebGL2/WebGL fallback
        this.app = new pc.Application(canvas, {
            mouse: new pc.Mouse(canvas),
            touch: new pc.TouchDevice(canvas)
        })

        this.app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW)
        this.app.setCanvasResolution(pc.RESOLUTION_AUTO)

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
        this.app.assets.loadFromUrl('/assets/hdr/the_sky_is_on_fire_1k.hdr', 'texture', (err, asset) => {
            if (!err && asset && asset.resource) {
                const texture = asset.resource as pc.Texture;

                // Convert equirectangular HDR to higher resolution cubemap for the skybox
                const skybox = pc.EnvLighting.generateSkyboxCubemap(texture);
                this.app.scene.skybox = skybox;
                this.app.scene.skyboxMip = 0; // 0 shows the clear skybox

                // Generate lighting source and environment atlas
                const lighting = pc.EnvLighting.generateLightingSource(texture);
                const envAtlas = pc.EnvLighting.generateAtlas(lighting);
                lighting.destroy();

                this.app.scene.envAtlas = envAtlas;
                this.app.scene.toneMapping = pc.TONEMAP_ACES; // Often needed for correct HDR display
                this.app.scene.exposure = 1.0;
            } else {
                console.error("Failed to load HDR skybox", err);
            }
        });

        // Create Dome with Shader Material
        const dome = new pc.Entity('dome')
        dome.addComponent('render', { type: 'sphere' })
        // Diameter ~50 -> Scale 50 (since base sphere is diameter 1)
        dome.setLocalScale(50, 50, 50)

        const gd = this.app.graphicsDevice


        const shaderDefinition = {
            attributes: {
                aPosition: pc.SEMANTIC_POSITION,
                aUv0: pc.SEMANTIC_TEXCOORD0
            },
            vshader: domeVS,
            fshader: `precision ${gd.precision} float;\n` + domeFS
        }
        const shader = new pc.Shader(gd, shaderDefinition)
        const domeMaterial = new pc.Material()
        domeMaterial.shader = shader
        domeMaterial.cull = pc.CULLFACE_FRONT
        domeMaterial.update()

        // Apply material to sphere
        dome.render!.meshInstances[0].material = domeMaterial
        this.app.root.addChild(dome)

        // Initialize and add Model
        this.models = new Models(this.app)
        this.app.root.addChild(this.models.entity)

        // Setup update loop for animation
        this.app.on('update', (dt: number) => {
            this.models.update(dt)
            this.camera.update(dt)
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
