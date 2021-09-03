import * as WorldEvents from './events';

import { Color } from '../components/color/Color';
import { Emit } from '../events/Emit';
import { GameObject } from '../gameobjects/GameObject';
import { HasDirtyDisplayList } from '../components/dirty/HasDirtyDisplayList';
import { IBaseCamera } from '../camera/IBaseCamera';
import { IBaseWorld } from './IBaseWorld';
import { IGameObject } from '../gameobjects/IGameObject';
import { IRenderPass } from '../renderer/webgl1/renderpass/IRenderPass';
import { IScene } from '../scenes/IScene';
import { Once } from '../events/Once';
import { RemoveChildren } from '../display/RemoveChildren';
import { SceneDestroyEvent } from '../scenes/events/SceneDestroyEvent';
import { SetWorldID } from '../components/hierarchy/SetWorldID';
import { WillUpdate } from '../components/permissions/WillUpdate';
import { WorldList } from './WorldList';

export class BaseWorld extends GameObject implements IBaseWorld
{
    readonly type: string = 'BaseWorld';

    scene: IScene;

    camera: IBaseCamera;

    is3D: boolean = false;

    color: Color;

    children: number[];

    private totalChildren: number = 0;

    constructor (scene: IScene)
    {
        super();

        const id = this.id;

        this.scene = scene;

        SetWorldID(id, id);

        WorldList.get(scene).push(this);

        this.color = new Color(id);

        this.children = [];

        Once(scene, SceneDestroyEvent, () => this.destroy());
    }

    getNumChildren (): number
    {
        if (HasDirtyDisplayList(this.id))
        {
            this.totalChildren = this.children.length;
        }

        return this.totalChildren;
    }

    beforeUpdate (delta: number, time: number): void
    {
        Emit(this, WorldEvents.WorldBeforeUpdateEvent, delta, time, this);
    }

    update (delta: number, time: number): void
    {
        if (!WillUpdate(this.id))
        {
            return;
        }

        Emit(this, WorldEvents.WorldUpdateEvent, delta, time, this);

        super.update(delta, time);
    }

    afterUpdate (delta: number, time: number): void
    {
        Emit(this, WorldEvents.WorldAfterUpdateEvent, delta, time, this);
    }

    preRender (gameFrame: number): boolean
    {
        return true;
    }

    renderGL <T extends IRenderPass> (renderPass: T): void
    {
    }

    shutdown (): void
    {
        RemoveChildren(this);

        Emit(this, WorldEvents.WorldShutdownEvent, this);
    }

    destroy (reparentChildren?: IGameObject): void
    {
        super.destroy(reparentChildren);

        this.shutdown();

        if (this.camera)
        {
            this.camera.destroy();
        }

        this.camera = null;
    }
}
