import { Flush } from './Flush';
import { GameObjectWorld } from '../../../GameObjectWorld';
import { IRenderPass } from './IRenderPass';
import { PackQuadColorsSystem } from '../../../components/color';

export function End (renderPass: IRenderPass): void
{
    PackQuadColorsSystem(GameObjectWorld);

    Flush(renderPass);
}
