export const GameObjectTree = {

    local: <Array<number[]>>[],

    set: function (index: number, object: number[]): void
    {
        this.local[index] = object;
    },

    get: function (index: number): number[]
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
