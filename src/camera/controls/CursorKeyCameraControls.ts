import { DownKey } from '../../input/keyboard/keys/DownKey';
import { IBaseCamera } from '../IBaseCamera';
import { IBaseWorld } from '../../world/IBaseWorld';
import { IEventInstance } from '../../events/IEventInstance';
import { Keyboard } from '../../input/keyboard/Keyboard';
import { LeftKey } from '../../input/keyboard/keys/LeftKey';
import { Off } from '../../events/Off';
import { On } from '../../events/On';
import { RightKey } from '../../input/keyboard/keys/RightKey';
import { UpKey } from '../../input/keyboard/keys/UpKey';

export class CursorKeyCameraControls
{
    keyboard: Keyboard;
    leftKey: LeftKey;
    rightKey: RightKey;
    upKey: UpKey;
    downKey: DownKey;

    camera: IBaseCamera;
    world: IBaseWorld;

    cameraSpeedX: number;
    cameraSpeedY: number;

    listener: IEventInstance;

    constructor (world: IBaseWorld, speedX: number = 2, speedY: number = 2)
    {
        if (!world.camera)
        {
            throw new Error('World has no camera');
        }

        this.world = world;
        this.camera = world.camera;

        this.cameraSpeedX = speedX;
        this.cameraSpeedY = speedY;

        this.keyboard = new Keyboard();

        this.leftKey = new LeftKey();
        this.rightKey = new RightKey();
        this.upKey = new UpKey();
        this.downKey = new DownKey();

        this.keyboard.addKeys(this.leftKey, this.rightKey, this.upKey, this.downKey);

        this.listener = On(world, 'update', this.update.bind(this));
    }

    update (): void
    {
        if (this.leftKey.isDown)
        {
            this.camera.x += this.cameraSpeedX;
        }
        else if (this.rightKey.isDown)
        {
            this.camera.x -= this.cameraSpeedX;
        }

        if (this.upKey.isDown)
        {
            this.camera.y += this.cameraSpeedY;
        }
        else if (this.downKey.isDown)
        {
            this.camera.y -= this.cameraSpeedY;
        }
    }

    destroy (): void
    {
        Off(this.world, 'update', this.listener);

        this.keyboard.destroy();

        this.world = null;
        this.camera = null;
    }
}
