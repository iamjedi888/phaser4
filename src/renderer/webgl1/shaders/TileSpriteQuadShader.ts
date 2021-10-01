import { DefaultTileSpriteUniforms } from './DefaultTileSpriteUniforms';
import { IShaderConfig } from './IShaderConfig';
import { ITileSprite } from '../../../gameobjects/tilesprite/ITileSprite';
import { Shader } from './Shader';
import { TILESPRITE_FRAG } from '../glsl/TILESPRITE_FRAG';
import { TextureStack } from '../renderpass/TextureStack';

export class TileSpriteQuadShader extends Shader
{
    tileSprite: ITileSprite;

    constructor (tileSprite: ITileSprite, config: IShaderConfig = {})
    {
        config.fragmentShader = config?.fragmentShader || TILESPRITE_FRAG;
        // config.uniforms = config?.uniforms || DefaultTileSpriteUniforms;

        super(config);

        this.tileSprite = tileSprite;

        console.log(this);
    }

    updateUniforms (): void
    {
        const sprite = this.tileSprite;
        const frame = sprite.frame;

        this.uniforms.set('uTime', performance.now() / 1000);

        this.uniforms.set('uTexture', frame.texture.binding.textureUnit);
        this.uniforms.set('uTileSize', [ frame.fWidth, frame.fHeight ]);
        this.uniforms.set('uTilePosition', [ frame.u0, frame.v0 ]);
        this.uniforms.set('uTileScale', [ sprite.frameScale.x * sprite.tileScale.x, sprite.frameScale.y * sprite.tileScale.y ]);
        this.uniforms.set('uTileOffset', [ sprite.tilePosition.x, sprite.tilePosition.y ]);
        this.uniforms.set('uTileRotationOrigin', [ sprite.tileScale.x * sprite.tileRotationOrigin.x, sprite.tileScale.y * sprite.tileRotationOrigin.y ]);
        this.uniforms.set('uTileAngle', sprite.tileAngle);
    }
}
