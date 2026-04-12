import * as pc from 'playcanvas'
import starsVS from './shaders/starsVS.glsl?raw'
import starsFS from './shaders/starsFS.glsl?raw'

export class Stars {
    public entity: pc.Entity;
    private _material: pc.ShaderMaterial;
    private _app: pc.Application;
    private _time: number = 0;

    constructor(app: pc.Application) {
        this._app = app;
        this.entity = new pc.Entity('stars');

        // Number of stars
        const count = 1000;
        const vertexCount = count * 4;
        const indexCount = count * 6;

        // Attributes: star_id and corner_offset
        const format = new pc.VertexFormat(app.graphicsDevice, [
            { semantic: pc.SEMANTIC_ATTR0, components: 1, type: pc.TYPE_FLOAT32 }, // star_id
            { semantic: pc.SEMANTIC_ATTR1, components: 2, type: pc.TYPE_FLOAT32 }  // corner_offset (-1 to 1)
        ]);

        const vertexBuffer = new pc.VertexBuffer(app.graphicsDevice, format, vertexCount);
        const vertexData = new Float32Array(vertexBuffer.lock());

        for (let i = 0; i < count; i++) {
            const base = i * 4 * 3; // 4 vertices, 3 floats each (1 + 2)

            // CornerOffsets: (-1,-1), (1,-1), (1,1), (-1,1)
            const offsets = [
                -1, -1, // Bottom-left
                1, -1, // Bottom-right
                1, 1, // Top-right
                -1, 1  // Top-left
            ];

            for (let j = 0; j < 4; j++) {
                vertexData[base + j * 3 + 0] = i;              // star_id
                vertexData[base + j * 3 + 1] = offsets[j * 2]; // corner_x
                vertexData[base + j * 3 + 2] = offsets[j * 2 + 1]; // corner_y
            }
        }
        vertexBuffer.unlock();

        const indexBuffer = new pc.IndexBuffer(app.graphicsDevice, pc.INDEXFORMAT_UINT16, indexCount);
        const indexData = new Uint16Array(indexBuffer.lock());

        for (let i = 0; i < count; i++) {
            const bV = i * 4;
            const bI = i * 6;
            indexData[bI + 0] = bV + 0;
            indexData[bI + 1] = bV + 1;
            indexData[bI + 2] = bV + 2;
            indexData[bI + 3] = bV + 0;
            indexData[bI + 4] = bV + 2;
            indexData[bI + 5] = bV + 3;
        }
        indexBuffer.unlock();

        const mesh = new pc.Mesh(app.graphicsDevice);
        mesh.vertexBuffer = vertexBuffer;
        mesh.indexBuffer[0] = indexBuffer;
        mesh.primitive[0].type = pc.PRIMITIVE_TRIANGLES;
        mesh.primitive[0].base = 0;
        mesh.primitive[0].count = indexCount;
        mesh.primitive[0].indexed = true;

        this._material = new pc.ShaderMaterial({
            uniqueName: 'starShader',
            vertexGLSL: starsVS,
            fragmentGLSL: starsFS,
            attributes: {
                aStarId: pc.SEMANTIC_ATTR0,
                aCornerOffset: pc.SEMANTIC_ATTR1
            }
        });

        this._material.blendType = pc.BLEND_ADDITIVE;
        this._material.depthWrite = false;
        this._material.cull = pc.CULLFACE_NONE;
        this._material.update();

        const meshInstance = new pc.MeshInstance(mesh, this._material, this.entity);
        meshInstance.cull = false;
        // Ensure the mesh instance doesn't get culled easily as it's a large volume
        meshInstance.aabb = new pc.BoundingBox(new pc.Vec3(0, 0, 0), new pc.Vec3(1000, 1000, 1000));

        this.entity.addComponent('render', {
            meshInstances: [meshInstance],
            castShadows: false,
            receiveShadows: false
        });
    }

    update(dt: number) {
        this._time += dt;
        this._material.setParameter('uTime', this._time);
    }
}
