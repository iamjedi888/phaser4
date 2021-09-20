import { IShader } from '../shaders/IShader';

export type ShaderStackEntry = {
    shader: IShader;
    textureID?: number;
};
