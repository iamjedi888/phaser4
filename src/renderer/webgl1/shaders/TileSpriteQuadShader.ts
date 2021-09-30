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
        config.uniforms = config?.uniforms || DefaultTileSpriteUniforms;

        super(config);

        this.tileSprite = tileSprite;
    }

    updateUniforms (): void
    {
        const sprite = this.tileSprite;
        const frame = sprite.frame;

        this.uniforms.set('uTexture', TextureStack.textureIndex);
        this.uniforms.set('uTextureSize', [ frame.fWidth, frame.fHeight ]);
        this.uniforms.set('uTexturePosition', [ frame.u0, frame.v0 ]);
        this.uniforms.set('uScale', [ sprite.tileScale.x, sprite.tileScale.y ]);
        this.uniforms.set('uOffset', [ sprite.tilePosition.x, sprite.tilePosition.y ]);
    }
}
