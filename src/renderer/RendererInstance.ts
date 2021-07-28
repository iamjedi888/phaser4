import { IRenderer } from './IRenderer';

export let instance: IRenderer;

export const RendererInstance =
{
    get: (): IRenderer =>
    {
        return instance;
    },

    set: (renderer: IRenderer | undefined): void =>
    {
        instance = renderer;
    }
};
