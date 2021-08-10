import { IGameObject } from './IGameObject';

export const GameObjectCache = {

    local: <IGameObject[]>[],

    set: function (index: number, object: IGameObject): void
    {
        this.local[index] = object;
    },

    get: function (index: number): IGameObject
    {
        return this.local[index];
    },

    clear: function (): void
    {
        this.local.length = 0;
    },

    remove: function (index: number): void
    {
        this.local[index] = null;
    }
};
