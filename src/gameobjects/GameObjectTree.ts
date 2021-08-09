const local: Array<number[]> = [];

export const GameObjectTree = {

    set: function (index: number, object: number[]): void
    {
        local[index] = object;
    },

    get: function (index: number): number[]
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
