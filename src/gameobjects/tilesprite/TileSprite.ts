import { ClearDirtyFrame } from '../../components/dirty/ClearDirtyFrame';
import { Frame } from '../../textures/Frame';
import { HasDirtyFrame } from '../../components/dirty/HasDirtyFrame';
import { IBaseWorld } from '../../world/IBaseWorld';
import { ITileSprite } from './ITileSprite';
import { IVec2 } from '../../math/vec2/IVec2';
import { Off } from '../../events/Off';
import { On } from '../../events/On';
import { SetDirtyFrame } from '../../components/dirty/SetDirtyFrame';
import { SetDirtyTransform } from '../../components/dirty/SetDirtyTransform';
import { SetExtentFromSize } from '../../components/transform/SetExtentFromSize';
import { SetQuadUVs } from '../../components/vertices/SetQuadUVs';
import { Sprite } from '../sprite/Sprite';
import { Texture } from '../../textures/Texture';
import { TileSpriteQuadShader } from '../../renderer/webgl1/shaders/TileSpriteQuadShader';
import { Vec2 } from '../../math/vec2/Vec2';
import { WorldBeforeUpdateEvent } from '../../world/events/WorldBeforeUpdateEvent';

export class TileSprite extends Sprite implements ITileSprite
{
    readonly type: string = 'TileSprite';

    tileAngle: number;
    tileScale: IVec2;
    tilePosition: IVec2;
    tileRotationOrigin: IVec2;

    tileDistortion: number;
    tileSway: number;
    tileSpeed: number;

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

        this.tileDistortion = 0;
        this.tileSway = 0;
        this.tileSpeed = 0;

        this.shader = new TileSpriteQuadShader(this);

        this._width = width;
        this._height = height;

        this.frameScale = new Vec2();
    }

    setFrameScale (cols: number, rows: number): this
    {
        this.frameScale.set(cols, rows);

        return this;
    }

    setTileDistortion (distortion: number, sway: number, speed: number): this
    {
        this.tileDistortion = distortion;
        this.tileSway = sway;
        this.tileSpeed = speed;

        return this;
    }

    onAddedToWorld <T extends IBaseWorld> (world: T): void
    {
        // eslint-disable-next-line @typescript-eslint/unbound-method
        On(world, WorldBeforeUpdateEvent, this.updateTile, this);
    }

    onRemovedFromWorld <T extends IBaseWorld> (world: T): void
    {
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Off(world, WorldBeforeUpdateEvent, this.updateTile, this);
    }

    updateTile (): void
    {
        const id = this.id;

        if (HasDirtyFrame(id))
        {
            const w = this._width;
            const h = this._height;

            SetExtentFromSize(this, w, h);

            //  Because changing the texture frame overwrites them
            SetQuadUVs(id, 0, 0, 1, 1);

            this.frameScale.set(w / this.frame.width, h / this.frame.height);

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
