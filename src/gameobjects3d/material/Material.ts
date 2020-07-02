import { IShader } from '../../renderer/webgl1/shaders/IShader';
import { RGBCallback } from '../../math/vec3';

export type MaterialConfig = {
    ambient?: number[];
    diffuse?: number[];
    specular?: number[];
    shine?: number;
};

export class Material
{
    ambient: RGBCallback;
    diffuse: RGBCallback;
    specular: RGBCallback;

    isDirty: boolean = false;

    private _shine: number;

    constructor (config: MaterialConfig = {})
    {
        const {
            ambient = [ 1, 1, 1 ],
            diffuse = [ 1, 1, 1 ],
            specular = [ 1, 1, 1 ],
            shine = 32
        } = config;

        const onChange = () => this.update();

        this.ambient = new RGBCallback(onChange).fromArray(ambient);
        this.diffuse = new RGBCallback(onChange).fromArray(diffuse);
        this.specular = new RGBCallback(onChange).fromArray(specular);

        this._shine = shine;
    }

    get shine (): number
    {
        return this._shine;
    }

    set shine (value: number)
    {
        this._shine = value;

        this.isDirty = true;
    }

    private update (): void
    {
        this.isDirty = true;
    }

    setUniforms (shader: IShader): void
    {
        //  TODO - Only set if dirty (different to bound material?)

        const uniforms = shader.uniforms;

        //  TODO - Don't use `toArray` !
        uniforms.set('uMaterialAmbient', this.ambient.toArray());
        uniforms.set('uMaterialDiffuse', this.diffuse.toArray());
        uniforms.set('uMaterialSpecular', this.specular.toArray());
        uniforms.set('uMaterialShine', this._shine);
    }

    destroy (): void
    {
        this.ambient.destroy();
        this.diffuse.destroy();
        this.specular.destroy();
    }
}
