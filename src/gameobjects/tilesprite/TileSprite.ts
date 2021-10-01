import { ClearDirtyFrame } from '../../components/dirty/ClearDirtyFrame';
import { Frame } from '../../textures/Frame';
import { HasDirtyFrame } from '../../components/dirty/HasDirtyFrame';
import { ITileSprite } from './ITileSprite';
import { IVec2 } from '../../math/vec2/IVec2';
import { SetDirtyFrame } from '../../components/dirty/SetDirtyFrame';
import { SetDirtyTransform } from '../../components/dirty/SetDirtyTransform';
import { SetExtentFromSize } from '../../components/transform/SetExtentFromSize';
import { SetQuadUVs } from '../../components/vertices/SetQuadUVs';
import { Sprite } from '../sprite/Sprite';
import { Texture } from '../../textures/Texture';
import { TileSpriteQuadShader } from '../../renderer/webgl1/shaders/TileSpriteQuadShader';
import { Vec2 } from '../../math/vec2/Vec2';

export class TileSprite extends Sprite implements ITileSprite
{
    readonly type: string = 'TileSprite';

    tileAngle: number;
    tileScale: IVec2;
    tilePosition: IVec2;
    tileRotationOrigin: IVec2;
    frameScale: IVec2;

    private _width: number = 0;
    private _height: number = 0;

    constructor (x: number, y: number, width: number, height: number, texture: string | Texture | Frame = '__BLANK', frame?: string | number | Frame)
    {
        super(x, y, texture, frame);

        this.tileAngle = 0;
        this.tileScale = new Vec2(1, 1);
        this.tilePosition = new Vec2(0, 0);
        this.tileRotationOrigin = new Vec2(0.5, 0.5);

        this.shader = new TileSpriteQuadShader(this);

        this._width = width;
        this._height = height;

        this.frameScale = new Vec2();

        this.updateTile();

        //  Allow them to set size based on number of frames x by y
    }

    updateTile (): void
    {
        const w = this._width;
        const h = this._height;

        SetExtentFromSize(this, w, h);

        SetQuadUVs(this.id, 0, 0, 1, 1);

        this.frameScale.set(w / this.frame.width, h / this.frame.height);
    }

    //  TODO - This needs to be able to hook into a World preRender event
    //  Or, we need to be able to call a method when the frame changes

    update (): void
    {
        const id = this.id;

        if (HasDirtyFrame(id))
        {
            console.log('onUpdate', this);

            this.updateTile();

            ClearDirtyFrame(id);

            SetDirtyTransform(id);
        }
    }

    set width (value: number)
    {
        this._width = value;

        SetDirtyFrame(this.id);
    }

    get width (): number
    {
        return this._width;
    }

    set height (value: number)
    {
        this._height = value;

        SetDirtyFrame(this.id);
    }

    get height (): number
    {
        return this._height;
    }
}
