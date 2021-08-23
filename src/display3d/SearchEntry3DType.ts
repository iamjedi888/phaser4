import { IGameObject3D } from '../gameobjects3d/IGameObject3D';

export type SearchEntry3D = {
    node: IGameObject3D;
    children: SearchEntry3D[];
};
