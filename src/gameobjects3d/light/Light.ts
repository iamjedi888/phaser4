import { RGBCallback, Vec3Callback } from '../../math/vec3';

import { IShader } from '../../renderer/webgl1/shaders/IShader';

/*
    Color vectors for each of the Phong lighting's components.
    The ambient material vector defines what color the surface reflects under
    ambient lighting; this is usually the same as the surface's color.
    The diffuse material vector defines the color of the surface under diffuse lighting.
    The diffuse color is (just like ambient lighting) set to the desired surface's color.
    The specular material vector sets the color of the specular highlight on the surface
    (or possibly even reflect a surface-specific color). Lastly, the shininess impacts
    the scattering/radius of the specular highlight.
*/

export type LightConfig = {
    x?: number;
    y?: number;
    z?: number;
    ambient?: number[];
    diffuse?: number[];
    specular?: number[];
};

export class Light
{
    position: Vec3Callback;

    ambient: RGBCallback;
    diffuse: RGBCallback;
    specular: RGBCallback;

    isDirty: boolean = false;

    constructor (config: LightConfig = {})
    {
        const {
            x = 0,
            y = 0,
            z = 0.1,
            ambient = [ 1, 1, 1 ],
            diffuse = [ 1, 1, 1 ],
            specular = [ 1, 1, 1 ]
        } = config;

        const onChange = () => this.update();

        this.position = new Vec3Callback(onChange, x, y, z);

        this.ambient = new RGBCallback(onChange).fromArray(ambient);
        this.diffuse = new RGBCallback(onChange).fromArray(diffuse);
        this.specular = new RGBCallback(onChange).fromArray(specular);
    }

    setUniforms (shader: IShader): void
    {
        //  TODO - Only set if dirty (different to bound light?)

        shader.setUniform('uLightPosition', this.position.toArray());
        shader.setUniform('uLightAmbient', this.ambient.toArray());
        shader.setUniform('uLightDiffuse', this.diffuse.toArray());
        shader.setUniform('uLightSpecular', this.specular.toArray());
    }

    private update (): void
    {
        this.isDirty = true;
    }

    destroy (): void
    {
        this.position.destroy();

        this.ambient.destroy();
        this.diffuse.destroy();
        this.specular.destroy();
    }
}
