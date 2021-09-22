import { IGameObject } from './IGameObject';
export declare const GameObjectCache: {
    local: IGameObject[];
    set: (index: number, object: IGameObject) => void;
    get: (index: number) => IGameObject;
    clear: () => void;
    remove: (index: number) => void;
};
//# sourceMappingURL=GameObjectCache.d.ts.map