import { IContainer } from '../container/IContainer';

export interface IRectangle extends IContainer
{
    tint: number;

    setColor (color: number): this;
}
