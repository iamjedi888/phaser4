import { DefaultTileSpriteUniforms } from './DefaultTileSpriteUniforms';
import { IShaderConfig } from './IShaderConfig';
import { ITileSprite } from '../../../gameobjects/tilesprite/ITileSprite';
import { Shader } from './Shader';
import { TILESPRITE_FRAG } from '../glsl/TILESPRITE_FRAG';

export class TileSpriteQuadShader extends Shader
{
    tileSprite: ITileSprite;

    uTileSize: Float32Array;
    uTilePosition: Float32Array;
    uTileScale: Float32Array;
    uTileOffset: Float32Array;
    uTileRotationOrigin: Float32Array;

    constructor (tileSprite: ITileSprite, config: IShaderConfig = {})
    {
        config.fragmentShader = config?.fragmentShader || TILESPRITE_FRAG;
        config.uniforms = config?.uniforms || DefaultTileSpriteUniforms;

        super(config);

        this.tileSprite = tileSprite;

        this.uTileSize = this.uniforms.get('uTileSize') as Float32Array;
        this.uTilePosition = this.uniforms.get('uTilePosition') as Float32Array;
        this.uTileScale = this.uniforms.get('uTileScale') as Float32Array;
        this.uTileOffset = this.uniforms.get('uTileOffset') as Float32Array;
        this.uTileRotationOrigin = this.uniforms.get('uTileRotationOrigin') as Float32Array;
    }

    updateUniforms (): void
    {
        const sprite = this.tileSprite;
        const frame = sprite.frame;

        this.uniforms.set('uTime', performance.now() / 1000);
        this.uniforms.set('uTexture', frame.texture.binding.textureUnit);

        this.uTileSize[0] = frame.fWidth;
        this.uTileSize[1] = frame.fWidth;

        this.uTilePosition[0] = frame.u0;
        this.uTilePosition[1] = frame.v0;

        this.uTileScale[0] = sprite.frameScale.x * sprite.tileScale.x;
        this.uTileScale[1] = sprite.frameScale.y * sprite.tileScale.y;

        this.uTileOffset[0] = sprite.tilePosition.x;
        this.uTileOffset[1] = sprite.tilePosition.y;

        this.uTileRotationOrigin[0] = this.uTileScale[0] * sprite.tileRotationOrigin.x;
        this.uTileRotationOrigin[1] = this.uTileScale[1] * sprite.tileRotationOrigin.y;

        this.uniforms.set('uTileAngle', sprite.tileAngle);
        this.uniforms.set('uTileDistortion', sprite.tileDistortion);
        this.uniforms.set('uTileSway', sprite.tileSway);
        this.uniforms.set('uTileSpeed', sprite.tileSpeed);
    }
}
