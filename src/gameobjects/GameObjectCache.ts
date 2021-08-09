import { IGameObject } from './IGameObject';

const local: IGameObject[] = [];

export const GameObjectCache = {

    set: function (index: number, object: IGameObject): void
    {
        local[index] = object;
    },

    get: function (index: number): IGameObject
    {
        return local[index];
    },

    clear: function (): void
    {
        local.length = 0;
    },

    remove: function (index: number): void
    {
        local[index] = null;
    }
};
