import { IBaseCamera } from './IBaseCamera';

export interface IStaticCamera extends IBaseCamera
{
    updateBounds (): boolean;
}
