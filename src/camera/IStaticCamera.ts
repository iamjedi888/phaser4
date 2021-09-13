import { IBaseCamera } from './IBaseCamera';
import { Size } from '../components/transform/Size';

export interface IStaticCamera extends IBaseCamera
{
    size: Size;
}
