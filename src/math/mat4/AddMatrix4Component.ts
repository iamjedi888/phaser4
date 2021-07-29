import { GameObjectWorld } from '../../GameObjectWorld';
import { Matrix4Component } from './Matrix4Component';
import { addComponent } from 'bitecs';

export function AddMatrix4Component (id: number): void
{
    addComponent(GameObjectWorld, Matrix4Component, id);

    const data = Matrix4Component.data[id];

    data[0] = 1;
    data[5] = 1;
    data[10] = 1;
    data[15] = 1;
}
