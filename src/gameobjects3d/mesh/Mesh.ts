import { FlushBuffer } from '../../renderer/webgl1/renderpass';
import { Frame } from '../../textures/Frame';
import { GameObject3D } from '../GameObject3D';
import { Geometry } from '../geometry/Geometry';
import { IGameObject3D } from '../IGameObject3D';
import { IRenderPass } from '../../renderer/webgl1/renderpass/IRenderPass';
import { Material } from '../material/Material';
import { SetTexture as RequestTexture } from '../../renderer/webgl1/renderpass/SetTexture';
import { SetFrame } from './SetFrame';
import { SetTexture } from './SetTexture';
import { Texture } from '../../textures/Texture';

export class Mesh extends GameObject3D
{
    texture: Texture;
    frame: Frame;
    hasTexture: boolean = false;

    geometry: Geometry;
    material: Material;

    cullFaces: boolean = true;

    constructor (x: number = 0, y: number = 0, z: number = 0, geometry?: Geometry, material: Material = new Material())
    {
        super(x, y, z);

        this.geometry = geometry;
        this.material = material;

        this.setTexture('__WHITE');
    }

    setTexture (key: string | Texture, frame?: string | number): this
    {
        SetTexture(key, frame, this);

        return this;
    }

    setFrame (key?: string | number | Frame): this
    {
        SetFrame(this.texture, key, this);

        return this;
    }

    setMaterial (material: Material): this
    {
        this.material = material;

        return this;
    }

    renderGL <T extends IRenderPass> (renderPass: T): void
    {
        const shader = renderPass.currentShader.shader;

        shader.setUniform('uModelMatrix', this.transform.local.data);
        shader.setUniform('uNormalMatrix', this.transform.normal.data);

        if (this.hasTexture)
        {
            const textureIndex = RequestTexture(renderPass, this.texture);

            shader.setUniform('uTexture', textureIndex);
        }

        this.material.setUniforms(shader);

        FlushBuffer(renderPass, this.geometry.buffer);
    }

    destroy (reparentChildren?: IGameObject3D): void
    {
        super.destroy(reparentChildren);

        this.geometry = null;
        this.material = null;
        this.texture = null;
        this.frame = null;
        this.hasTexture = false;
    }
}
