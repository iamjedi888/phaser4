import * as GL_CONST from '../GL_CONST';

import { AMBIENT_LIGHT_FRAG } from '../glsl/AMBIENT_LIGHT_FRAG';
import { AMBIENT_LIGHT_VERT } from '../glsl/AMBIENT_LIGHT_VERT';
import { GORAUD_LAMBERT_FRAG } from '../glsl/GORAUD_LAMBERT_FRAG';
import { GORAUD_LAMBERT_VERT } from '../glsl/GORAUD_LAMBERT_VERT';
import { IShader } from './IShader';
import { Shader } from './Shader';

export class GoraudLambertShader extends Shader implements IShader
{
    constructor ()
    {
        const config = {
            fragmentShader: AMBIENT_LIGHT_FRAG,
            vertexShader: AMBIENT_LIGHT_VERT,
            attributes: {
                aVertexPosition: { size: 3, type: GL_CONST.FLOAT, normalized: false, offset: 0 },
                aVertexNormal: { size: 3, type: GL_CONST.FLOAT, normalized: false, offset: 12 },
                aTextureCoord: { size: 2, type: GL_CONST.FLOAT, normalized: false, offset: 24 }
            },
            uniforms: {
                uViewProjectionMatrix: new Float32Array(16),
                uNormalMatrix: new Float32Array(16),
                uModelMatrix: new Float32Array(16).fill(0),

                uTexture: 0,
                uLightColor: [ 1.0, 1.0, 1.0 ],
                uLightDirection: [ 0.5, 3.0, 4.0 ],
                uLightAmbient: [ 0.2, 0.2, 0.2 ]

                // uShininess: 10.0,
                // uLightDirection: [ -0.25, -0.25, -0.25 ],

                // uLightAmbient: [ 0.03, 0.03, 0.03, 1 ],
                // uLightDiffuse: [ 1, 1, 1, 1 ],
                // uLightSpecular: [ 1, 1, 1, 1 ],

                // uMaterialAmbient: [ 1, 1, 1, 1 ],
                // uMaterialDiffuse: [ 0.5, 0.5, 0.5, 1 ],
                // uMaterialSpecular: [ 1, 1, 1, 1 ]
            }
        };

        super(config);
    }
}
