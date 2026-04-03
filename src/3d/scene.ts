import * as pc from 'playcanvas'

export class Scene {
    public app: pc.Application;
    private cube: pc.Entity;

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

        // Create a rotating cube
        this.cube = new pc.Entity('cube')
        this.cube.addComponent('render', {
            type: 'box'
        })

        const material = new pc.StandardMaterial()
        material.diffuse = new pc.Color(0.8, 0.6, 0.2) // gold-like color
        material.metalness = 0.5
        material.useMetalness = true
        material.update()
        this.cube.render!.meshInstances[0].material = material

        this.app.root.addChild(this.cube)

        // Setup update loop for animation
        this.app.on('update', (dt: number) => {
            this.cube.rotate(10 * dt, 20 * dt, 30 * dt)
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
