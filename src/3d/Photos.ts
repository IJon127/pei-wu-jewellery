import * as pc from 'playcanvas'
import photosVS from './shaders/photosVS.glsl?raw'
import photosPS from './shaders/photosPS.glsl?raw'

export class Photos {
    public entity: pc.Entity;
    private app: pc.Application;
    private material!: pc.StandardMaterial;
    private vertexBuffer!: pc.VertexBuffer;
    private instanceCount = 30;

    constructor(app: pc.Application) {
        this.app = app;
        this.entity = new pc.Entity('photos');

        const images = [
            '/assets/images/projects/project1.jpg',
            '/assets/images/projects/project2.jpg',
            '/assets/images/projects/project3.jpg',
            '/assets/images/projects/project4.png',
            '/assets/images/projects/project5.png',
            '/assets/images/projects/project6.png',
            '/assets/images/projects/project7.png',
            '/assets/images/projects/project8.png',
            '/assets/images/projects/project9.png',
            '/assets/images/projects/project10.png',
        ];

        this.init(images);
    }

    private init(imageUrls: string[]) {
        const device = this.app.graphicsDevice;

        if (!device.isWebGL2) {
            console.error("Texture Arrays require WebGL 2.0. Please ensure it is enabled.");
            return;
        }

        this.material = new pc.ShaderMaterial({
            uniqueName: 'photosShader',
            vertexGLSL: photosVS,
            fragmentGLSL: photosPS,
            cull: pc.CULLFACE_NONE,
            attributes: {
                vertex_position: pc.SEMANTIC_POSITION,
                vertex_texCoord0: pc.SEMANTIC_TEXCOORD0,
                aInstMatrix0: pc.SEMANTIC_ATTR12,
                aInstMatrix1: pc.SEMANTIC_ATTR13,
                aInstMatrix2: pc.SEMANTIC_ATTR14,
                aInstMatrix3: pc.SEMANTIC_ATTR15,
                aInstTexIndex: pc.SEMANTIC_ATTR11
            }
        });


        let loadedCount = 0;
        const loadedTextures: pc.Texture[] = new Array(imageUrls.length);

        // Load all textures first
        imageUrls.forEach((url, index) => {
            this.app.assets.loadFromUrl(url, 'texture', (err, asset) => {
                if (!err && asset) {
                    loadedTextures[index] = asset.resource as pc.Texture;
                    // temp fill texture with duplicate
                    loadedTextures[index + imageUrls.length] = asset.resource as pc.Texture;
                    loadedTextures[index + (imageUrls.length * 2)] = asset.resource as pc.Texture;

                    loadedCount++;

                    if (loadedCount === imageUrls.length) {
                        this.buildTextureArray(loadedTextures);
                    }
                } else {
                    console.error(`Failed to load texture: ${url}`, err);
                }
            });
        });
    }

    private buildTextureArray(textures: pc.Texture[]) {
        const device = this.app.graphicsDevice;
        const baseTex = textures[0];

        // Extract the raw image sources (HTMLImageElement or HTMLCanvasElement)
        const sources = textures.map(t => t.getSource());

        // Create a single Texture Array
        const textureArray = new pc.Texture(device, {
            width: baseTex.width,
            height: baseTex.height,
            format: baseTex.format,
            cubemap: false,
            volume: false,
            arrayLength: textures.length,
            mipmaps: false,
            minFilter: pc.FILTER_LINEAR,
            magFilter: pc.FILTER_LINEAR
        });

        // Pack the array of images into the WebGL texture array
        textureArray.setSource(sources as any);

        // Assign the single uniform to the material
        this.material.setParameter('uTextureArray', textureArray);
        this.material.update();

        this.setupInstancing();
    }

    private setupInstancing() {
        const device = this.app.graphicsDevice;

        const vbFormat = new pc.VertexFormat(device, [
            { semantic: pc.SEMANTIC_ATTR12, components: 4, type: pc.TYPE_FLOAT32 },
            { semantic: pc.SEMANTIC_ATTR13, components: 4, type: pc.TYPE_FLOAT32 },
            { semantic: pc.SEMANTIC_ATTR14, components: 4, type: pc.TYPE_FLOAT32 },
            { semantic: pc.SEMANTIC_ATTR15, components: 4, type: pc.TYPE_FLOAT32 },
            { semantic: pc.SEMANTIC_ATTR11, components: 1, type: pc.TYPE_FLOAT32 }
        ]);

        const data = new Float32Array(this.instanceCount * 17);
        const range = 3.6;

        const matrix = new pc.Mat4();
        const position = new pc.Vec3();
        const rotation = new pc.Quat();
        const scale = new pc.Vec3();
        const center = new pc.Vec3(-3.1, 0.2, -1);

        for (let i = 0; i < this.instanceCount; i++) {
            position.set(
                (Math.random() - 0.5) * range + center.x,
                (Math.random() - 0.5) * range + center.y,
                (Math.random() - 0.5) * range + center.z
            );
            rotation.setFromEulerAngles(Math.random() * 360, Math.random() * 360, Math.random() * 360);
            const s = Math.random() * 0.6 + 0.1;
            scale.set(s, s, s);

            matrix.setTRS(position, rotation, scale);

            const offset = i * 17;
            for (let j = 0; j < 16; j++) {
                data[offset + j] = matrix.data[j];
            }

            // Set the Texture Array Z-index (0 through 8)
            data[offset + 16] = i;
        }

        this.vertexBuffer = new pc.VertexBuffer(device, vbFormat, this.instanceCount, {
            data: data.buffer
        });

        this.entity.addComponent('render', {
            type: 'plane',
            material: this.material
        });

        const meshInstance = this.entity.render!.meshInstances[0];
        meshInstance.setInstancing(this.vertexBuffer);
    }
}