import * as pc from 'playcanvas'
import photosVS from './shaders/photosVS.glsl?raw'
import photosPS from './shaders/photosPS.glsl?raw'

export class Photos {
    public entity: pc.Entity;
    private app: pc.Application;
    private material!: pc.ShaderMaterial;
    private vertexBuffer!: pc.VertexBuffer;
    private instanceCount = 10;

    constructor(app: pc.Application, imageUrls: string[]) {
        this.app = app;
        this.instanceCount = imageUrls.length || 10;
        this.entity = new pc.Entity('photos');

        // Apply engine patches for Texture Arrays BEFORE shader compilation
        this.patchEngineForTextureArrays();

        this.init(imageUrls);
    }

    private patchEngineForTextureArrays() {
        const device = this.app.graphicsDevice as any;

        if (!device.isWebGL2) return;

        // Map SAMPLER_2D_ARRAY to a safe internal PlayCanvas uniform type ID
        const MONKEY_SAMPLER_2D_ARRAY_TARGET_ID = 50;
        device.pcUniformType[device.gl.SAMPLER_2D_ARRAY] = MONKEY_SAMPLER_2D_ARRAY_TARGET_ID;

        // Intercept the WebGL Shader compiler to route the new ID to the samplers list
        const WebglShader = pc.Shader as any;
        if (!WebglShader.prototype._prevFinalize) {
            WebglShader.prototype._prevFinalize = WebglShader.prototype.finalize;
            WebglShader.prototype.finalize = function (device: any, shader: any) {
                const res = this._prevFinalize(device, shader);
                for (let i = this.uniforms.length - 1; i >= 0; i--) {
                    const shaderInput = this.uniforms[i];
                    if (shaderInput.dataType === MONKEY_SAMPLER_2D_ARRAY_TARGET_ID) {
                        this.uniforms.splice(i, 1);
                        this.samplers.push(shaderInput);
                    }
                }
                return res;
            };
        }
    }

    private patchTextureUpload(tex: any) {
        // Override initialize to set the proper WebGL target (TEXTURE_2D_ARRAY)
        if (!tex.impl._prevInitialize) {
            tex.impl._prevInitialize = tex.impl.initialize;
            tex.impl.initialize = function (dev: any, texture: any) {
                this._prevInitialize(dev, texture);
                this._glTarget = dev.gl.TEXTURE_2D_ARRAY;
            };
        }

        // Override upload to slice the array correctly into the GPU
        tex.impl.upload = function (dev: any, texture: any) {
            const gl = dev.gl;
            const sources = texture._levels[0]; // This is our JS array of HTMLImageElements

            dev.setUnpackFlipY(texture._flipY);
            dev.setUnpackPremultiplyAlpha(texture._premultiplyAlpha);

            // 1. Allocate the 3D texture memory on the GPU (Pass 'null' for data)
            gl.texImage3D(
                gl.TEXTURE_2D_ARRAY,
                0,
                this._glInternalFormat,
                texture._width,
                texture._height,
                texture.arrayLength,
                0,
                this._glFormat,
                this._glPixelType,
                null // Empty allocation
            );

            // 2. Upload each image into its respective Z-slice
            if (Array.isArray(sources)) {
                for (let i = 0; i < texture.arrayLength; i++) {
                    if (sources[i]) {
                        gl.texSubImage3D(
                            gl.TEXTURE_2D_ARRAY,
                            0,                  // mip level
                            0, 0, i,            // x offset, y offset, z offset (slice index)
                            texture._width,     // width
                            texture._height,    // height
                            1,                  // depth (1 slice at a time)
                            this._glFormat,
                            this._glPixelType,
                            sources[i]          // The individual HTMLImageElement
                        );
                    }
                }
            }

            texture._needsUpload = false;
        };
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
            // cull: pc.CULLFACE_NONE,
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
        this.material.cull = pc.CULLFACE_NONE;
        this.material.update();


        let loadedCount = 0;
        // Initialize with the full expected size (30)
        const loadedTextures: pc.Texture[] = new Array(this.instanceCount);

        // Load all textures first
        imageUrls.forEach((url, index) => {
            this.app.assets.loadFromUrl(url, 'texture', (err, asset) => {
                if (!err && asset) {
                    loadedTextures[index] = asset.resource as pc.Texture;
                    // temp fill texture with duplicate
                    // loadedTextures[index + imageUrls.length] = asset.resource as pc.Texture;
                    // loadedTextures[index + (imageUrls.length * 2)] = asset.resource as pc.Texture;

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
            magFilter: pc.FILTER_LINEAR,
            // Recommended constraints for Texture Arrays
            addressU: pc.ADDRESS_CLAMP_TO_EDGE,
            addressV: pc.ADDRESS_CLAMP_TO_EDGE
        });

        // Apply custom hardware bindings to this specific texture instance
        this.patchTextureUpload(textureArray);

        // Extract the raw image sources and pack them into the array
        const sources = textures.map(t => t.getSource());
        textureArray._levels[0] = sources as any;

        // Assign the single uniform to the material
        this.material.setParameter('uTextureArray', textureArray);

        // Force initialization using our custom webgl upload logic
        // (textureArray as any).initialize(device);
        textureArray.upload();

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
        const range = 2;

        const matrix = new pc.Mat4();
        const position = new pc.Vec3();
        const rotation = new pc.Quat();
        const scale = new pc.Vec3();
        const center = new pc.Vec3(-3, 0.2, -0.9);

        const mySeed = 1315;
        const random = this.createRandom(mySeed);

        for (let i = 0; i < this.instanceCount; i++) {
            position.set(
                (random() - 0.5) * range + center.x,
                (random() - 0.5) * range + center.y,
                (random() - 0.5) * range + center.z
            );
            rotation.setFromEulerAngles(random() * 360, random() * 360, random() * 360);
            const s = random() * 0.6 + 0.1;
            scale.set(s, s, s);

            matrix.setTRS(position, rotation, scale);

            const offset = i * 17;
            for (let j = 0; j < 16; j++) {
                data[offset + j] = matrix.data[j];
            }

            // Set the Texture Array Z-index (0 through 29)
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

    private createRandom(seed: number) {
        return function () {
            let t = seed += 0x6D2B79F5;
            t = Math.imul(t ^ t >>> 15, t | 1);
            t ^= t + Math.imul(t ^ t >>> 7, t | 61);
            return ((t ^ t >>> 14) >>> 0) / 4294967296;
        }
    }
}