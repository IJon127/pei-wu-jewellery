import * as pc from 'playcanvas'
import { Models } from './Models'

export class Scene {
    public app: pc.Application;
    private models: Models;

    constructor(canvas: HTMLCanvasElement) {
        // Initialize PlayCanvas application
        this.app = new pc.Application(canvas, {
            mouse: new pc.Mouse(canvas),
            touch: new pc.TouchDevice(canvas)
        })

        this.app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW)
        this.app.setCanvasResolution(pc.RESOLUTION_AUTO)

        // Create camera
        const camera = new pc.Entity('camera')
        camera.addComponent('camera', {
            clearColor: new pc.Color(0.1, 0.15, 0.2)
        })
        camera.setPosition(0, 0, 5)
        this.app.root.addChild(camera)

        // Create light
        const light = new pc.Entity('light')
        light.addComponent('light')
        light.setEulerAngles(45, 30, 0)
        this.app.root.addChild(light)

        // Initialize and add Model
        this.models = new Models(this.app)
        this.app.root.addChild(this.models.entity)

        // Setup update loop for animation
        this.app.on('update', (dt: number) => {
            this.models.update(dt)
        })
    }

    public start() {
        this.app.start()
    }

    public resize() {
        this.app.resizeCanvas()
    }

    public destroy() {
        this.app.destroy()
    }
}
