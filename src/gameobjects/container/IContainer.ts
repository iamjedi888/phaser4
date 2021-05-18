import { IGameObject } from '../IGameObject';

export interface IContainer extends IGameObject
{
    alpha: number;

    // setAlpha (value?: number): this;
}
