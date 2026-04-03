import * as pc from 'playcanvas';

export class Camera {
    public entity: pc.Entity;
    private pivot: pc.Entity;

    constructor(app: pc.Application) {
        // Create pivot to easily orbit the origin
        this.pivot = new pc.Entity('camera_pivot');
        app.root.addChild(this.pivot);

        this.entity = new pc.Entity('camera');

        this.entity.addComponent('camera', {
            clearColor: new pc.Color(0.1, 0.15, 0.2),
            toneMapping: pc.TONEMAP_ACES,
            // Automatically apply correct gamma for standard display output
            // gammaCorrection: pc.GAMMA_SRGB
        });

        // Needed to capture background for dynamic refraction
        this.entity.camera!.requestSceneColorMap(true);

        // Position camera relative to the pivot
        this.entity.setLocalPosition(0, 8, 5);
        this.entity.lookAt(0, 0, 0);
        this.pivot.addChild(this.entity);
    }

    update(dt: number) {
        // Match the exact rotation speed the models were using (10 degrees per second)
        this.pivot.rotate(0, 10 * dt, 0);
    }
}
