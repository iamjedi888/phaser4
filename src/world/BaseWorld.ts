import * as WorldEvents from './events';

import { Query, defineComponent, defineQuery } from 'bitecs';

import { Color } from '../components/color/Color';
import { CreateWorldRenderData } from './CreateWorldRenderData';
import { Emit } from '../events/Emit';
import { GameObject } from '../gameobjects/GameObject';
import { GameObjectWorld } from '../GameObjectWorld';
import { IBaseCamera } from '../camera/IBaseCamera';
import { IBaseWorld } from './IBaseWorld';
import { IGameObject } from '../gameobjects/IGameObject';
import { IRenderPass } from '../renderer/webgl1/renderpass/IRenderPass';
import { IScene } from '../scenes/IScene';
import { IWorldRenderData } from './IWorldRenderData';
import { Once } from '../events/Once';
import { RemoveChildren } from '../display/RemoveChildren';
import { ResetWorldRenderData } from './ResetWorldRenderData';
import { SceneDestroyEvent } from '../scenes/events/SceneDestroyEvent';
import { SetWillCacheChildren } from '../components/permissions/SetWillCacheChildren';
import { SetWillTransformChildren } from '../components/permissions/SetWillTransformChildren';
import { SetWorldID } from '../components/hierarchy/SetWorldID';
import { UpdateWorld } from './UpdateWorld';
import { WorldList } from './WorldList';

//  The base World class. You should not create an instance of this, but instead extend it,
//  or use a class that does, such as StaticWorld or World.

export class BaseWorld extends GameObject implements IBaseWorld
{
    readonly type: string = 'BaseWorld';

    tag = defineComponent();

    scene: IScene;

    camera: IBaseCamera;

    is3D: boolean = false;

    updateDisplayList: boolean = true;

    color: Color;

    renderData: IWorldRenderData;

    stack: Uint32Array;

    private totalChildren: number = 0;
    private totalChildrenQuery: Query;

    constructor (scene: IScene)
    {
        super();

        const id = this.id;
        const tag = this.tag;

        this.scene = scene;

        this.totalChildrenQuery = defineQuery([ tag ]);

        SetWorldID(id, id);

        WorldList.get(scene).push(this);

        this.color = new Color(id);

        this.events = new Map();

        this.renderData = CreateWorldRenderData();

        //  TODO - Set from Game Config: The stack can be up to 256 layers deep
        this.stack = new Uint32Array(256);

        SetWillTransformChildren(id, false);
        SetWillCacheChildren(id, false);

        Once(scene, SceneDestroyEvent, () => this.destroy());
    }

    getNumChildren (): number
    {
        if (this.updateDisplayList)
        {
            this.totalChildren = this.totalChildrenQuery(GameObjectWorld).length;

            this.updateDisplayList = false;
        }

        return this.totalChildren;
    }

    beforeUpdate (delta: number, time: number): void
    {
        ResetWorldRenderData(this.renderData);

        Emit(this, WorldEvents.WorldBeforeUpdateEvent, delta, time, this);
    }

    update (delta: number, time: number): void
    {
        UpdateWorld(this, delta, time);
    }

    afterUpdate (delta: number, time: number): void
    {
        Emit(this, WorldEvents.WorldAfterUpdateEvent, delta, time, this);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    preRender (gameFrame: number): boolean
    {
        return true;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
