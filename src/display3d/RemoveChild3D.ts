import { GetChild3DIndex } from './GetChild3DIndex';
import { IGameObject3D } from '../gameobjects3d/IGameObject3D';
import { RemoveChild3DAt } from './RemoveChild3DAt';

export function RemoveChild3D <T extends IGameObject3D> (parent: IGameObject3D, child: T): T
{
    const currentIndex = GetChild3DIndex(parent, child);

    if (currentIndex > -1)
    {
        RemoveChild3DAt(parent, currentIndex);
    }

    return child;
}
