import { GameObject } from '../GameObject';

//  A Layer is a way of grouping Game Objects together, without impacting their
//  transforms. Children of a Layer do not inherit the layers transform, however
//  you are able to control the visibility of the layers children in a single pass.

export class Layer extends GameObject
{
    constructor ()
    {
        super();

        this.type = 'Layer';
        this.passthru = true;
        this.willRender = false;
    }
}
