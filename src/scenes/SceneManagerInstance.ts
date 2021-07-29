import { SceneManager } from './SceneManager';

let instance: SceneManager;

export const SceneManagerInstance =
{
    get: (): SceneManager =>
    {
        return instance;
    },

    set: (manager: SceneManager | null): void =>
    {
        if (instance)
        {
            throw new Error('Cannot instantiate SceneManager more than once');
        }

        instance = manager;
    }
};
