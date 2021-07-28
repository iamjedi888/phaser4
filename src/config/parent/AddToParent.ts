import { AddToDOM } from '../../dom/AddToDOM';
import { CONFIG_DEFAULTS } from '../const';
import { ConfigStore } from '../ConfigStore';
import { RendererInstance } from '../../renderer/RendererInstance';

export function AddToParent (): void
{
    const parent = ConfigStore.get(CONFIG_DEFAULTS.PARENT);
    const canvas = RendererInstance.get().canvas;

    //  Only add to the DOM if they either didn't set a Parent, or expressly set it to be non-null
    //  Otherwise we'll let them add the canvas to the DOM themselves

    if (parent && canvas)
    {
        AddToDOM(canvas, parent);
    }
}
