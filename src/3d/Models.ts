import * as pc from 'playcanvas'

export class Models {
    entity: pc.Entity;
    private _donut: pc.Entity;
    private _drip: pc.Entity;
    private _egg: pc.Entity;
    private _ring: pc.Entity;
    private _stairs: pc.Entity;

    constructor(app: pc.Application) {
        this.entity = new pc.Entity('models')

        const glbs = [
            'camera.glb',
            'donut.glb',
            'drip.glb',
            'egg.glb',
            'ring.glb',
            'stairs.glb'
        ]

        glbs.forEach((glb) => {
            app.assets.loadFromUrl(`/assets/3d/${glb}`, 'container', (err: any, asset: pc.Asset | undefined) => {
                if (!err && asset && asset.resource) {
                    const resource = asset.resource as pc.ContainerResource;
                    const renderEntity = resource.instantiateRenderEntity({
                        castShadows: false,
                    });
                    renderEntity.setLocalPosition(0, 0, 0);
                    this.entity.addChild(renderEntity);
                    renderEntity.name = glb;

                    if (glb === 'donut.glb') {
                        this._donut = renderEntity
                        this.setDonut();
                    } else if (glb === 'drip.glb') {
                        this._drip = renderEntity as pc.Entity;
                        this.setDrip();
                    } else if (glb === 'egg.glb') {
                        this._egg = renderEntity;
                        this.setEgg();
                    } else if (glb === 'ring.glb') {
                        this._ring = renderEntity;
                        this.setRing();
                    } else if (glb === 'stairs.glb') {
                        this._stairs = renderEntity;
                        this.setStairs();
                    }
                } else {
                    console.error(`Failed to load ${glb}:`, err);
                }
            });
        });
    }

    update(dt: number) {
        this.entity.rotate(0, 10 * dt, 0)
    }

    setDonut() {
        const material = this.createCrystalMaterial(new pc.Color(0, 0, 0));
        this.applyMaterialToEntity(this._donut, material);
    }

    setDrip() {
        const material = this.createCrystalMaterial(new pc.Color(0.5, 0.5, 0));
        this.applyMaterialToEntity(this._drip, material);
    }

    setEgg() {
        const material = this.createCrystalMaterial(new pc.Color(0, 0.5, 0));
        this.applyMaterialToEntity(this._egg, material);
    }

    setRing() {
        const material = this.createMetalMaterial();
        this.applyMaterialToEntity(this._ring, material);
    }

    setStairs() {
        const material = this.createStoneMaterial();
        this.applyMaterialToEntity(this._stairs, material);
    }

    createCrystalMaterial(color: pc.Color) {
        const material = new pc.StandardMaterial();
        material.diffuse = color;
        // material.emissive = color;
        // material.opacity = 0.5;
        material.blendType = pc.BLEND_PREMULTIPLIED;
        material.metalness = 0.0;       // low metalness, otherwise it's reflective
        material.gloss = 1.0;
        material.glossMapChannel = 'g';
        material.useMetalness = true; // refractive materials are currently supported only with metalness
        material.refraction = 0.8;
        material.refractionIndex = 1.0 / 1.33; // water
        material.blendType = pc.BLEND_NORMAL;
        material.thickness = 0.4;
        material.update();
        return material;
    }

    createMetalMaterial() {
        const material = new pc.StandardMaterial();
        material.metalness = 1.0;
        material.gloss = 1.0;
        material.glossMapChannel = 'g';
        material.useMetalness = true;
        material.update();
        return material;
    }

    createStoneMaterial() {
        const material = new pc.StandardMaterial();
        material.metalness = 0.0;
        material.gloss = 1.0;
        material.useMetalness = true;
        material.update();
        return material;
    }

    applyMaterialToEntity(entity: pc.Entity, material: pc.Material) {
        entity.children.forEach((child: pc.Entity) => {
            if (!child.render) return;
            child.render.meshInstances.forEach(meshInstance => {
                meshInstance.material = material;
            })
        })
    }
}
