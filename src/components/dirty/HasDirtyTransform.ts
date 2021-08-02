import { DirtyComponent } from './DirtyComponent';
import { GameInstance } from '../../GameInstance';
import { Transform2DComponent } from '../transform';

export function HasDirtyTransform (id: number): boolean
{
    // return Boolean(Transform2DComponent.dirty[id] === GameInstance.getFrame());

    // return Boolean(DirtyComponent.transform[id]);

    return true;
}
